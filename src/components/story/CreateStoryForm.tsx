import { useState } from 'react';

import toast from 'react-hot-toast';

import { IoClose } from 'react-icons/io5';

import { useRouter } from 'next/router';

import Button from '@/components/ui/Button';

import useCreateStory from '@/hooks/useCreateStory';

export default function CreateStoryForm() {
  const router = useRouter();

  const { handleCreateStory, loading } = useCreateStory();

  const [caption, setCaption] = useState('');

  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async () => {
    if (!imageUrl.trim()) {
      toast.error('Image URL required');

      return;
    }

    await handleCreateStory(imageUrl, caption);
  };

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-5">
        <h1 className="text-2xl font-bold">Create Story</h1>

        <button
          onClick={() => router.back()}
          className="rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          <IoClose size={24} />
        </button>
      </div>

      <div className="p-8">
        <div className="mb-6">
          <label className="mb-2 block">Image URL</label>

          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 outline-none"
          />
        </div>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="preview"
            className="mb-6 h-[500px] w-full rounded-3xl object-cover"
          />
        )}

        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Caption..."
          className="mb-6 h-40 w-full resize-none rounded-2xl border border-zinc-700 bg-black p-5 outline-none"
        />

        <Button title="Create Story" loading={loading} onClick={handleSubmit} />
      </div>
    </div>
  );
}
