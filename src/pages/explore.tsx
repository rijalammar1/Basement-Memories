import Sidebar from '@/components/home/Sidebar';

import ExploreSearch from '@/components/explore/ExploreSearch';

import ExploreUserCard from '@/components/explore/ExploreUserCard';

import useExplore from '@/hooks/useExplore';

export default function ExplorePage() {
  const { user, keyword, filteredUsers, loading, handleSearch, handleFollow } = useExplore();

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar user={user} />

      <main className="flex-1 p-4 pb-28 md:p-10">
        <h1 className="mb-6 text-2xl font-bold md:mb-8 md:text-4xl">Explore</h1>

        <ExploreSearch
          keyword={keyword}
          totalUsers={filteredUsers.length}
          onSearch={handleSearch}
        />

        <div className="mt-4 grid gap-4 md:gap-5">
          {!keyword.trim() ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center text-sm text-zinc-400 md:rounded-3xl md:p-10 md:text-base">
              Search users by username
            </div>
          ) : loading ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center text-sm text-zinc-400 md:rounded-3xl md:p-10 md:text-base">
              Searching users...
            </div>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((item) => (
              <ExploreUserCard
                key={item.id}
                item={item}
                loading={loading}
                onFollow={handleFollow}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center text-sm text-zinc-400 md:rounded-3xl md:p-10 md:text-base">
              User not found
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
