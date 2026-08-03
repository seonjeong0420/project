'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormValues } from '@/schemas/auth.schema';
import { useLogin } from '@/hooks/useLogin';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutate, isPending } = useLogin();
  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };
  return (
    <div
      className="
flex
min-h-screen
items-center
justify-center
"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
flex
w-[400px]
flex-col
gap-4
"
      >
        <h1 className="text-2xl font-bold">로그인</h1>

        <input placeholder="이메일" {...register('email')} />

        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input type="password" placeholder="비밀번호" {...register('password')} />

        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="
rounded
bg-black
p-2
text-white
"
        >
          {isPending ? '로그인중...' : '로그인'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
