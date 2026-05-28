import { useState } from 'react';

import toast from 'react-hot-toast';

import { getCookie } from 'cookies-next';

import { deletePost, updatePost } from '@/services/post.service';

import { Post, User } from '@/types/post';

interface UsePostModalProps {
  post: Post;

  user: User | null;
}

export default function usePostModal({ post }: UsePostModalProps) {
  const [showMenu, setShowMenu] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [caption, setCaption] = useState(post.caption);

  const [imageUrl, setImageUrl] = useState(post.imageUrl);

  const handleDelete = async () => {
    try {
      const token = getCookie('token');

      if (!token) {
        toast.error('Unauthorized');

        return;
      }

      await deletePost(String(token), post.id);

      toast.success('Post deleted');

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.log(error?.response?.data || error.message);

      toast.error(error?.response?.data?.message || 'Failed delete post');
    }
  };

  const handleUpdate = async () => {
    try {
      const token = getCookie('token');

      if (!token) {
        toast.error('Unauthorized');

        return;
      }

      if (!caption.trim() || !imageUrl.trim()) {
        toast.error('Caption & Image URL required');

        return;
      }

      await updatePost(String(token), post.id, {
        caption,
        imageUrl,
      });

      toast.success('Post updated successfully');

      setShowUpdateModal(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.log(error?.response?.data || error.message);

      toast.error(error?.response?.data?.message || 'Failed update post');
    }
  };

  return {
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
  };
}
