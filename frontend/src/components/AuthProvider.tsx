"use client";

import { ReactNode } from "react";
import { useMe } from "@/hooks/useMe";

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  useMe();
  return children;
};

export default AuthProvider;
