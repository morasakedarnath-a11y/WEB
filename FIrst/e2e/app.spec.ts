import { expect, test, type Locator, type Page } from '@playwright/test';
import axe from 'axe-core';

async function assertA11y(page: Page) {
  if (!await page.evaluate(() => Boolean(window.axe))) await page.addScriptTag({ content: axe.source });
  const results = await page.evaluate(async () => window.axe.run(document));
  expect(results.violations, results.violations.map((item) => `${item.id}: ${item.help}`).join('\n')).toEqual([]);
}

async function assertTransparentGlass(locator: Locator, maximumAlpha = 0.7) {
  const material = await locator.evaluate((element) => {
    const style = getComputedStyle(element);
    const alphaMatch = style.backgroundColor.match(/rgba?\([^,]+,[^,]+,[^,]+(?:,\s*([\d.]+))?\)/);
    return {
      alpha: alphaMatch?.[1] ? Number(alphaMatch[1]) : 1,
      backdrop: style.backdropFilter
        || (style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter,
    };
  });
  expect(material.alpha).toBeLessThanOrEqual(maximumAlpha);
  expect(material.backdrop).toContain('blur');
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

test('representative surfaces use transparent liquid glass', async ({ page }) => {
  await page.goto('/');
  await assertTransparentGlass(page.locator('.public-header'), 0.42);
  await assertTransparentGlass(page.locator('.landing-hero__content'), 0.42);

  await page.goto('/staff');
  await page.getByLabel('Staff PIN').fill('2490');
  await page.getByRole('button', { name: 'Enter workspace' }).click();
  await assertTransparentGlass(page.locator('.staff-portal__intro'), 0.42);
  await assertTransparentGlass(page.locator('.staff-workspace').first(), 0.7);
});

test('landing and menu remain usable without accessibility violations', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Luca Cafe' })).toBeVisible();
  await expect(page.getByText('A combo for every table')).toBeVisible();

  await assertA11y(page);

  await page.getByRole('link', { name: /Browse the menu/i }).click();
  await page.getByRole('link', { name: 'Table 1', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Our menu' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Combos' })).toBeVisible();
  const menuSearch = page.getByRole('searchbox', { name: 'Search the menu' });
  await page.getByRole('button', { name: 'Pizza', exact: true }).click();
  await menuSearch.fill('mac cheese');
  await expect(page.getByRole('heading', { name: 'Mac & Cheese' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'All' })).toHaveClass(/is-active/);
  await menuSearch.fill('paneer');
  await expect(page.getByRole('heading', { name: 'Ghee Roast Pizza' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'I Am Alone' })).toBeVisible();
  await menuSearch.fill('');
  const menuImages = page.locator('.menu-card img');
  await expect(menuImages).toHaveCount(64);
  for (let index = 0; index < await menuImages.count(); index += 1) {
    await menuImages.nth(index).scrollIntoViewIfNeeded();
  }
  await expect(menuImages.last()).toBeVisible();
  await expect(page.locator('.menu-card .food-image-fallback')).toHaveCount(0);
  const failedImages = await menuImages.evaluateAll((images) => images.filter((image) => {
    const menuImage = image as HTMLImageElement;
    return !menuImage.complete || menuImage.naturalWidth === 0;
  }).length);
  expect(failedImages).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await assertA11y(page);
  await page.getByRole('button', { name: 'Customize I Am Alone' }).click();
  await assertA11y(page);
  await page.getByRole('button', { name: /Add to order/ }).click();
  const cartAction = page.getByRole('button', { name: /Review order, 1 item/i });
  await expect(cartAction).toBeVisible();
  const actionBox = await cartAction.boundingBox();
  const actionStyle = await cartAction.evaluate((element) => {
    const style = getComputedStyle(element);
    return { position: style.position, bottom: style.bottom, transform: style.transform };
  });
  const viewport = page.viewportSize();
  expect(
    actionBox && viewport && actionBox.y + actionBox.height <= viewport.height,
    `cart bar bounds ${JSON.stringify(actionBox)} with ${JSON.stringify(actionStyle)} must fit viewport ${JSON.stringify(viewport)}`,
  ).toBe(true);
  await cartAction.click();
  await assertA11y(page);
});

test('customer can place an order and see its live tracker', async ({ page }) => {
  await page.goto('/menu?table=1');
  await page.getByRole('button', { name: 'Customize I Am Alone' }).click();
  await expect(page.getByText('Fixed combo includes')).toBeVisible();
  await page.getByRole('button', { name: /Add to order/ }).click();
  await page.getByRole('button', { name: /Review order, 1 item/i }).click();
  await page.getByRole('button', { name: /Place order/ }).click();
  await expect(page).toHaveURL(/\/orders\?table=1&order=LC-/);
  await expect(page.getByRole('heading', { name: 'Track your order' })).toBeVisible();
  await expect(page.getByText('I Am Alone')).toBeVisible();
  await expect(page.getByText('Currently received')).toBeVisible();

  const trackerUrl = page.url();
  const orderId = new URL(trackerUrl).searchParams.get('order');
  expect(orderId).toBeTruthy();
  await page.goto('/staff/kitchen');
  await page.getByLabel('Staff PIN').fill('2490');
  await page.getByRole('button', { name: 'Enter workspace' }).click();
  await page.getByRole('button', { name: `Start ${orderId}` }).click();
  await page.getByRole('button', { name: `Mark ready ${orderId}` }).click();
  await page.getByRole('link', { name: 'Waiter' }).click();
  await page.getByRole('button', { name: `Deliver ${orderId} to Table 1` }).click();
  const activeOrder = page.locator('.table-operations article').filter({ hasText: orderId! });
  await activeOrder.getByRole('button', { name: 'Record payment' }).click();
  await page.getByRole('button', { name: /Confirm paid/ }).click();
  await page.goto(trackerUrl);
  await expect(page.getByText('All settled', { exact: true })).toBeVisible();
});

test('staff PIN unlocks every operational workspace', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('banner').getByRole('link', { name: 'Staff Portal' }).click();
  await expect(page).toHaveURL(/\/staff$/);
  await page.getByLabel('Staff PIN').fill('2490');
  await page.getByRole('button', { name: 'Enter workspace' }).click();
  await expect(page.getByRole('heading', { name: 'Staff Portal' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open Kitchen Display' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open Waiter Dispatch' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open Admin Dashboard' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open QR Builder' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await assertA11y(page);

  await page.getByRole('link', { name: 'Open Kitchen Display' }).click();
  await expect(page.getByRole('heading', { name: 'Kitchen display' })).toBeVisible();
  await assertA11y(page);

  await page.getByRole('link', { name: 'Waiter' }).click();
  await expect(page.getByRole('heading', { name: 'Waiter dispatch' })).toBeVisible();
  await assertA11y(page);
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.getByRole('heading', { name: 'Cafe overview' })).toBeVisible();
  await assertA11y(page);
  await page.getByRole('link', { name: 'QR builder' }).click();
  await expect(page.getByRole('heading', { name: 'Table QR codes' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'QR code for Table 1' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await assertA11y(page);
});

declare global {
  interface Window {
    axe: typeof axe;
  }
}
