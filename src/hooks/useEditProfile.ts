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
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = getCookie('token');

      if (!token) {
        toast.error('Unauthorized');

        return;
      }

      if (!form.name.trim()) {
        toast.error('Name required');

        return;
      }

      if (!form.username.trim()) {
        toast.error('Username required');

        return;
      }

      if (!form.email.trim()) {
        toast.error('Email required');

        return;
      }

      setLoading(true);

      const payload = {
        name: form.name,

        username: form.username,

        email: form.email,

        profilePictureUrl: form.profilePictureUrl,

        phoneNumber: form.phoneNumber,

        bio: form.bio,

        website: form.website,
      };

      await updateProfile(String(token), payload);

      toast.success('Profile updated');

      onSuccess();

      onClose();
    } catch (error: any) {
      console.log(error);

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
