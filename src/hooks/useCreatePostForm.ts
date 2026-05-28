import { useState } from 'react';
import { useRouter } from 'next/router';

import { createPost } from '@/services/post.service';

import { CreatePostPayload } from '@/types/post';

export default function useCreatePostForm(token: string) {
  const router = useRouter();

  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!caption.trim() || !imageUrl.trim()) {
        alert('Caption & Image URL wajib diisi');
        return;
      }

      setLoading(true);

      const payload: CreatePostPayload = {
        caption,
        imageUrl,
      };

      await createPost(token, payload);

      alert('Post created successfully');

      router.push('/profile');
    } catch (error: any) {
      console.log(error?.response?.data || error.message);

      alert(error?.response?.data?.message || 'Failed create post');
    } finally {
      setLoading(false);
    }
  };

  return {
    caption,
    setCaption,
    imageUrl,
    setImageUrl,
    loading,
    handleSubmit,
  };
}
