import { Post } from '@/types/post';

interface ProfilePostGridProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

export default function ProfilePostGrid({ posts, onSelectPost }: ProfilePostGridProps) {
  if (posts.length === 0) {
    return <div className="py-20 text-center text-zinc-500">No posts yet</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => onSelectPost(post)}
          className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-zinc-900"
        >
          <img
            src={post.imageUrl}
            alt="post"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 transition group-hover:opacity-100" />
        </div>
      ))}
    </div>
  );
}
