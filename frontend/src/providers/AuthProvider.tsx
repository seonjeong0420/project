'use client';

import { ReactNode, useEffect } from 'react';
import { useMe } from '@/hooks/useMe';
import { useAuthStore } from '@/store/auth.store';

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const login = useAuthStore((state) => state.login);
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const { data: user, isPending } = useMe();

  useEffect(() => {
    if (user) {
      login(user);
    }

    if(!isPending) {
      setInitialized();
    }
  }, [user, isPending, login, setInitialized]);

  return children;
};

export default AuthProvider;
