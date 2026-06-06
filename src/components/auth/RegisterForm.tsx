import Link from 'next/link';
import { useState } from 'react';

import Button from '../ui/Button';
import Input from '../ui/Input';

import useRegister from '@/hooks/useRegister';

import { RegisterPayload } from '@/types/auth';

const RegisterForm = () => {
  const { register, loading } = useRegister();

  const [formData, setFormData] = useState<RegisterPayload>({
    name: '',
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:rounded-3xl md:p-8">
      <h1 className="mb-6 text-3xl font-bold text-white md:mb-8 md:text-4xl">Create Account</h1>

      <div className="space-y-4 md:space-y-5">
        <Input label="Name" name="name" placeholder="Input name" onChange={handleChange} />

        <Input
          label="Username"
          name="username"
          placeholder="Input username"
          onChange={handleChange}
        />

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

        <Input
          label="Repeat Password"
          type="password"
          name="passwordRepeat"
          placeholder="Repeat password"
          onChange={handleChange}
        />

        <Button title="Register" loading={loading} onClick={() => register(formData)} />
      </div>

      <p className="mt-5 text-center text-sm text-zinc-400 md:mt-6">
        Already have account?{' '}
        <Link href="/login" className="font-medium text-white hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
