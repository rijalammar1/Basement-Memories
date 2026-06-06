import { Post } from '@/types/post';

interface Props {
  post: Post;
  caption: string;
  comments: any[];
}

export default function PostModalContent({ post, caption, comments }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-5">
      {/* CAPTION */}
      <div className="flex gap-3">
        <img
          src={post.user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
          alt="profile"
          className="h-9 w-9 flex-shrink-0 rounded-full object-cover md:h-10 md:w-10"
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm break-words text-zinc-300 md:text-base">
            <span className="mr-2 font-semibold text-white">@{post.user?.username}</span>
            {caption}
          </p>
        </div>
      </div>

      {/* COMMENTS */}
      <div className="mt-6 space-y-4 md:mt-8 md:space-y-5">
        {comments.map((item) => (
          <div key={item.id} className="flex gap-3">
            <img
              src={item.user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
              alt="profile"
              className="h-9 w-9 flex-shrink-0 rounded-full object-cover md:h-10 md:w-10"
            />

            <div className="min-w-0 flex-1">
              <p className="text-sm break-words text-zinc-300 md:text-base">
                <span className="mr-2 font-semibold text-white">@{item.user?.username}</span>
                {item.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
