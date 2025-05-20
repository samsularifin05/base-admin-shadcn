// AuthGuard.tsx
import { useAppSelector } from '@/reduxStore';
import { Navigate, useOutlet } from 'react-router-dom';

export default function AuthGuard() {
  const outlet = useOutlet();
  const isLogin = useAppSelector((state) => state.theme.getIsLogin);

  if (!isLogin) {
    // Kalau belum login, redirect ke halaman utama (bisa diganti ke /login kalau mau)
    return <Navigate to="/" replace />;
  }

  return <>{outlet}</>;
}
