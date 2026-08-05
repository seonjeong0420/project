'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

type Props = {
  children: ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const {user,initialized} = useAuthStore();

  useEffect(() => {
    if(initialized && !user) {
      router.replace('/login');
    }
  }, [user, router, initialized]);

  if(!initialized) {
    return null;
  }

  if (!user) {
    return null;
  }

  return children;
};

export default AuthGuard;
