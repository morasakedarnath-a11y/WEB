import { fireEvent, render, screen } from '@testing-library/react';
import { FoodImage } from './FoodImage';

describe('FoodImage', () => {
  it('preserves alt text and shows a branded neutral fallback after an image error', () => {
    render(<FoodImage src="/missing.webp" alt="Paneer pizza on a wooden board" />);
    const image = screen.getByRole('img', { name: 'Paneer pizza on a wooden board' });
    fireEvent.error(image);
    expect(screen.getByText('Luca Cafe')).toBeInTheDocument();
    expect(screen.getByText('Paneer pizza on a wooden board')).toBeInTheDocument();
  });
});
