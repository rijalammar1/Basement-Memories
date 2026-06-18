import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { createStory, uploadStoryImage } from '@/services/story.service';

export default function useCreateStory() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      setLoadingUpload(true);

      const response = await uploadStoryImage(file);

      setUploadedImageUrl(response.url);

      toast.success('Image uploaded');
    } catch (error) {
      console.error(error);

      toast.error('Failed upload image');
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleCreateStory = async (caption: string) => {
    try {
      if (!uploadedImageUrl) {
        toast.error('Image required');

        return;
      }

      setLoading(true);

      await createStory({
        imageUrl: uploadedImageUrl,
        caption,
      });

      toast.success('Story created');

      router.push('/home');
    } catch (error: any) {
      console.error(error);

      toast.error(error?.response?.data?.message || 'Failed create story');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    loadingUpload,
    uploadedImageUrl,
    handleUpload,
    handleCreateStory,
  };
}
