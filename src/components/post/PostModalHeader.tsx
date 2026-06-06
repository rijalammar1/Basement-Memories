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
    <div className="flex items-center justify-between border-b border-zinc-800 p-4 md:p-5">
      <div className="flex min-w-0 items-center gap-3 md:gap-4">
        <img
          src={post.user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
          alt="profile"
          className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12"
        />

        <div className="min-w-0">
          <p className="truncate font-semibold">@{post.user?.username}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-2">
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

        <button
          onClick={onClose}
          className="rounded-full p-2 text-white transition hover:bg-zinc-800"
        >
          <IoClose size={22} />
        </button>
      </div>
    </div>
  );
}
