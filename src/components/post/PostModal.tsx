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
      <div className="fixed inset-0 z-50 bg-black/80 md:flex md:items-center md:justify-center md:p-10">
        <div className="relative flex h-screen w-full flex-col overflow-hidden bg-zinc-950 md:h-[90vh] md:max-w-6xl md:flex-row md:rounded-3xl">
          {/* IMAGE */}
          <div className="h-[40vh] bg-black md:h-auto md:flex-1">
            <img src={modal.imageUrl} alt="post" className="h-full w-full object-cover" />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-1 flex-col border-t border-zinc-800 md:w-[420px] md:border-t-0 md:border-l">
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
