import { useState } from 'react';
import toast from 'react-hot-toast';
import { getCookie } from 'cookies-next';

import { updateProfile } from '@/services/user.service';
import { User } from '@/types/post';

type Props = {
  user: User | null;
  onSuccess: () => void;
  onClose: () => void;
};

export const useEditProfile = ({ user, onSuccess, onClose }: Props) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    profilePictureUrl: user?.profilePictureUrl || '',
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

      const errors: string[] = [];

      if (!form.name.trim()) {
        errors.push('Name is required');
      }

      if (!form.username.trim()) {
        errors.push('Username is required');
      }

      if (!form.email.trim()) {
        errors.push('Email is required');
      }

      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.push('Email format is invalid');
      }

      if (!isValidWebsite(form.website)) {
        errors.push('Website must be a valid URL (https://example.com)');
      }

      if (errors.length > 0) {
        toast.error(errors.join('\n'), {
          duration: 5000,
        });

        return;
      }

      setLoading(true);

      await updateProfile(String(token), {
        name: form.name,
        username: form.username,
        email: form.email,
        profilePictureUrl: form.profilePictureUrl,
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
    handleChange,
    handleSubmit,
  };
};
