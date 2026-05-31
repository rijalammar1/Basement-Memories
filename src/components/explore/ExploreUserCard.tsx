import Link from 'next/link';

import Button from '@/components/ui/Button';

interface Props {
  item: any;

  loading: boolean;

  onFollow: (userId: string, isFollowing: boolean) => void;
}

export default function ExploreUserCard({ item, loading, onFollow }: Props) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
      <Link href={`/users/${item.id}`} className="flex flex-1 items-center gap-4">
        <img
          src={item?.profilePictureUrl || 'https://i.pravatar.cc/150'}
          alt="profile"
          className="h-16 w-16 rounded-full object-cover"
        />

        <div>
          <h2 className="text-xl font-semibold">{item?.name || 'No Name'}</h2>

          <p className="text-zinc-400">
            @{item?.username || item?.email?.split('@')[0] || 'unknown'}
          </p>
        </div>
      </Link>

      <div className="w-[140px]">
        <Button
          title={loading ? 'Loading...' : item.isFollowing ? 'Unfollow' : 'Follow'}
          onClick={() => onFollow(item.id, item.isFollowing)}
        />
      </div>
    </div>
  );
}
