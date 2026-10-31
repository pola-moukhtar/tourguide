import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MobileMenu } from './MobileMenu';
import type { NavigationItem } from '../../types/section';

const items: NavigationItem[] = [
  { sectionId: 'about', label: 'About' },
  { sectionId: 'contact', label: 'Contact' },
];

describe('MobileMenu', () => {
  it('opens and closes with Escape, returning focus to the menu button', async () => {
    const user = userEvent.setup();
    render(<MobileMenu items={items} />);
    const toggle = screen.getByRole('button', { name: 'Open navigation menu' });
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
  });

  it('closes after a visitor chooses a navigation link', async () => {
    const user = userEvent.setup();
    render(<MobileMenu items={items} />);
    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    await user.click(screen.getByRole('link', { name: 'Contact' }));
    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toHaveAttribute('aria-expanded', 'false');
  });
});
