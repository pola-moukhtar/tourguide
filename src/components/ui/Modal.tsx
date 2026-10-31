import { useLayoutEffect, useRef, type ReactNode, type SyntheticEvent } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  id?: string;
  open: boolean;
  eyebrow?: string;
  title: string;
  titleId: string;
  onClose: () => void;
  children: ReactNode;
}

/** Controlled native dialog. The browser manages focus and Escape behavior. */
export function Modal({ id, open, eyebrow, title, titleId, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    onClose();
  }

  return <dialog ref={dialogRef} id={id} className="modal" aria-labelledby={titleId} onCancel={handleCancel} onClose={onClose}>
    <div className="modal-header"><div className="modal-heading">{eyebrow && <p className="modal-eyebrow">{eyebrow}</p>}<h2 id={titleId}>{title}</h2></div><button type="button" className="modal-close" aria-label="Close dialog" onClick={onClose}><X aria-hidden="true" /></button></div>
    <div className="modal-content">{children}</div>
  </dialog>;
}
