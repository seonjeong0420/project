import { useQuery } from "@tanstack/react-query";
import { meApi } from "@/api/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { getToken } from "@/utils/token";
import { useEffect } from "react";

export const useMe = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const query = useQuery({
    queryKey: ["me"],
    queryFn: meApi,
    enabled: !!getToken(),
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  return query;

  // return useQuery({
  //   queryKey: ["me"],
  //   queryFn: meApi,
  //   enabled: !!getToken(),
  //   retry: false,
  //   onSuccess = (data) => {
  //     setUser(data);
  //   },
  // });
};
