import { useState } from 'react';
import toast from 'react-hot-toast';
import { getCookie } from 'cookies-next';

import { updateProfile, uploadProfileImage } from '@/services/user.service';

import { User } from '@/types/post';

type Props = {
  user: User | null;
  onSuccess: () => void;
  onClose: () => void;
};

export const useEditProfile = ({ user, onSuccess, onClose }: Props) => {
  const [loading, setLoading] = useState(false);

  const [loadingUpload, setLoadingUpload] = useState(false);

  const [uploadedImageUrl, setUploadedImageUrl] = useState(user?.profilePictureUrl || '');

  const [form, setForm] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.bio || '',
    website: user?.website || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      const token = getCookie('token');

      if (!token) {
        toast.error('Unauthorized');

        return;
      }

      setLoadingUpload(true);

      const response = await uploadProfileImage(String(token), file);

      setUploadedImageUrl(response.url);

      toast.success('Image uploaded');
    } catch (error: any) {
      console.error(error);

      toast.error(error?.response?.data?.message || 'Failed upload image');
    } finally {
      setLoadingUpload(false);
    }
  };

  const isValidWebsite = (url: string) => {
    if (!url.trim()) return true;

    try {
      const parsed = new URL(url);

      return (
        (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
        parsed.hostname.includes('.')
      );
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      const token = getCookie('token');

      if (!token) {
        toast.error('Unauthorized');

        return;
      }

      if (!isValidWebsite(form.website)) {
        toast.error('Website must be valid (https://example.com)');

        return;
      }

      setLoading(true);

      await updateProfile(String(token), {
        name: form.name,
        username: form.username,
        email: form.email,
        profilePictureUrl: uploadedImageUrl,
        phoneNumber: form.phoneNumber,
        bio: form.bio,
        website: form.website,
      });

      toast.success('Profile updated');

      onSuccess();

      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    loadingUpload,
    uploadedImageUrl,
    handleUpload,
    handleChange,
    handleSubmit,
  };
};
