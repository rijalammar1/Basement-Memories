interface Props {
  name?: string;

  username?: string;

  profilePictureUrl?: string;
}

export default function EditProfilePreview({ name, username, profilePictureUrl }: Props) {
  return (
    <div className="mb-8 flex items-center gap-5">
      <img
        src={profilePictureUrl || 'https://i.pravatar.cc/150'}
        alt="profile"
        className="h-24 w-24 rounded-full object-cover"
      />

      <div>
        <h2 className="text-2xl font-semibold">{name || 'No Name'}</h2>

        <p className="text-zinc-400">@{username || 'username'}</p>
      </div>
    </div>
  );
}
