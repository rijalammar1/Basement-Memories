import { Post } from '@/types/post';

interface Props {
  post: Post;
  caption: string;
  comments: any[];
}

export default function PostModalContent({ post, caption, comments }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-5">
      {/* CAPTION */}
      <div className="flex gap-3">
        <img
          src={post.user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
          alt="profile"
          className="h-10 w-10 rounded-full object-cover"
        />

        <div className="flex-1">
          <p className="text-zinc-300">
            <span className="font-semibold text-white">{post.user?.username}</span> {caption}
          </p>
        </div>
      </div>

      {/* COMMENTS */}
      <div className="mt-8 space-y-5">
        {comments.map((item) => (
          <div key={item.id} className="flex gap-3">
            <img
              src={item.user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
              alt="profile"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div className="flex-1">
              <p className="text-zinc-300">
                <span className="font-semibold text-white">{item.user?.username}</span>{' '}
                {item.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
