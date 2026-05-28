import { useRouter } from 'next/router';
import { useState } from 'react';

import toast from 'react-hot-toast';

import { createPost } from '@/services/post.service';

import { CreatePostPayload } from '@/types/post';

export default function useCreatePost() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCreatePost = async (payload: CreatePostPayload) => {
    try {
      if (!payload.caption.trim() || !payload.imageUrl.trim()) {
        toast.error('Caption & Image URL wajib diisi');
        return;
      }

      setLoading(true);

      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        toast.error('Unauthorized');
        return;
      }

      await createPost(token, payload);

      toast.success('Post created successfully');

      router.push('/profile');
    } catch (error: any) {
      console.log(error?.response?.data || error.message);

      toast.error(error?.response?.data?.message || 'Failed create post');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCreatePost,
    loading,
  };
}
