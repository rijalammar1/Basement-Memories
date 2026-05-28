import Sidebar from '@/components/home/Sidebar';

import ExploreSearch from '@/components/explore/ExploreSearch';

import ExploreUserCard from '@/components/explore/ExploreUserCard';

import useExplore from '@/hooks/useExplore';

export default function ExplorePage() {
  const {
    user,

    keyword,

    filteredUsers,

    loading,

    handleSearch,
    handleFollow,
  } = useExplore();

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* SIDEBAR */}
      <Sidebar user={user} />

      {/* CONTENT */}
      <main className="flex-1 p-10">
        <h1 className="mb-8 text-4xl font-bold">Explore</h1>

        {/* SEARCH */}
        <ExploreSearch
          keyword={keyword}
          totalUsers={filteredUsers.length}
          onSearch={handleSearch}
        />

        {/* USERS */}
        <div className="grid gap-5">
          {/* BELUM SEARCH */}
          {!keyword.trim() ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
              Search users by username
            </div>
          ) : loading ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
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
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
              User not found
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
