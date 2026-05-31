import { User } from './post';

export interface ProfileHeaderProps {
  user: User | null;

  postsCount?: number;

  isOwner?: boolean;

  isFollowing?: boolean;

  onEdit?: () => void;
}

export interface EditProfileModalProps {
  user: User | null;

  onClose: () => void;

  onSuccess: () => void;
}
