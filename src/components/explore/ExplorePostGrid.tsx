interface Props {
  posts: any[];
}

export default function ExplorePostGrid({ posts }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => (
        <div key={post.id} className="overflow-hidden rounded-2xl bg-zinc-900">
          <img
            src={post.imageUrl || '/images/default_image.png'}
            alt="post"
            onError={(e) => {
              e.currentTarget.src = '/images/default_image.png';
            }}
            className="h-[220px] w-full object-cover transition duration-300 hover:scale-105 md:h-[280px]"
          />
        </div>
      ))}
    </div>
  );
}
