import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: 'primary' | 'secondary' };
type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; variant?: 'primary' | 'secondary' };

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}

export function ButtonLink({ children, variant = 'primary', className = '', ...props }: ButtonLinkProps) {
  return <a className={`button button-${variant} ${className}`} {...props}>{children}</a>;
}
