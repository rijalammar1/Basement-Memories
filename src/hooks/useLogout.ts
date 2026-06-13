import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export default function useLogout() {
  const router = useRouter();

  const logout = () => {
    deleteCookie('token');
    deleteCookie('user');

    localStorage.clear();

    router.replace('/login');
  };

  return {
    logout,
  };
}
