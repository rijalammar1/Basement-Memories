import { User } from '@/types/post';

interface Props {
  user: User | null;

  postsCount?: number;

  isOwner?: boolean;

  onEdit?: () => void;
}

export default function ProfileHeader({ user, postsCount, isOwner, onEdit }: Props) {
  return (
    <div className="flex items-start gap-10 border-b border-zinc-800 pb-10">
      {/* AVATAR */}
      <img
        src={user?.profilePictureUrl || 'https://i.pravatar.cc/300'}
        alt="profile"
        className="h-40 w-40 rounded-full object-cover"
      />

      {/* INFO */}
      <div className="flex-1">
        {/* TOP */}
        <div className="flex items-center gap-5">
          <h1 className="text-4xl font-bold">{user?.name}</h1>

          {/* OWNER ONLY */}
          {isOwner && (
            <button
              onClick={onEdit}
              className="rounded-xl bg-white px-5 py-2 font-semibold text-black transition hover:opacity-80"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* USERNAME */}
        <p className="mt-2 text-lg text-zinc-400">@{user?.username}</p>

        {/* BIO */}
        {user?.bio && <p className="mt-5 text-zinc-300">{user.bio}</p>}

        {/* WEBSITE */}
        {user?.website && (
          <a
            href={user.website}
            target="_blank"
            className="mt-3 block text-blue-400 hover:underline"
          >
            {user.website}
          </a>
        )}

        {/* STATS */}
        <div className="mt-6 flex gap-8">
          <div>
            <span className="font-bold">{postsCount || 0}</span> Posts
          </div>
        </div>
      </div>
    </div>
  );
}
