import { useState } from 'react';

import Sidebar from '@/components/home/Sidebar';

import ProfileHeader from '@/components/profile/ProfileHeader';

import ProfilePostGrid from '@/components/profile/ProfilePostGrid';

import PostModal from '@/components/post/PostModal';

import { withAuth } from '@/utils/withAuth';

import { getUserById, getUserPosts } from '@/services/user.service';

export async function getServerSideProps(context: any) {
  const auth = await withAuth(context);

  if ('redirect' in auth) {
    return auth;
  }

  const { token, user } = auth.props;

  const { id } = context.params;

  const targetUser = await getUserById(token, id);

  const posts = await getUserPosts(token, id);

  return {
    props: {
      loggedUser: user,

      targetUser,

      posts,
    },
  };
}

interface Props {
  loggedUser: any;

  targetUser: any;

  posts: any[];
}

export default function UserDetailPage({ loggedUser, targetUser, posts }: Props) {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  return (
    <main className="flex min-h-screen bg-black text-white">
      {/* SIDEBAR */}
      <Sidebar user={loggedUser} />

      {/* CONTENT */}
      <section className="flex-1 px-10 py-10">
        <div className="mx-auto max-w-5xl">
          {/* PROFILE */}
          <ProfileHeader user={targetUser} postsCount={posts.length} />

          {/* POSTS */}
          <div className="mt-10">
            <ProfilePostGrid posts={posts} onSelectPost={(post) => setSelectedPost(post)} />
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selectedPost && (
        <PostModal post={selectedPost} user={targetUser} onClose={() => setSelectedPost(null)} />
      )}
    </main>
  );
}
