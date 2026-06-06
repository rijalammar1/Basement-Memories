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
      <div className="space-y-8">
        {posts.map((post: any) => (
          <div
            key={post.id}
            className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950"
          >
            {/* HEADER */}
            <div className="flex items-center gap-3 p-5">
              <img
                src={post.user?.profilePictureUrl}
                alt="profile"
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <h2 className="font-semibold">{post.user?.username}</h2>
              </div>
            </div>

            {/* IMAGE */}
            <img
              src={post.imageUrl}
              alt="post"
              className="max-h-[700px] w-full cursor-pointer object-cover"
              onClick={() => setSelectedPost(post)}
            />

            {/* CAPTION */}
            <div className="p-5">
              <p className="text-zinc-300">
                <span className="font-semibold text-white">{post.user?.username}</span>{' '}
                {post.caption}
              </p>
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
