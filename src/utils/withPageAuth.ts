import { withAuth } from './withAuth';

type Callback = (
  auth: {
    props: {
      token: string;
      user: any;
    };
  },
  context: any,
) => Promise<any>;

export function withPageAuth(callback?: Callback) {
  return async (context: any) => {
    const auth = await withAuth(context);

    if ('redirect' in auth) {
      return auth;
    }

    if (!callback) {
      return {
        props: {
          ...auth.props,
        },
      };
    }

    return callback(auth, context);
  };
}
