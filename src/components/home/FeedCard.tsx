import { useState } from 'react';
import Link from 'next/link';

import PostModal from '@/components/post/PostModal';

interface FeedCardProps {
  posts: any[];
  user?: any;
}

export default function FeedCard({ posts, user }: FeedCardProps) {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  if (!posts?.length) {
    return <div className="py-20 text-center text-zinc-500">No posts yet</div>;
  }

  return (
    <>
      <div className="space-y-6 md:space-y-8">
        {posts.map((post: any) => (
          <div
            key={post.id}
            className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 md:rounded-3xl"
          >
            {/* HEADER */}
            <div className="flex items-center gap-3 p-4 md:p-5">
              <img
                src={post.user?.profilePictureUrl}
                alt="profile"
                className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12"
              />

              <div>
                <Link
                  href={`/user/${post.user?.id}`}
                  className="text-sm font-semibold hover:underline md:text-base"
                >
                  @{post.user?.username}
                </Link>
              </div>
            </div>

            {/* IMAGE */}
            <button onClick={() => setSelectedPost(post)} className="block w-full">
              <img
                src={post.imageUrl}
                alt="post"
                className="max-h-[500px] w-full object-cover md:max-h-[700px]"
              />
            </button>

            {/* CAPTION */}
            <div className="p-4 md:p-5">
              <p className="text-sm text-zinc-300 md:text-base">
                <span className="font-semibold text-white">@{post.user?.username}</span>{' '}
                {post.caption}
              </p>

              {/* OPEN MODAL BUTTON */}
              <button
                onClick={() => setSelectedPost(post)}
                className="mt-3 text-sm text-zinc-400 hover:text-white"
              >
                View comments
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          user={selectedPost.user}
          loggedUser={user}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </>
  );
}
