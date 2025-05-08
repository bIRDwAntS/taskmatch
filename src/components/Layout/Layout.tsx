import { Navbar } from '../Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__content">
        {children}
      </main>
    </div>
  );
};