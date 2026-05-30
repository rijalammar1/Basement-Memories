import { useState } from 'react';

import Sidebar from '@/components/home/Sidebar';

import PostModal from '@/components/post/PostModal';

import ProfileHeader from '@/components/profile/ProfileHeader';

import ProfilePostGrid from '@/components/profile/ProfilePostGrid';

import EditProfileModal from '@/components/profile/EditProfileModal';

import { withAuth } from '@/utils/withAuth';

import { getUserPosts } from '@/services/user.service';

import { Post, ProfileProps } from '@/types/post';

export async function getServerSideProps(context: any) {
  const auth = await withAuth(context);

  if ('redirect' in auth) {
    return auth;
  }

  const { token, user } = auth.props;

  const posts = await getUserPosts(token, user.id);

  return {
    props: {
      user,
      posts,
    },
  };
}

export default function ProfilePage({ user, posts }: ProfileProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <main className="flex min-h-screen bg-black text-white">
      {/* SIDEBAR */}
      <Sidebar user={user} />

      {/* CONTENT */}
      <section className="flex-1 px-10 py-10">
        <div className="mx-auto max-w-5xl">
          {/* PROFILE HEADER */}
          <ProfileHeader
            user={user}
            postsCount={posts.length}
            onEdit={() => setOpenEditModal(true)}
            isOwner={true}
          />

          {/* POSTS */}
          <div className="mt-10">
            <ProfilePostGrid posts={posts} onSelectPost={setSelectedPost} />
          </div>
        </div>
      </section>

      {/* POST MODAL */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          user={user}
          loggedUser={user}
          onClose={() => setSelectedPost(null)}
        />
      )}

      {/* EDIT PROFILE MODAL */}
      {openEditModal && (
        <EditProfileModal
          user={user}
          onClose={() => setOpenEditModal(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </main>
  );
}
