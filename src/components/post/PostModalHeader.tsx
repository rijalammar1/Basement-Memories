import { IoClose } from 'react-icons/io5';

import { BsThreeDots } from 'react-icons/bs';

import { Post, User } from '@/types/post';

interface Props {
  post: Post;

  user: User | null;

  isOwner: boolean;

  showMenu: boolean;

  setShowMenu: (value: boolean) => void;

  setShowUpdateModal: (value: boolean) => void;

  handleDelete: () => void;

  onClose: () => void;
}

export default function PostModalHeader({
  post,
  isOwner,
  showMenu,
  setShowMenu,
  setShowUpdateModal,
  handleDelete,
  onClose,
}: Props) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 p-5">
      {/* USER */}
      <div className="flex items-center gap-4">
        <img
          src={post.user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
          alt="profile"
          className="h-12 w-12 rounded-full object-cover"
        />

        <div>
          <h2 className="font-semibold text-white">{post.user?.name}</h2>

          <p className="text-sm text-zinc-400">@{post.user?.username}</p>
        </div>
      </div>

      {/* ACTION */}
      <div className="flex items-center gap-2">
        {/* ONLY OWNER */}
        {isOwner && (
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
        )}

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="rounded-full p-2 text-white transition hover:bg-zinc-800"
        >
          <IoClose size={24} />
        </button>
      </div>
    </div>
  );
}
