import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Tours } from './Tours';

describe('Tours details', () => {
  it('opens the selected experience and its confirmation placeholder', async () => {
    const user = userEvent.setup();
    render(<Tours />);

    await user.click(screen.getByRole('button', { name: 'View details for A day shaped around you' }));
    const dialog = screen.getByRole('dialog', { name: 'A day shaped around you' });
    expect(dialog).toHaveAttribute('open');
    expect(within(dialog).getByText(/Demonstration content/)).toBeInTheDocument();
    expect(within(dialog).getByText('Details to come')).toBeInTheDocument();
  });

  it('changes the dialog content when another experience is selected', async () => {
    const user = userEvent.setup();
    render(<Tours />);
    await user.click(screen.getByRole('button', { name: 'View details for A deeper local discovery' }));
    const dialog = screen.getByRole('dialog', { name: 'A deeper local discovery' });
    expect(dialog).toHaveAttribute('open');
    expect(within(dialog).getByText('Add a guide-led experience after the itinerary is confirmed.')).toBeInTheDocument();
  });

  it('closes the selected experience dialog without leaving an open empty dialog', async () => {
    const user = userEvent.setup();
    render(<Tours />);

    await user.click(screen.getByRole('button', { name: 'View details for A day shaped around you' }));
    const dialog = screen.getByRole('dialog', { name: 'A day shaped around you' });
    expect(dialog).toHaveAttribute('open');

    await user.click(within(dialog).getByRole('button', { name: 'Close dialog' }));

    expect(dialog).not.toHaveAttribute('open');
    expect(dialog).toHaveTextContent('Experience details');
    expect(within(dialog).queryByText(/Demonstration content/)).not.toBeInTheDocument();
  });
});
