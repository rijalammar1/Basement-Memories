import { User } from './post';

export interface Story {
  id: string;

  imageUrl: string;

  caption: string;

  totalViews: number;

  createdAt: string;

  updatedAt?: string;

  user: User;
}

export interface CreateStoryPayload {
  imageUrl: string;

  caption: string;
}

export interface GetStoriesResponse {
  code: string;

  status: string;

  message: string;

  data: {
    totalItems: number;

    stories: Story[];
  };
}
