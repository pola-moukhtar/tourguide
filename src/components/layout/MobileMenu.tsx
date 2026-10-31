import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { NavigationItem } from '../../types/section';

interface MobileMenuProps { items: readonly NavigationItem[] }

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeWhenOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', closeWhenOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeWhenOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return <div className="mobile-menu" ref={menuRef}>
    <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen(!open)}>
      {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
    </button>
    <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" hidden={!open}>
      {items.map((item) => <a key={item.sectionId} href={`#${item.sectionId}`} onClick={() => setOpen(false)}>{item.label}</a>)}
    </nav>
  </div>;
}
