import { useRouter } from 'next/router';

import toast from 'react-hot-toast';

import { useState } from 'react';

import { createStory } from '@/services/story.service';

export default function useCreateStory() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCreateStory = async (imageUrl: string, caption: string) => {
    try {
      setLoading(true);

      await createStory({
        imageUrl,
        caption,
      });

      toast.success('Story created');

      router.push('/home');
    } catch (error) {
      console.error(error);

      toast.error('Failed create story');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    handleCreateStory,
  };
}
