'use client';
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const {isLogin} = useAuthStore();

  useEffect(() => {
  if (isLogin) {
    router.replace("/dashboard")
  } else {
    router.replace("/login")
  }
  }, [isLogin, router])
  
  return null
}
