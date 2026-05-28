import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import toast from 'react-hot-toast';

import { RegisterPayload } from '@/types/auth';

export default function useRegister() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const register = async (payload: RegisterPayload) => {
    try {
      if (payload.password !== payload.passwordRepeat) {
        toast.error('Password does not match');
        return;
      }

      setLoading(true);

      const apiURL = process.env.NEXT_PUBLIC_BASE_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      await axios.post(`${apiURL}/api/v1/register`, payload, {
        headers: {
          apiKey: apiKEY || '',
        },
      });

      toast.success('Register successful');

      router.push('/login');
    } catch (error: any) {
      console.log(error?.response?.data || error.message);

      toast.error(error?.response?.data?.message || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
  };
}
