import { useEffect, useState } from 'react';

import UpdatePostModal from './UpdatePostModal';
import PostModalHeader from './PostModalHeader';
import PostModalContent from './PostModalContent';
import PostModalFooter from './PostModalFooter';

import usePostModal from '@/hooks/usePostModal';

import { PostModalProps } from '@/types/post';

export default function PostModal({ post, user, loggedUser, onClose }: PostModalProps) {
  const modal = usePostModal({
    post,
    user,
    loggedUser,
  });

  const [loggedUserId, setLoggedUserId] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      setLoggedUserId(userId);
    }
  }, []);

  const isOwner = loggedUserId === post.user?.id;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-10">
        <div className="relative flex h-[90vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-zinc-950">
          {/* IMAGE */}
          <div className="flex flex-1 items-center justify-center bg-black">
            <img src={modal.imageUrl} alt="post" className="h-full w-full object-cover" />
          </div>

          {/* RIGHT */}
          <div className="flex w-[420px] flex-col border-l border-zinc-800">
            <PostModalHeader
              post={post}
              user={user}
              isOwner={isOwner}
              showMenu={modal.showMenu}
              setShowMenu={modal.setShowMenu}
              setShowUpdateModal={modal.setShowUpdateModal}
              handleDelete={modal.handleDelete}
              onClose={onClose}
            />

            <PostModalContent post={post} caption={modal.caption} comments={modal.comments} />

            <PostModalFooter
              liked={modal.liked}
              likesCount={modal.likesCount}
              handleLike={modal.handleLike}
              comment={modal.comment}
              setComment={modal.setComment}
              handleComment={modal.handleComment}
            />
          </div>
        </div>
      </div>

      {modal.showUpdateModal && isOwner && (
        <UpdatePostModal
          post={post}
          user={user}
          caption={modal.caption}
          imageUrl={modal.imageUrl}
          setCaption={modal.setCaption}
          setImageUrl={modal.setImageUrl}
          onSave={modal.handleUpdate}
          onClose={() => modal.setShowUpdateModal(false)}
        />
      )}
    </>
  );
}
