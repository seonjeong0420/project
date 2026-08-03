import { ReactNode } from 'react';

type Props = { children: ReactNode };

const SignupLayout = ({ children }: Props) => {
  return <section>{children}</section>;
};

export default SignupLayout;
