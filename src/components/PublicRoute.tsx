// components/PublicRoute.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (token) {
      router.replace('/profile'); // Redirect to profile if already logged in
    } else {
      setLoading(false); // Allow rendering login/register page
    }
  }, [router]);

  if (loading) return null; // Or a loading spinner
  return <>{children}</>;
};

export default PublicRoute;
