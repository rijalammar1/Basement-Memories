import { useEffect, useState } from 'react';

import { getFollowingStories } from '@/services/story.service';

import { Story } from '@/types/story';

export default function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    try {
      const response = await getFollowingStories();

      console.log(response);

      setStories(response.data.stories || []);
    } catch (error) {
      console.error(error);
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return {
    stories,
    loading,
    refetch: fetchStories,
  };
}
