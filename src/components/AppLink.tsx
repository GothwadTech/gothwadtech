import React from 'react';
import { type PageKey, hrefForPage } from '../lib/routing';

interface AppLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  page: PageKey;
  onNavigate: (page: PageKey) => void;
  children: React.ReactNode;
}

/**
 * Internal link that is a real <a href> (crawlable, openable in a new tab, copyable)
 * but still navigates without a full page reload on a plain left click.
 */
export const AppLink: React.FC<AppLinkProps> = ({ page, onNavigate, onClick, children, ...rest }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    onNavigate(page);
  };

  return (
    <a href={hrefForPage(page)} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
