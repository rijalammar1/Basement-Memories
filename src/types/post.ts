export interface User {
  id?: string;

  name: string;

  username: string;

  email?: string;

  profilePictureUrl?: string;

  phoneNumber?: string;

  bio?: string;

  website?: string;
}

export interface Post {
  id: number;

  caption: string;

  imageUrl: string;

  likesCount?: number;

  user?: User;
}

export interface CreateProps {
  user: User | null;
}

export interface ProfileProps {
  user: User | null;

  posts: Post[];
}

export interface CreatePostFormProps {
  token: string;

  user: User | null;
}

export interface CreatePostPayload {
  caption: string;

  imageUrl: string;
}

export interface PostModalProps {
  post: Post;

  user: User | null;

  onClose: () => void;
}

export interface UpdatePostModalProps {
  post: Post;

  user: User | null;

  caption: string;

  imageUrl: string;

  setCaption: (value: string) => void;

  setImageUrl: (value: string) => void;

  onSave: () => void;

  onClose: () => void;
}
