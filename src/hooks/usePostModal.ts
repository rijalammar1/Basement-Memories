import { useState } from 'react';

import toast from 'react-hot-toast';

import { getCookie } from 'cookies-next';

import {
  deletePost,
  updatePost,
  likePost,
  unlikePost,
  createComment,
} from '@/services/post.service';

import { Post, User } from '@/types/post';

interface UsePostModalProps {
  post: Post;

  user: User | null;

  loggedUser?: User | null;
}

export default function usePostModal({ post, user, loggedUser }: UsePostModalProps) {
  const [showMenu, setShowMenu] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [caption, setCaption] = useState(post.caption);

  const [imageUrl, setImageUrl] = useState(post.imageUrl);

  /*
    LIKE STATE
  */
  const [liked, setLiked] = useState(false);

  const [likesCount, setLikesCount] = useState(post.likesCount || 0);

  /*
    COMMENT STATE
  */
  const [comment, setComment] = useState('');

  const [comments, setComments] = useState<any[]>(post.comments || []);

  /*
    DELETE POST
  */
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

  /*
    UPDATE POST
  */
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

  /*
    LIKE / UNLIKE
  */
  const handleLike = async () => {
    try {
      const token = getCookie('token');

      if (!token) {
        toast.error('Unauthorized');

        return;
      }

      /*
        UNLIKE
      */
      if (liked) {
        await unlikePost(String(token), post.id);

        setLiked(false);

        setLikesCount((prev) => Math.max(prev - 1, 0));

        return;
      }

      /*
        LIKE
      */
      await likePost(String(token), post.id);

      setLiked(true);

      setLikesCount((prev) => prev + 1);
    } catch (error: any) {
      console.log(error?.response?.data || error.message);

      /*
        Kalau backend bilang already liked
        tetap bikin UI jadi liked
      */
      if (error?.response?.data?.message?.toLowerCase().includes('already liked')) {
        setLiked(true);

        setLikesCount((prev) => prev + 1);

        return;
      }

      toast.error(error?.response?.data?.message || 'Failed like post');
    }
  };

  /*
    COMMENT
  */
  const handleComment = async () => {
    try {
      const token = getCookie('token');

      if (!token) {
        toast.error('Unauthorized');

        return;
      }

      if (!comment.trim()) {
        toast.error('Comment required');

        return;
      }

      await createComment(String(token), {
        postId: post.id,
        comment,
      });

      /*
        OPTIMISTIC COMMENT
      */
      const newComment = {
        id: Date.now(),

        comment,

        user: {
          name: loggedUser?.name || 'Unknown User',

          username: loggedUser?.username || 'unknown',

          profilePictureUrl: loggedUser?.profilePictureUrl || 'https://i.pravatar.cc/150',
        },
      };

      setComments((prev) => [...prev, newComment]);

      setComment('');

      toast.success('Comment added');
    } catch (error: any) {
      console.log(error?.response?.data || error.message);

      toast.error(error?.response?.data?.message || 'Failed comment');
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

    liked,
    likesCount,
    handleLike,

    comment,
    setComment,

    comments,
    handleComment,
  };
}
