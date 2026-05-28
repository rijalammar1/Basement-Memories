import { FiImage } from 'react-icons/fi';

import Button from '@/components/ui/Button';

import useCreatePostForm from '@/hooks/useCreatePostForm';

import { CreatePostFormProps } from '@/types/post';

export default function CreatePostForm({ token, user }: CreatePostFormProps) {
  const { caption, setCaption, imageUrl, setImageUrl, loading, handleSubmit } =
    useCreatePostForm(token);

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-5">
        <h1 className="text-2xl font-bold">Create New Post</h1>

        <div className="w-[140px]">
          <Button title="Publish" loading={loading} onClick={handleSubmit} />
        </div>
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
            <div className="flex h-[500px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-900">
              <div className="mb-5 rounded-full bg-zinc-800 p-6">
                <FiImage size={40} />
              </div>

              <h2 className="text-2xl font-semibold">Paste Image URL</h2>

              <p className="mt-2 text-zinc-400">Image preview will appear here</p>
            </div>
          )}

          <input
            type="text"
            placeholder="https://image-url.com/photo.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-6 w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 transition outline-none focus:border-white"
          />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col p-8">
          {/* USER */}
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

          {/* CAPTION */}
          <textarea
            placeholder="Write your caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="h-[300px] resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-5 outline-none focus:border-zinc-600"
          />

          {/* FOOTER */}
          <div className="mt-auto pt-6">
            <div className="flex items-center justify-between text-sm text-zinc-500">
              <span>{caption.length} characters</span>

              <span>Ready to share </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
