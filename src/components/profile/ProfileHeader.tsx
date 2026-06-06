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
    <div className="flex flex-col items-center gap-6 border-b border-zinc-800 pb-8 text-center md:flex-row md:items-start md:gap-10 md:pb-10 md:text-left">
      {/* Avatar */}
      <img
        src={user?.profilePictureUrl || 'https://i.pravatar.cc/300'}
        alt="profile"
        className="h-28 w-28 rounded-full object-cover md:h-40 md:w-40"
      />

      {/* Info */}
      <div className="flex-1">
        {/* Name + Button */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-5">
          <h1 className="text-2xl font-bold md:text-4xl">{user?.name || user?.username}</h1>

          {isOwner ? (
            <button
              onClick={onEdit}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-80 md:px-5 md:text-base"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleFollow}
              disabled={loading}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-80 disabled:opacity-50 md:px-5 md:text-base"
            >
              {buttonText}
            </button>
          )}
        </div>

        {/* Username */}
        <p className="mt-2 text-sm text-zinc-400 md:text-lg">@{user?.username}</p>

        {/* Bio */}
        {user?.bio && <p className="mt-4 text-sm text-zinc-300 md:mt-5 md:text-base">{user.bio}</p>}

        {/* Website */}
        {user?.website && (
          <a
            href={user.website}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block text-sm break-all text-blue-400 hover:underline md:text-base"
          >
            {user.website}
          </a>
        )}

        {/* Stats */}
        <div className="mt-6 flex justify-center gap-6 text-sm md:justify-start md:gap-8 md:text-base">
          <div>
            <span className="font-bold">{postsCount}</span>
            <span className="ml-1">Posts</span>
          </div>

          <div>
            <span className="font-bold">{followersCount}</span>
            <span className="ml-1">Followers</span>
          </div>

          <div>
            <span className="font-bold">{user?.totalFollowing ?? 0}</span>
            <span className="ml-1">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
}
