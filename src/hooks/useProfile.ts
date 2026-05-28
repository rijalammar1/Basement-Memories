import { useEffect, useState } from 'react';

import { getProfile, getUserPosts } from '@/services/user.service';

export default function useProfile(token: string) {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getProfile(token);

        setUser(userData);

        const userPosts = await getUserPosts(token, userData.id);

        setPosts(userPosts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  return {
    user,
    posts,
    loading,
  };
}
