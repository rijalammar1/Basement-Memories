import useStories from '@/hooks/useStories';
import { useRouter } from 'next/router';

export default function Stories() {
  const router = useRouter();

  const { stories, loading } = useStories();

  if (loading) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">Loading stories...</div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-4 md:gap-5 md:rounded-3xl md:p-5">
      {stories.map((story) => (
        <button
          key={story.id}
          onClick={() => router.push(`/story/${story.id}`)}
          className="flex min-w-fit flex-col items-center gap-2"
        >
          <div className="rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 p-[3px]">
            <img
              src={story.user?.profilePictureUrl || '/images/default-avatar.png'}
              alt={story.user?.username}
              className="h-10 w-10 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/images/default-avatar.png';
              }}
            />
          </div>

          <p className="max-w-[60px] truncate text-xs text-zinc-300 md:max-w-[80px] md:text-sm">
            {story.user?.username}
          </p>
        </button>
      ))}
    </div>
  );
}
