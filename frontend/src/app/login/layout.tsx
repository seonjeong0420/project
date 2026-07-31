import { ReactNode } from "react";

type Props = { children: ReactNode };

const LoginLayout = ({ children }: Props) => {
  return <section>{children}</section>;
};

export default LoginLayout;
