import { ReactNode } from 'react';
import MenuList from './Menu';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div className="layout">
        {children}
        <MenuList />
      </div>
    </div>
  );
};
