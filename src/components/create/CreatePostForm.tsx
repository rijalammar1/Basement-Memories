import { useState } from 'react';

import toast from 'react-hot-toast';

import { IoClose } from 'react-icons/io5';

import { useRouter } from 'next/router';

import Button from '@/components/ui/Button';

import PostAuthor from '@/components/post/PostAuthor';

import PostImagePreview from '@/components/post/PostImagePreview';

import useCreatePost from '@/hooks/useCreatePost';

import { User } from '@/types/post';

interface Props {
  user: User | null;
}

export default function CreatePostForm({ user }: Props) {
  const router = useRouter();

  const { handleCreatePost, loading } = useCreatePost();

  const [caption, setCaption] = useState('');

  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async () => {
    if (!imageUrl.trim()) {
      toast.error('Image URL required');

      return;
    }

    await handleCreatePost({
      caption,
      imageUrl,
    });
  };

  return (
    <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-5">
        <h1 className="text-2xl font-bold">Create New Post</h1>

        <button
          onClick={() => router.back()}
          className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <IoClose size={24} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="grid min-h-[650px] grid-cols-2">
        {/* LEFT */}
        <div className="border-r border-zinc-800 p-8">
          <PostImagePreview imageUrl={imageUrl} />

          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="mt-6 w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 outline-none focus:border-white"
          />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col p-8">
          <PostAuthor user={user} />

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write your caption..."
            className="h-[300px] resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-5 outline-none"
          />

          <div className="mt-auto">
            <Button title="Publish Post" loading={loading} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
