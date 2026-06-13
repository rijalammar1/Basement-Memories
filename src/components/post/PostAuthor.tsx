import { User } from '@/types/post';

interface Props {
  user: User | null;
}

export default function PostAuthor({ user }: Props) {
  return (
    <div className="mb-4 flex items-center gap-3 md:mb-6 md:gap-4">
      <img
        src={user?.profilePictureUrl || '/images/default-avatar.png'}
        alt="profile"
        className="h-12 w-12 rounded-full object-cover md:h-14 md:w-14"
      />
      <div>
        <h2 className="font-semibold text-white">@{user?.username}</h2>

        <p className="text-sm text-zinc-400">Create new post</p>
      </div>
    </div>
  );
}
