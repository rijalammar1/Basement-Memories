import Sidebar from '@/components/home/Sidebar';

import ExploreSearch from '@/components/explore/ExploreSearch';
import ExploreUserCard from '@/components/explore/ExploreUserCard';
import ExplorePostGrid from '@/components/explore/ExplorePostGrid';

import useExplore from '@/hooks/useExplore';
import useExplorePosts from '@/hooks/useExplorePosts';

import { withPageAuth } from '@/utils/withPageAuth';

export const getServerSideProps = withPageAuth();

export default function ExplorePage() {
  const { user, keyword, filteredUsers, loading, handleSearch, handleFollow } = useExplore();

  const { posts, observerRef, loading: loadingPosts } = useExplorePosts();

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar user={user} />

      <main className="flex-1 p-4 pb-28 md:p-10">
        <h1 className="mb-8 text-4xl font-bold">Explore</h1>

        <ExploreSearch
          keyword={keyword}
          totalUsers={filteredUsers.length}
          onSearch={handleSearch}
        />

        {keyword.trim() ? (
          <div className="mt-5 grid gap-4">
            {filteredUsers.map((item) => (
              <ExploreUserCard
                key={item.id}
                item={item}
                loading={loading}
                onFollow={handleFollow}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="mt-6">
              <ExplorePostGrid posts={posts} />
            </div>

            <div ref={observerRef} className="h-20" />

            {loadingPosts && <p className="mt-6 text-center text-zinc-400">Loading...</p>}
          </>
        )}
      </main>
    </div>
  );
}
