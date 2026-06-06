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
    <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 md:rounded-3xl">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-4 md:px-8 md:py-5">
        <h1 className="text-xl font-bold md:text-2xl">Create Story</h1>

        <button
          onClick={() => router.back()}
          className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <IoClose size={24} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 md:p-8">
        {/* IMAGE URL */}
        <div className="mb-5 md:mb-6">
          <label className="mb-2 block text-sm md:text-base">Image URL</label>

          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm outline-none md:rounded-2xl md:px-5 md:py-4 md:text-base"
          />
        </div>

        {/* PREVIEW */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="preview"
            className="mb-5 h-[250px] w-full rounded-2xl object-cover md:mb-6 md:h-[500px] md:rounded-3xl"
          />
        )}

        {/* CAPTION */}
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Caption..."
          className="mb-5 h-32 w-full resize-none rounded-xl border border-zinc-700 bg-black p-4 text-sm outline-none md:mb-6 md:h-40 md:rounded-2xl md:p-5 md:text-base"
        />

        {/* BUTTON */}
        <Button title="Create Story" loading={loading} onClick={handleSubmit} className="w-full" />
      </div>
    </div>
  );
}
