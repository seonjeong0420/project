import { ReactNode } from "react";

type Props = { children: ReactNode };

const SignLayout = ({ children }: Props) => {
  return <section>{children}</section>;
};

export default SignLayout;
