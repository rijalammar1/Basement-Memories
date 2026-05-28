import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { getCookie } from 'cookies-next';

import { getAllUsers, getProfile } from '@/services/user.service';

import { followUser } from '@/services/follow.service';

import { User } from '@/types/post';

export default function useExplore() {
  const [user, setUser] = useState<User | null>(null);

  const [users, setUsers] = useState<any[]>([]);

  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  const [keyword, setKeyword] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = getCookie('token');

      if (!token) return;

      const profile = await getProfile(String(token));

      setUser(profile);

      const allUsers = await getAllUsers(String(token));

      const filtered = allUsers.filter((item: any) => item?.id !== profile?.id);

      setUsers(filtered);
    } catch (error) {
      console.log(error);

      toast.error('Failed fetch users');
    }
  };

  /*
    SEARCH USER
  */
  const handleSearch = (value: string) => {
    setKeyword(value);

    if (!value.trim()) {
      setFilteredUsers([]);

      return;
    }

    const keywordLower = value.toLowerCase();

    const result = users.filter((item: any) => {
      const username = item?.username?.toString().toLowerCase() || '';

      const name = item?.name?.toString().toLowerCase() || '';

      return username.includes(keywordLower) || name.includes(keywordLower);
    });

    setFilteredUsers(result);
  };

  /*
    FOLLOW
  */
  const handleFollow = async (userId: number) => {
    try {
      const token = getCookie('token');

      if (!token) {
        toast.error('Unauthorized');

        return;
      }

      setLoading(true);

      // await followUser(String(token), userId);

      toast.success('Follow success');
    } catch (error) {
      console.log(error);

      toast.error('Failed follow user');
    } finally {
      setLoading(false);
    }
  };

  return {
    user,

    keyword,

    filteredUsers,

    loading,

    handleSearch,
    handleFollow,
  };
}
