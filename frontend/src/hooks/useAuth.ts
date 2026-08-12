import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { loginApi, signupApi } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { setToken } from '@/utils/token';

export const useLogin = () => {
  const router = useRouter();
  const loginStore = useAuthStore(state => state.login);

  return useMutation({
    mutationFn: loginApi,
    onSuccess(data) {
      setToken(data.accessToken);
      loginStore(data.user);
      router.push('/dashboard');
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signupApi,
  });
};
