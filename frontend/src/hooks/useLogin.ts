import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/api/auth.api';
import { setToken } from '@/utils/token';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export const useLogin = () => {
  const router = useRouter();
  const loginStore = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: loginApi,
    onSuccess(data) {
      setToken(data.accessToken);
      loginStore(data.user);
      router.push('/dashboard');
    },
  });
};
