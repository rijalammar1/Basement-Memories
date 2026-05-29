import PostCommentItem from './PostCommentItem';

import { Comment, User } from '@/types/post';

interface Props {
  user: User | null;

  caption: string;

  comments: Comment[];
}

export default function PostModalContent({ user, caption, comments }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-5">
      {/* CAPTION */}
      <div className="flex gap-3">
        <img
          src={user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
          alt="profile"
          className="h-10 w-10 rounded-full object-cover"
        />

        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">{user?.name}</p>

            <span className="text-sm text-zinc-500">@{user?.username}</span>
          </div>

          <p className="mt-1 text-zinc-300">{caption}</p>
        </div>
      </div>

      {/* COMMENTS */}
      <div className="mt-8 space-y-5">
        {comments.map((item) => (
          <PostCommentItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
