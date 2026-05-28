interface FeedCardProps {
  posts: any[];
}

export default function FeedCard({ posts }: FeedCardProps) {
  if (!posts?.length) {
    return <div className="py-20 text-center text-zinc-500">No posts yet</div>;
  }

  return (
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
              <h2 className="font-semibold">{post.user?.name}</h2>

              <p className="text-sm text-zinc-500">@{post.user?.username}</p>
            </div>
          </div>

          {/* IMAGE */}
          <img src={post.imageUrl} alt="post" className="max-h-[700px] w-full object-cover" />

          {/* CAPTION */}
          <div className="p-5">
            <p className="font-semibold">@{post.user?.username}</p>

            <p className="mt-2 text-zinc-300">{post.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
