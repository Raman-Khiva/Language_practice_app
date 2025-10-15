'use client'
import { useSelector } from 'react-redux';
import { selectUser, selectIsAuthenticated } from '@/app/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ProfilePage from '@/components/pages/ProfilePage';
import Navbar from '@/components/layout/Navbar/Navbar';

export default function Profile() {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return(
    <div>
      <Navbar/>
      <ProfilePage user={user} />;
    </div>

  ) 
}
