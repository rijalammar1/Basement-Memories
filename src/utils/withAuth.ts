import { getToken } from './auth';

import { getUser } from '@/services/auth.service';

export async function withAuth(context: any) {
  try {
    const token = getToken(context);

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const user = await getUser(token);

    return {
      props: {
        token,
        user,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}
