import { GetServerSidePropsContext } from 'next';

import { getToken } from './getToken';

import { getUser } from '@/services/auth.service';

export async function withAuth(context: GetServerSidePropsContext) {
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
