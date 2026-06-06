import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { IoClose } from 'react-icons/io5';

import { getStoryById } from '@/services/story.service';
import { withAuth } from '@/utils/withAuth';

import { Story } from '@/types/story';

interface StoryPageProps {
  story: Story;
}

export default function StoryPage({ story }: StoryPageProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="relative h-[85vh] w-full max-w-[400px] overflow-hidden rounded-3xl border border-zinc-800">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 z-50 rounded-full bg-black/40 p-2 text-white backdrop-blur-md transition hover:bg-black/70"
        >
          <IoClose size={24} />
        </button>

        {/* IMAGE */}
        <img src={story.imageUrl} alt={story.caption} className="h-full w-full object-cover" />

        {/* BOTTOM INFO */}
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5">
          <div className="flex items-center gap-3">
            <img
              src={story.user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
              alt={story.user?.username}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <p className="font-semibold">@{story.user?.username}</p>

              <p className="text-sm text-zinc-300">{story.caption}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = await withAuth(context);

  if ('redirect' in auth) {
    return auth;
  }

  try {
    const story = await getStoryById(context.params?.id as string, auth.props.token);

    return {
      props: {
        story,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      notFound: true,
    };
  }
};
