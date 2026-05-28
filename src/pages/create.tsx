import { useState } from 'react';

import Sidebar from '@/components/home/Sidebar';

import useCreatePost from '@/hooks/useCreatePost';

import { withAuth } from '@/utils/withAuth';

import { CreateProps } from '@/types/post';

export const getServerSideProps = withAuth;

export default function CreatePage({ user }: CreateProps) {
  const { handleCreatePost, loading } = useCreatePost();

  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async () => {
    if (!imageUrl.trim()) {
      alert('Image URL required');
      return;
    }

    await handleCreatePost({
      caption,
      imageUrl,
    });
  };

  return (
    <main className="flex min-h-screen bg-black text-white">
      <Sidebar user={user} />

      <section className="flex flex-1 items-center justify-center p-10">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-5">
            <h1 className="text-2xl font-bold">Create New Post</h1>

            <button className="text-zinc-400 hover:text-white">Draft</button>
          </div>

          <div className="grid min-h-[650px] grid-cols-2">
            {/* LEFT */}
            <div className="border-r border-zinc-800 p-8">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="preview"
                  className="h-[500px] w-full rounded-3xl object-cover"
                />
              ) : (
                <div className="flex h-[500px] items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-900">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold">Image Preview</h2>

                    <p className="mt-2 text-zinc-400">Paste image URL </p>
                  </div>
                </div>
              )}

              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mt-6 w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 outline-none focus:border-white"
              />
            </div>

            {/* RIGHT */}
            <div className="flex flex-col p-8">
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
                  alt="profile"
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <h2 className="font-semibold">{user?.name}</h2>

                  <p className="text-sm text-zinc-400">@{user?.username}</p>
                </div>
              </div>

              <textarea
                placeholder="Write your caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="h-[300px] resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-5 outline-none"
              />

              <div className="mt-auto">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full rounded-2xl bg-white py-4 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? 'Publishing...' : 'Publish Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
