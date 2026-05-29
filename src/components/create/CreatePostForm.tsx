import { FiImage } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

import Button from '@/components/ui/Button';

import useCreatePostForm from '@/hooks/useCreatePostForm';

import { CreatePostFormProps } from '@/types/post';

export default function CreatePostForm({ token, user }: CreatePostFormProps) {
  const {
    caption,
    setCaption,

    imageUrl,
    setImageUrl,

    loading,
    handleSubmit,
  } = useCreatePostForm(token);

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-5">
        {/* CLOSE */}
        <button
          onClick={() => window.history.back()}
          className="rounded-full p-2 text-white transition hover:bg-zinc-800"
        >
          <IoClose size={26} />
        </button>

        {/* TITLE */}
        <h1 className="text-xl font-bold">Create New Post</h1>

        {/* PUBLISH */}
        <div className="w-[140px]">
          <Button title="Publish" loading={loading} onClick={handleSubmit} />
        </div>
      </div>

      {/* BODY */}
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
            <div className="flex h-[500px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-900">
              <div className="mb-5 rounded-full bg-zinc-800 p-6">
                <FiImage size={40} />
              </div>

              <h2 className="text-2xl font-semibold">Paste Image URL</h2>

              <p className="mt-2 text-zinc-400">Image preview will appear here</p>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col p-8">
          {/* USER */}
          <div className="mb-8 flex items-center gap-4">
            <img
              src={user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
              alt="profile"
              className="h-14 w-14 rounded-full object-cover"
            />

            <div>
              <h2 className="font-semibold text-white">{user?.name}</h2>

              <p className="text-sm text-zinc-400">@{user?.username}</p>
            </div>
          </div>

          {/* IMAGE URL */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-zinc-300">Image URL</label>

            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 transition outline-none focus:border-white"
            />
          </div>

          {/* CAPTION */}
          <div className="flex-1">
            <label className="mb-3 block text-sm font-medium text-zinc-300">Caption</label>

            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write your caption..."
              className="h-full min-h-[300px] w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 transition outline-none focus:border-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
