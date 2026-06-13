interface Props {
  name?: string;

  username?: string;

  profilePictureUrl?: string;
}

export default function EditProfilePreview({ name, username, profilePictureUrl }: Props) {
  return (
    <div className="mb-6 flex flex-col items-center gap-4 text-center md:mb-8 md:flex-row md:gap-5 md:text-left">
      <img
        src={profilePictureUrl || '/images/default-avatar.png'}
        alt="profile"
        className="h-20 w-20 rounded-full object-cover md:h-24 md:w-24"
      />

      <div className="min-w-0">
        <h2 className="truncate text-xl font-semibold md:text-2xl">{name || 'No Name'}</h2>

        <p className="truncate text-sm text-zinc-400 md:text-base">@{username || 'username'}</p>
      </div>
    </div>
  );
}
