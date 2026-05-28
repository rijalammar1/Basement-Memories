import { IoClose } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';

import UpdatePostModal from './UpdatePostModal';

import usePostModal from '@/hooks/usePostModal';

import { PostModalProps } from '@/types/post';

export default function PostModal({ post, user, onClose }: PostModalProps) {
  const {
    showMenu,
    setShowMenu,

    showUpdateModal,
    setShowUpdateModal,

    caption,
    setCaption,

    imageUrl,
    setImageUrl,

    handleDelete,
    handleUpdate,
  } = usePostModal({
    post,
    user,
  });

  return (
    <>
      {/* MAIN MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-10">
        <div className="relative flex h-[90vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-zinc-950">
          {/* IMAGE */}
          <div className="flex flex-1 items-center justify-center bg-black">
            <img src={imageUrl} alt="post" className="h-full w-full object-cover" />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex w-[420px] flex-col border-l border-zinc-800">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-zinc-800 p-5">
              {/* USER */}
              <div className="flex items-center gap-4">
                <img
                  src={user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
                  alt="profile"
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <h2 className="font-semibold text-white">{user?.name || 'Unknown User'}</h2>

                  <p className="text-sm text-zinc-400">@{user?.username || 'username'}</p>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex items-center gap-2">
                {/* MENU */}
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="rounded-full p-2 text-white transition hover:bg-zinc-800"
                  >
                    <BsThreeDots size={20} />
                  </button>

                  {showMenu && (
                    <div className="absolute top-12 right-0 z-[70] w-44 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
                      <button
                        onClick={() => {
                          setShowUpdateModal(true);

                          setShowMenu(false);
                        }}
                        className="w-full px-5 py-3 text-left text-white transition hover:bg-zinc-800"
                      >
                        Edit Post
                      </button>

                      <button
                        onClick={handleDelete}
                        className="w-full px-5 py-3 text-left text-red-500 transition hover:bg-zinc-800"
                      >
                        Delete Post
                      </button>
                    </div>
                  )}
                </div>

                {/* CLOSE */}
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-white transition hover:bg-zinc-800"
                >
                  <IoClose size={24} />
                </button>
              </div>
            </div>

            {/* CAPTION */}
            <div className="flex-1 overflow-y-auto p-5">
              <div className="flex gap-3">
                <img
                  src={user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{user?.name}</p>

                    <span className="text-sm text-zinc-500">@{user?.username}</span>
                  </div>

                  <p className="mt-1 text-zinc-300">{caption}</p>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="border-t border-zinc-800 p-5">
              <p className="text-sm text-zinc-400">{post.likesCount || 0} like</p>
            </div>
          </div>
        </div>
      </div>

      {/* UPDATE MODAL */}
      {showUpdateModal && (
        <UpdatePostModal
          post={post}
          user={user}
          caption={caption}
          imageUrl={imageUrl}
          setCaption={setCaption}
          setImageUrl={setImageUrl}
          onSave={handleUpdate}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </>
  );
}
