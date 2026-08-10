import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CafeProvider } from '../../state/CafeStore';
import { createSeedSnapshot } from '../../services/seed';
import type { CafeService } from '../../services/contracts';
import { categories } from '../../domain/catalog';
import { MenuPage } from './MenuPage';

const service = {
  getSnapshot: async () => createSeedSnapshot(),
  subscribe: () => () => undefined,
} as unknown as CafeService;

const renderMenu = (route = '/menu?table=1') => render(
  <MemoryRouter initialEntries={[route]}>
    <CafeProvider service={service}><MenuPage /></CafeProvider>
  </MemoryRouter>,
);

describe('MenuPage', () => {
  it('shows a valid table, every catalog category, and photographed prices', async () => {
    renderMenu();
    expect(await screen.findByText('Table 1')).toBeInTheDocument();
    for (const category of categories) {
      expect(screen.getByRole('heading', { name: category.name })).toBeInTheDocument();
    }
    expect(screen.getAllByText('₹159').length).toBeGreaterThan(0);
    expect(screen.getAllByText('₹189').length).toBeGreaterThan(0);
    expect(document.querySelector('.menu-card')).toHaveClass('liquid-glass--dense');
    const menuImages = [...document.querySelectorAll<HTMLImageElement>('.menu-card img')];
    expect(menuImages).toHaveLength(64);
    expect(menuImages.every((image) => image.getAttribute('loading') === 'lazy')).toBe(true);
    expect(menuImages.every((image) => image.getAttribute('decoding') === 'async')).toBe(true);
  });

  it('requires table selection when the query is missing or invalid', async () => {
    renderMenu('/menu?table=99');
    expect(await screen.findByRole('heading', { name: 'Choose your table' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Table 1' })).toHaveAttribute('href', '/menu?table=1');
  });

  it('preserves landing intent through table selection and opens linked products', async () => {
    const first = renderMenu('/menu?category=pizza');
    const tableLink = await screen.findByRole('link', { name: 'Table 1' });
    expect(tableLink).toHaveAttribute('href', '/menu?category=pizza&table=1');
    first.unmount();

    renderMenu('/menu?table=1&product=combo-alone');
    expect(await screen.findByText('Fixed combo includes')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveTextContent('I Am Alone');
  });

  it('searches items and applies the vegetarian filter', async () => {
    renderMenu();
    const search = await screen.findByRole('searchbox', { name: 'Search the menu' });
    fireEvent.change(search, { target: { value: 'Tiramisu' } });
    expect(screen.getByRole('heading', { name: 'Tiramisu' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Ghee Roast Pizza' })).not.toBeInTheDocument();
    fireEvent.change(search, { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: 'Vegetarian only' }));
    expect(screen.getByRole('heading', { name: 'Oreo Smoothie' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Panino Chicken Sandwich' })).not.toBeInTheDocument();
  });

  it('searches the full menu with flexible word matching', async () => {
    renderMenu();
    await screen.findByText('Table 1');
    fireEvent.click(screen.getByRole('button', { name: 'Pizza' }));
    fireEvent.change(screen.getByRole('searchbox', { name: 'Search the menu' }), { target: { value: 'mac cheese' } });

    expect(screen.getByRole('heading', { name: 'Mac & Cheese' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toHaveClass('is-active');
  });

  it('finds products by customization options and combo contents', async () => {
    renderMenu();
    const search = await screen.findByRole('searchbox', { name: 'Search the menu' });
    fireEvent.change(search, { target: { value: 'paneer' } });

    expect(screen.getByRole('heading', { name: 'Ghee Roast Pizza' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'I Am Alone' })).toBeInTheDocument();
  });

  it('visibly disables ordering when the cafe pauses online orders', async () => {
    const paused = createSeedSnapshot();
    paused.settings.acceptingOrders = false;
    const pausedService = { getSnapshot: async () => paused, subscribe: () => () => undefined } as unknown as CafeService;
    render(<MemoryRouter initialEntries={['/menu?table=1']}><CafeProvider service={pausedService}><MenuPage /></CafeProvider></MemoryRouter>);
    expect(await screen.findByText(/Online ordering is paused/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Customize I Am Alone' })).toBeDisabled();
  });
});
