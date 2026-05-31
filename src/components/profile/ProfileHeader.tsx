import { useState } from 'react';

import useFollow from '@/hooks/useFollow';

import { ProfileHeaderProps } from '@/types/profile';

export default function ProfileHeader({
  user,
  postsCount = 0,
  isOwner = false,
  isFollowing = false,
  onEdit,
}: ProfileHeaderProps) {
  const { following, loading, toggleFollow } = useFollow(isFollowing);

  const [followersCount, setFollowersCount] = useState(user?.totalFollowers ?? 0);

  const handleFollow = async () => {
    if (!user?.id) return;

    const nextFollowing = await toggleFollow(user.id);

    setFollowersCount((prev) => (nextFollowing ? prev + 1 : Math.max(prev - 1, 0)));
  };

  const buttonText = loading ? 'Loading...' : following ? 'Unfollow' : 'Follow';

  return (
    <div className="flex items-start gap-10 border-b border-zinc-800 pb-10">
      {/* Avatar */}
      <img
        src={user?.profilePictureUrl || 'https://i.pravatar.cc/300'}
        alt="profile"
        className="h-40 w-40 rounded-full object-cover"
      />

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center gap-5">
          <h1 className="text-4xl font-bold">{user?.name}</h1>

          {isOwner ? (
            <button
              onClick={onEdit}
              className="rounded-xl bg-white px-5 py-2 font-semibold text-black transition hover:opacity-80"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleFollow}
              disabled={loading}
              className="rounded-xl bg-white px-5 py-2 font-semibold text-black transition hover:opacity-80 disabled:opacity-50"
            >
              {buttonText}
            </button>
          )}
        </div>

        {/* Username */}
        <p className="mt-2 text-lg text-zinc-400">@{user?.username}</p>

        {/* Bio */}
        {user?.bio && <p className="mt-5 text-zinc-300">{user.bio}</p>}

        {/* Website */}
        {user?.website && (
          <a
            href={user.website}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block text-blue-400 hover:underline"
          >
            {user.website}
          </a>
        )}

        {/* Stats */}
        <div className="mt-6 flex gap-8">
          <div>
            <span className="font-bold">{postsCount}</span> Posts
          </div>

          <div>
            <span className="font-bold">{followersCount}</span> Followers
          </div>

          <div>
            <span className="font-bold">{user?.totalFollowing ?? 0}</span> Following
          </div>
        </div>
      </div>
    </div>
  );
}
