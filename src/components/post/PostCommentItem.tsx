import { Comment } from '@/types/post';

interface Props {
  item: Comment;
}

export default function PostCommentItem({ item }: Props) {
  return (
    <div className="flex gap-3">
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
  );
}
