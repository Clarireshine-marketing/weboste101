import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CursorLayer from './CursorLayer';

const LEGAL_PATHS = new Set(['/privacy-policy', '/terms-and-conditions', '/cookie-policy', '/refund-policy']);

export default function Layout() {
  const { pathname } = useLocation();
  const showCursor = !LEGAL_PATHS.has(pathname);

  return (
    <>
      <cs-motion></cs-motion>
      {showCursor && <CursorLayer />}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
