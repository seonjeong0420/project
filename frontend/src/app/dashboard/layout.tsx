import AuthGuard from "@/components/AuthGuard";
import { ReactNode } from "react";

type Props = { children: ReactNode };

const DashboardLayout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <section>{children}</section>
    </AuthGuard>
  );
};

export default DashboardLayout;
