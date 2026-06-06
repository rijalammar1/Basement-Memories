import Sidebar from '@/components/home/Sidebar';
import StoryBar from '@/components/home/Stories';
import FeedCard from '@/components/home/FeedCard';
import Topbar from '@/components/home/Topbar';

import { withAuth } from '@/utils/withAuth';

import { getFollowingPosts } from '@/services/post.service';

import { HomeProps } from '@/types/home';

export async function getServerSideProps(context: any) {
  const auth = await withAuth(context);

  if ('redirect' in auth) {
    return auth;
  }

  try {
    const posts = await getFollowingPosts(auth.props.token);

    return {
      props: {
        user: auth.props.user,
        posts,
      },
    };
  } catch (error) {
    return {
      props: {
        user: auth.props.user,
        posts: [],
      },
    };
  }
}

export default function HomePage({ user, posts }: HomeProps) {
  const filteredPosts = posts.filter((post) => post.imageUrl);

  return (
    <main className="flex min-h-screen bg-black text-white">
      <Sidebar user={user} />

      <section className="flex-1 overflow-y-auto pb-24 md:pb-0">
        <Topbar />

        <div className="mx-auto max-w-3xl px-4 py-4 md:px-6 md:py-6">
          <StoryBar />

          <div className="mt-6">
            <FeedCard posts={filteredPosts} user={user} />
          </div>
        </div>
      </section>
    </main>
  );
}
