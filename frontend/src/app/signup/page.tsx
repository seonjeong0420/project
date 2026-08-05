'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignup } from '@/hooks/useSignup';
import { SignupFormValues, signupSchema } from '@/schemas/auth.schema';

const SignupPage = () => {
  const router = useRouter();
  const signupMutation = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    signupMutation.mutate(data, {
      onSuccess() {
        alert('회원가입 성공');
        router.push('/login');
      },

      onError() {
        alert('회원가입 실패');
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-[400px] flex-col gap-4">
        <h1 className="text-2xl font-bold">회원가입</h1>

        <input placeholder="이메일" {...register('email')} />

        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input type="password" placeholder="비밀번호" {...register('password')} />

        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <input placeholder="이름" {...register('name')} />

        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <button
          type="submit"
          disabled={signupMutation.isPending}
          className="rounded bg-black p-2 text-white"
        >
          {signupMutation.isPending ? '가입중...' : '회원가입'}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
