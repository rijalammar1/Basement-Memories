import Button from '@/components/ui/Button';

import { User } from '@/types/post';

interface ProfileHeaderProps {
  user: User | null;

  postsCount: number;

  onEdit?: () => void;
}

export default function ProfileHeader({ user, postsCount, onEdit }: ProfileHeaderProps) {
  return (
    <div className="flex items-start gap-10 border-b border-zinc-800 pb-10">
      {/* PROFILE IMAGE */}
      <img
        src={user?.profilePictureUrl || 'https://i.pravatar.cc/300'}
        alt="profile"
        className="h-36 w-36 rounded-full object-cover"
      />

      {/* PROFILE INFO */}
      <div className="flex-1">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold">{user?.name || 'No Name'}</h1>

              <p className="text-2xl text-zinc-400">@{user?.username || 'username'}</p>
            </div>

            {/* BIO */}
            {user?.bio && <p className="mt-4 text-zinc-300">{user.bio}</p>}

            {/* WEBSITE */}
            {user?.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-blue-400 hover:underline"
              >
                {user.website}
              </a>
            )}
          </div>

          {/* EDIT BUTTON */}
          <div className="w-[160px]">
            <Button title="Edit Profile" onClick={onEdit} />
          </div>
        </div>

        {/* STATS */}
        <div className="mt-6 flex gap-8">
          <p>
            <span className="font-bold">{postsCount}</span> posts
          </p>

          <p>
            <span className="font-bold">{user?.totalFollowers || 0}</span> followers
          </p>

          <p>
            <span className="font-bold">{user?.totalFollowing || 0}</span> following
          </p>
        </div>
      </div>
    </div>
  );
}
