import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getCookie } from 'cookies-next';
import { getAllUsers, getProfile } from '@/services/user.service';
import { followUser, unfollowUser, getMyFollowing } from '@/services/follow.service';
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

      const myFollowing = await getMyFollowing(String(token));

      const followingIds = myFollowing?.data?.users?.map((user: any) => user.id) || [];

      const filtered = allUsers
        .filter((item: any) => item?.id !== profile?.id)
        .map((item: any) => ({
          ...item,
          isFollowing: followingIds.includes(item.id),
        }));

      setUsers(filtered);
    } catch (error) {
      console.log(error);

      toast.error('Failed fetch users');
    }
  };
  const handleSearch = (value: string) => {
    setKeyword(value);

    if (!value.trim()) {
      setFilteredUsers([]);

      return;
    }

    const keywordLower = value.toLowerCase();

    const result = users.filter((item: any) => {
      const username = item?.username?.toLowerCase() || '';

      const name = item?.name?.toLowerCase() || '';

      return username.includes(keywordLower) || name.includes(keywordLower);
    });

    setFilteredUsers(result);
  };

  const handleFollow = async (userId: string, isFollowing: boolean) => {
    try {
      const token = getCookie('token');

      if (!token) {
        toast.error('Unauthorized');
        return;
      }

      setLoading(true);

      if (isFollowing) {
        await unfollowUser(String(token), userId);

        toast.success('Unfollow success');
      } else {
        await followUser(String(token), userId);

        toast.success('Follow success');
      }

      // update users utama
      const updatedUsers = users.map((item) =>
        item.id === userId
          ? {
              ...item,
              isFollowing: !isFollowing,
            }
          : item,
      );

      setUsers(updatedUsers);

      // update hasil search yang sedang tampil
      setFilteredUsers((prev) =>
        prev.map((item) =>
          item.id === userId
            ? {
                ...item,
                isFollowing: !isFollowing,
              }
            : item,
        ),
      );
    } catch (error) {
      console.log(error);

      toast.error('Failed');
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
