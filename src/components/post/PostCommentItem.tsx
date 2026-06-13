import { Comment } from '@/types/post';

interface Props {
  item: Comment;
}

export default function PostCommentItem({ item }: Props) {
  return (
    <div className="flex gap-3">
      <img
        src={item.user?.profilePictureUrl || '/images/default-avatar.png'}
        alt="profile"
        className="h-10 w-10 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="text-sm break-words text-zinc-300 md:text-base">
          <span className="mr-2 font-semibold text-white">@{item.user?.username}</span>

          {item.comment}
        </p>
      </div>
    </div>
  );
}
