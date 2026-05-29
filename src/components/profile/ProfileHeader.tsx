import { User } from '@/types/post';

interface ProfileHeaderProps {
  user: User | null;

  postsCount: number;

  onEdit?: () => void;

  isOwner?: boolean;
}

export default function ProfileHeader({
  user,
  postsCount,
  onEdit,
  isOwner = false,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-10 border-b border-zinc-800 pb-10">
      {/* PROFILE IMAGE */}
      <img
        src={user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
        alt="profile"
        className="h-36 w-36 rounded-full object-cover"
      />

      {/* INFO */}
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">{user?.name}</h1>

          <p className="text-2xl text-zinc-400">@{user?.username}</p>

          {/* ONLY OWNER CAN EDIT */}
          {isOwner && (
            <button
              onClick={onEdit}
              className="rounded-2xl border border-zinc-700 px-5 py-2 transition hover:bg-zinc-800"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* STATS */}
        <div className="mt-5 flex gap-8">
          <p>
            <span className="font-bold">{postsCount}</span> posts
          </p>

          <p>
            <span className="font-bold">0</span> followers
          </p>

          <p>
            <span className="font-bold">0</span> following
          </p>
        </div>

        {/* BIO */}
        <p className="mt-5 text-zinc-400">{user?.bio || 'No bio yet'}</p>
      </div>
    </div>
  );
}
