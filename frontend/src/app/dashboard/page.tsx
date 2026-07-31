"use client";

import { useAuthStore } from "@/store/auth.store";
import { removeToken } from "@/utils/token";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const router = useRouter();

  const logout = () => {
    removeToken();
    clearUser();
    router.push("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <p>
        환영합니다.
        {user?.name}님
      </p>

      <p>{user?.email}</p>

      <button type="button" onClick={logout}>
        로그아웃
      </button>
    </div>
  );
};

export default DashboardPage;
