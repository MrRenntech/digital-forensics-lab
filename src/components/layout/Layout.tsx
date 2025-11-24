import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {user && <Header />}
      <main className={user ? '' : 'min-h-screen'}>
        <Outlet />
      </main>
    </div>
  );
}