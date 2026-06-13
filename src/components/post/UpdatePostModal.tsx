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
    <div className="fixed inset-0 z-[60] bg-black/90 lg:flex lg:items-center lg:justify-center lg:p-6">
      <div className="flex h-full w-full flex-col bg-zinc-950 lg:h-[90vh] lg:max-w-6xl lg:flex-row lg:overflow-hidden lg:rounded-3xl">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 rounded-full bg-black/50 p-2 text-white transition hover:bg-black"
        >
          <IoClose size={24} />
        </button>

        {/* LEFT */}
        <div className="h-[35vh] shrink-0 bg-black lg:h-auto lg:flex-1 lg:border-r lg:border-zinc-800 lg:p-8">
          {imageUrl ? (
            <img
              src={imageUrl || '/images/default_image.png'}
              alt="preview"
              onError={(e) => {
                e.currentTarget.src = '/images/default_image.png';
              }}
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
        <div className="flex flex-1 flex-col p-4 lg:w-[420px] lg:p-6">
          {/* USER */}
          <div className="mb-4 flex items-center gap-3 md:mb-6 md:gap-4">
            <img
              src={user?.profilePictureUrl || '/images/default-avatar.png'}
              alt="profile"
              className="h-14 w-14 rounded-full object-cover"
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
            className="mt-4 h-40 resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-4 outline-none lg:h-[300px]"
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
