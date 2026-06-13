import { useEffect, useRef, useState, useCallback } from 'react';
import { getCookie } from 'cookies-next';

import { getExplorePosts } from '@/services/post.service';

export default function useExplorePosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = useCallback(
    async (currentPage: number) => {
      try {
        if (loading) return;

        const token = getCookie('token');

        if (!token) return;

        setLoading(true);

        const response = await getExplorePosts(String(token), currentPage, 10);

        const data = response?.data;

        setPosts((prev) => {
          const existingIds = new Set(prev.map((item) => item.id));

          const newPosts = data.posts.filter((item: any) => !existingIds.has(item.id));

          return [...prev, ...newPosts];
        });

        setHasMore(currentPage < data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  /**
   * First Load
   */
  useEffect(() => {
    const loadInitialPosts = async () => {
      await fetchPosts(1);

      setInitialLoaded(true);
    };

    loadInitialPosts();
  }, []);

  /**
   * Infinite Scroll
   */
  useEffect(() => {
    if (!initialLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.3,
      },
    );

    const current = observerRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [hasMore, loading, initialLoaded]);

  /**
   * Fetch when page changes
   */
  useEffect(() => {
    if (!initialLoaded) return;

    if (page === 1) return;

    fetchPosts(page);
  }, [page, initialLoaded]);

  return {
    posts,
    loading,
    observerRef,
  };
}
