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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-10">
      <div className="relative flex h-[90vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-zinc-950">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 rounded-full bg-black/50 p-2 text-white transition hover:bg-black"
        >
          <IoClose size={26} />
        </button>

        {/* LEFT */}
        <div className="flex flex-1 items-center justify-center border-r border-zinc-800 bg-black p-8">
          {imageUrl ? (
            <img src={imageUrl} alt="preview" className="h-full w-full rounded-3xl object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-900">
              <div className="text-center">
                <h2 className="text-2xl font-semibold">Image Preview</h2>

                <p className="mt-2 text-zinc-400">Paste image URL below</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex w-[420px] flex-col p-6">
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

          {/* IMAGE URL */}
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="rounded-2xl border border-zinc-700 bg-black px-5 py-4 transition outline-none focus:border-white"
          />

          {/* CAPTION */}
          <textarea
            placeholder="Write your caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mt-6 h-[300px] resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition outline-none focus:border-zinc-600"
          />

          {/* BUTTON */}
          <div className="mt-auto pt-6">
            <Button title="Save Changes" onClick={onSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
