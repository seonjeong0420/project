"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { getToken } from "@/utils/token";

type Props = {
  children: ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
    }
  }, [user]);

  return children;
};

export default AuthGuard;
