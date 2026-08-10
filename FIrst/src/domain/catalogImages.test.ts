import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { categories, menuItems } from './catalog';

describe('menu photography', () => {
  it('assigns every item a unique deterministic image that exists', async () => {
    const paths = menuItems.map((item) => item.image);
    const hashes: string[] = [];

    expect(new Set(paths).size).toBe(menuItems.length);
    for (const item of menuItems) {
      expect(item.image).toBe(`/images/menu/${item.id}.webp`);
      const imagePath = join(process.cwd(), 'public', item.image.slice(1));
      expect(existsSync(imagePath)).toBe(true);
      const contents = readFileSync(imagePath);
      const metadata = await sharp(contents).metadata();
      expect(metadata).toMatchObject({ format: 'webp', width: 1200, height: 800 });
      hashes.push(createHash('sha256').update(contents).digest('hex'));
    }
    expect(new Set(hashes).size).toBe(menuItems.length);
  });

  it('keeps category preview photography separate', () => {
    expect(categories.every((category) => !category.image.startsWith('/images/menu/'))).toBe(true);
  });
});
