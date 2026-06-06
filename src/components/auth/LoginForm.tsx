import Link from 'next/link';
import { useState } from 'react';

import Button from '../ui/Button';
import Input from '../ui/Input';

import useLogin from '@/hooks/useLogin';

import { LoginPayload } from '@/types/auth';

const LoginForm = () => {
  const { login, loading } = useLogin();

  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:rounded-3xl md:p-8">
      <h1 className="mb-6 text-3xl font-bold text-white md:mb-8 md:text-4xl">Welcome Back</h1>

      <div className="space-y-4 md:space-y-5">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Input email"
          onChange={handleChange}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Input password"
          onChange={handleChange}
        />

        <Button title="Login" loading={loading} onClick={() => login(formData)} />
      </div>

      <p className="mt-5 text-center text-sm text-zinc-400 md:mt-6">
        Don't have account?{' '}
        <Link href="/register" className="font-medium text-white hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
