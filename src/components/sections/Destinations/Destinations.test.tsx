import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { getVisibleItems } from '../../../lib/utils';
import { Destinations } from './Destinations';

describe('Destinations details', () => {
  it('opens the selected destination in an accessible dialog and closes it', async () => {
    const user = userEvent.setup();
    render(<Destinations />);

    await user.click(screen.getByRole('button', { name: 'View details for Destination name' }));
    const dialog = screen.getByRole('dialog', { name: 'Destination name' });
    expect(dialog).toHaveAttribute('open');
    expect(screen.getByText(/Demonstration content/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(dialog).not.toHaveAttribute('open');
  });

  it('shows the details for the destination that was selected', async () => {
    const user = userEvent.setup();
    render(<Destinations />);
    await user.click(screen.getByRole('button', { name: 'View details for Another destination' }));
    const dialog = screen.getByRole('dialog', { name: 'Another destination' });
    expect(dialog).toHaveAttribute('open');
    expect(within(dialog).getByText('Describe what visitors can discover here.')).toBeInTheDocument();
  });

  it('omits hidden data while keeping visible items', () => {
    const items = [{ id: 'shown' }, { id: 'hidden', isVisible: false }];
    expect(getVisibleItems(items)).toEqual([{ id: 'shown' }]);
  });
});
