import Link from 'next/link';

import Button from '@/components/ui/Button';

interface Props {
  item: any;
  loading: boolean;
  onFollow: (userId: string, isFollowing: boolean) => void;
}

export default function ExploreUserCard({ item, loading, onFollow }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:rounded-3xl md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link href={`/users/${item.id}`} className="flex items-center gap-4">
          <img
            src={item?.profilePictureUrl || '/images/default-avatar.png'}
            alt="profile"
            className="h-14 w-14 rounded-full object-cover md:h-16 md:w-16"
          />

          <div>
            <h2 className="text-base font-semibold md:text-xl">
              {item?.name || item?.username || 'User'}
            </h2>

            <p className="text-sm text-zinc-400 md:text-base">
              @{item?.username || item?.email?.split('@')[0] || 'unknown'}
            </p>
          </div>
        </Link>

        <div className="w-full md:w-[140px]">
          <Button
            title={loading ? 'Loading...' : item.isFollowing ? 'Unfollow' : 'Follow'}
            onClick={() => onFollow(item.id, item.isFollowing)}
          />
        </div>
      </div>
    </div>
  );
}
