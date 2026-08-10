import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { Button } from './Button';
import { Dialog } from './Dialog';

function DialogHarness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open details</Button>
      <Dialog open={open} title="Order details" onClose={() => setOpen(false)}>
        <button>Confirm order</button>
        <button>Cancel order</button>
      </Dialog>
    </>
  );
}

describe('Dialog', () => {
  it('manages initial focus, Escape close, and focus restoration', () => {
    render(<DialogHarness />);
    const trigger = screen.getByRole('button', { name: 'Open details' });
    trigger.focus();
    fireEvent.click(trigger);
    expect(screen.getByRole('button', { name: 'Confirm order' })).toHaveFocus();
    screen.getByRole('button', { name: 'Cancel order' }).focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(screen.getByRole('button', { name: 'Confirm order' })).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(screen.getByRole('button', { name: 'Cancel order' })).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('keeps every button on the minimum accessible control geometry', () => {
    render(<Button>Order now</Button>);
    expect(screen.getByRole('button', { name: 'Order now' })).toHaveClass('control-44');
  });
});
