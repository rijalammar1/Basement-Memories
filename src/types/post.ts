export interface User {
  id?: string;

  name: string;

  username: string;

  email?: string;

  profilePictureUrl?: string;

  phoneNumber?: string;

  bio?: string;

  website?: string;

  totalFollowers?: number;

  totalFollowing?: number;
}

export interface Comment {
  id?: string;

  comment: string;

  createdAt?: string;

  user?: User;
}

export interface Post {
  id: string;

  caption: string;

  imageUrl: string;

  likesCount?: number;

  commentsCount?: number;

  isLiked?: boolean;

  user?: User;

  comments?: Comment[];
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

  loggedUser?: User | null;

  onClose: () => void;
}

export interface UpdatePostModalProps {
  post: Post;

  user: User | null;

  caption: string;

  imageUrl: string;

  setCaption: (value: string) => void;

  setImageUrl: (value: string) => void;

  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;

  loadingUpload: boolean;

  onSave: () => void;

  onClose: () => void;
}
