import { User } from './post';

export interface Post {
  id: number;
  imageUrl: string;
  caption: string;
}

export interface HomeProps {
  user: User | null;
  posts: Post[];
}
