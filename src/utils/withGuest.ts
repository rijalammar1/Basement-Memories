import { GetServerSidePropsContext } from 'next';

import { getToken } from './getToken';

export async function withGuest(context: GetServerSidePropsContext) {
  const token = getToken(context);

  if (token) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
