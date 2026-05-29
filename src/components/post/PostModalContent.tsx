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

        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">{post.user?.name}</p>

            <span className="text-sm text-zinc-500">@{post.user?.username}</span>
          </div>

          <p className="mt-1 text-zinc-300">{caption}</p>
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

            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold">{item.user?.name}</p>

                <span className="text-sm text-zinc-500">@{item.user?.username}</span>
              </div>

              <p className="mt-1 text-zinc-300">{item.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
