import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from './LandingPage';

describe('LandingPage', () => {
  it('presents Luca Cafe, the approved combos, menu categories, and truthful contact details', () => {
    render(<MemoryRouter><LandingPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1, name: 'Luca Cafe' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse the menu' })).toHaveAttribute('href', '/menu');
    expect(screen.getByRole('link', { name: 'Order at your table' })).toHaveAttribute('href', '/menu');
    expect(screen.getAllByRole('link', { name: 'Staff Portal' })).toHaveLength(2);
    screen.getAllByRole('link', { name: 'Staff Portal' }).forEach((link) => expect(link).toHaveAttribute('href', '/staff'));
    expect(screen.getByText('I Am Alone')).toBeInTheDocument();
    expect(screen.getByText('₹249')).toBeInTheDocument();
    expect(screen.getByText('We Are Together')).toBeInTheDocument();
    expect(screen.getByText('₹399')).toBeInTheDocument();
    expect(screen.getByText('We Are a Group')).toBeInTheDocument();
    expect(screen.getByText('₹799')).toBeInTheDocument();
    expect(document.querySelectorAll('.combo-card.liquid-glass')).toHaveLength(3);
    expect(screen.getByRole('heading', { name: 'Pizza' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Coffee & Tea' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '0820 3559195' })).toHaveAttribute('href', 'tel:08203559195');
    expect(screen.getAllByText(/Manipal/i)).toHaveLength(2);
    expect(screen.queryByText(/open daily|five stars|best rated|MG Road/i)).not.toBeInTheDocument();
  });
});
