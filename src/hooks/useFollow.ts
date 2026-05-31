import { useState } from 'react';

import toast from 'react-hot-toast';

import { getCookie } from 'cookies-next';

import { followUser, unfollowUser } from '@/services/follow.service';

export default function useFollow(initialFollowing = false) {
  const [following, setFollowing] = useState(initialFollowing);

  const [loading, setLoading] = useState(false);

  const toggleFollow = async (userId: string) => {
    try {
      const token = getCookie('token');

      if (!token) {
        toast.error('Unauthorized');

        return following;
      }

      setLoading(true);

      const action = following ? unfollowUser : followUser;

      await action(String(token), userId);

      const nextFollowing = !following;

      setFollowing(nextFollowing);

      toast.success(nextFollowing ? 'Follow success' : 'Unfollow success');

      return nextFollowing;
    } catch (error) {
      console.error(error);

      toast.error('Failed follow/unfollow user');

      return following;
    } finally {
      setLoading(false);
    }
  };

  return {
    following,
    loading,
    toggleFollow,
  };
}
