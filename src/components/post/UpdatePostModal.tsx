import { IoClose } from 'react-icons/io5';

import Button from '@/components/ui/Button';

import { UpdatePostModalProps } from '@/types/post';

export default function UpdatePostModal({
  user,
  caption,
  imageUrl,
  setCaption,
  setImageUrl,
  onSave,
  onClose,
}: UpdatePostModalProps) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/80 md:flex md:items-center md:justify-center md:p-10">
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-zinc-950 md:h-[90vh] md:max-w-6xl md:flex-row md:rounded-3xl">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 rounded-full bg-black/50 p-2 text-white transition hover:bg-black"
        >
          <IoClose size={24} />
        </button>

        {/* LEFT */}
        <div className="h-[40vh] bg-black md:flex-1 md:border-r md:border-zinc-800 md:p-8">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="preview"
              className="h-full w-full object-cover md:rounded-3xl"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-900 md:rounded-3xl md:border md:border-dashed md:border-zinc-700">
              <div className="text-center">
                <h2 className="text-lg font-semibold md:text-2xl">Image Preview</h2>

                <p className="mt-2 text-sm text-zinc-400 md:text-base">Paste image URL below</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex flex-1 flex-col p-4 md:w-[420px] md:p-6">
          {/* USER */}
          <div className="mb-4 flex items-center gap-3 md:mb-6 md:gap-4">
            <img
              src={user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
              alt="profile"
              className="h-12 w-12 rounded-full object-cover md:h-14 md:w-14"
            />

            <div>
              <h2 className="font-semibold">@{user?.username}</h2>

              <p className="text-sm text-zinc-400">Edit your post</p>
            </div>
          </div>

          {/* IMAGE URL */}
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="rounded-2xl border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-white md:px-5 md:py-4"
          />

          {/* CAPTION */}
          <textarea
            placeholder="Write your caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mt-4 h-[180px] resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-4 outline-none focus:border-zinc-600 md:mt-6 md:h-[300px] md:p-5"
          />

          {/* BUTTON */}
          <div className="mt-6 md:mt-auto md:pt-6">
            <Button title="Save Changes" onClick={onSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
