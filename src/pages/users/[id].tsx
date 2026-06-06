import { useState } from 'react';

import Sidebar from '@/components/home/Sidebar';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfilePostGrid from '@/components/profile/ProfilePostGrid';
import PostModal from '@/components/post/PostModal';

import { withAuth } from '@/utils/withAuth';

import { getUserById, getUserPosts } from '@/services/user.service';

import { getMyFollowing } from '@/services/follow.service';

export async function getServerSideProps(context: any) {
  const auth = await withAuth(context);

  if ('redirect' in auth) {
    return auth;
  }

  const { token, user } = auth.props;

  const { id } = context.params;

  const targetUser = await getUserById(token, id);

  const posts = await getUserPosts(token, id);

  const followingRes = await getMyFollowing(token);

  const followingUsers = followingRes?.data?.users || [];

  const isFollowing = followingUsers.some((item: any) => item.id === targetUser.id);

  return {
    props: {
      loggedUser: user,
      targetUser,
      posts,
      isFollowing,
    },
  };
}

interface Props {
  loggedUser: any;
  targetUser: any;
  posts: any[];
  isFollowing: boolean;
}

export default function UserDetailPage({ loggedUser, targetUser, posts, isFollowing }: Props) {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  return (
    <main className="flex min-h-screen bg-black text-white">
      <Sidebar user={loggedUser} />

      <section className="flex-1 px-4 py-4 pb-28 md:px-10 md:py-10">
        <div className="mx-auto max-w-5xl">
          <ProfileHeader
            user={targetUser}
            loggedUser={loggedUser}
            postsCount={posts.length}
            isOwner={false}
            isFollowing={isFollowing}
          />

          <div className="mt-6 md:mt-10">
            <ProfilePostGrid posts={posts} onSelectPost={(post) => setSelectedPost(post)} />
          </div>
        </div>
      </section>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          user={targetUser}
          loggedUser={loggedUser}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </main>
  );
}
