import api from '@/lib/api';
import { CreateStoryPayload, Story } from '@/types/story';

export async function createStory(payload: CreateStoryPayload) {
  const response = await api.post('/api/v1/create-story', payload);

  return response.data;
}

export async function uploadStoryImage(file: File) {
  const formData = new FormData();

  formData.append('image', file);

  const response = await api.post('/api/v1/upload-image', formData);

  return response.data;
}

export async function deleteStory(storyId: string) {
  const response = await api.delete(`/api/v1/delete-story/${storyId}`);

  return response.data;
}

export async function getStoryById(storyId: string, token: string): Promise<Story> {
  const response = await api.get(`/api/v1/story/${storyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

export async function getStoryViews(storyId: string) {
  const response = await api.get(`/api/v1/story-views/${storyId}`);

  return response.data.data;
}

export async function getFollowingStories(page = 1, size = 10) {
  const response = await api.get('/api/v1/following-story', {
    params: {
      page,
      size,
    },
  });

  return response.data;
}
