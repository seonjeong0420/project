import { useQuery } from '@tanstack/react-query';
import { meApi } from '@/api/auth.api';
import { getToken } from '@/utils/token';

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: meApi,
    enabled: !!getToken(),
    retry: false,
  });
};
