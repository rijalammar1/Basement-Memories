import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import toast from 'react-hot-toast';

import { LoginPayload } from '@/types/auth';

export default function useLogin() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const login = async (payload: LoginPayload) => {
    try {
      setLoading(true);

      const apiURL = process.env.NEXT_PUBLIC_BASE_URL;

      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      const response = await axios.post(`${apiURL}/api/v1/login`, payload, {
        headers: {
          apiKey: apiKEY || '',
        },
      });

      /*
        TOKEN
      */
      const token = response.data.token;

      /*
        USER
      */
      const user = response.data.user;

      /*
        SAVE TOKEN
      */
      document.cookie = `token=${token}; path=/`;

      /*
        SAVE USER ID
      */
      localStorage.setItem('userId', user.id);

      toast.success('Login successful');

      router.push('/home');
    } catch (error: any) {
      console.log(error?.response?.data || error.message);

      toast.error(error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
}
