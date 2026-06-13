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
      <div className="fixed inset-0 z-50 bg-black/90 sm:flex sm:items-center sm:justify-center sm:p-6">
        <div className="flex h-full w-full flex-col bg-zinc-950 sm:h-[90vh] sm:max-w-6xl sm:flex-row sm:overflow-hidden sm:rounded-3xl">
          {/* IMAGE */}
          <div className="h-[35vh] shrink-0 bg-black sm:h-auto sm:flex-1">
            <img
              src={modal.imageUrl || '/images/default_image.png'}
              alt="post"
              onError={(e) => {
                e.currentTarget.src = '/images/default_image.png';
              }}
              className="h-full w-full object-cover"
            />
          </div>

          {/* RIGHT */}
          <div className="flex min-h-0 flex-1 flex-col sm:w-[420px] sm:border-l sm:border-zinc-800">
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

            <div className="min-h-0 flex-1 overflow-y-auto">
              <PostModalContent post={post} caption={modal.caption} comments={modal.comments} />
            </div>

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
