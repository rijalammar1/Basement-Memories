interface Props {
  posts: any[];

  onSelectPost: (post: any) => void;
}

export default function ProfilePostGrid({ posts, onSelectPost }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5">
      {posts.map((post) => (
        <button
          key={post.id}
          onClick={() => onSelectPost(post)}
          className="group aspect-square overflow-hidden rounded-xl md:rounded-2xl"
        >
          <img
            src={post.imageUrl || '/images/default_image.png'}
            alt="post"
            onError={(e) => {
              e.currentTarget.src = '/images/default_image.png';
            }}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
          />
        </button>
      ))}
    </div>
  );
}
