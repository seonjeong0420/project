'use client';

import { ReactNode, useEffect } from 'react';
import { useMe } from '@/hooks/useMe';
import { useAuthStore } from '@/store/auth.store';

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.login);
  const { data: user } = useMe();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return children;
};

export default AuthProvider;
