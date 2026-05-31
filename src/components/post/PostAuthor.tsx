import { User } from '@/types/post';

interface Props {
  user: User | null;
}

export default function PostAuthor({ user }: Props) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <img
        src={user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
        alt="profile"
        className="h-14 w-14 rounded-full object-cover"
      />

      <div>
        <h2 className="font-semibold">{user?.name}</h2>

        <p className="text-sm text-zinc-400">@{user?.username}</p>
      </div>
    </div>
  );
}
