import Button from '@/components/ui/Button';

import { User } from '@/types/post';

import { useEditProfile } from '@/hooks/useEditProfile';

type Props = {
  user: User | null;

  onClose: () => void;

  onSuccess: () => void;
};

export default function EditProfileModal({ user, onClose, onSuccess }: Props) {
  const {
    form,

    loading,

    handleChange,

    handleSubmit,
  } = useEditProfile({
    user,

    onClose,

    onSuccess,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
      <div className="w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Edit Profile</h1>

          <button onClick={onClose} className="text-2xl text-zinc-400 transition hover:text-white">
            ✕
          </button>
        </div>

        {/* PREVIEW */}
        <div className="mb-8 flex items-center gap-5">
          <img
            src={form.profilePictureUrl || 'https://i.pravatar.cc/150'}
            alt="profile"
            className="h-24 w-24 rounded-full object-cover"
          />

          <div>
            <h2 className="text-2xl font-semibold">{form.name || 'No Name'}</h2>

            <p className="text-zinc-400">@{form.username || 'username'}</p>
          </div>
        </div>

        {/* FORM */}
        <div className="grid gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="rounded-2xl bg-zinc-800 px-5 py-4 outline-none"
          />

          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="rounded-2xl bg-zinc-800 px-5 py-4 outline-none"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="rounded-2xl bg-zinc-800 px-5 py-4 outline-none"
          />

          <input
            name="profilePictureUrl"
            value={form.profilePictureUrl}
            onChange={handleChange}
            placeholder="Profile Picture URL"
            className="rounded-2xl bg-zinc-800 px-5 py-4 outline-none"
          />

          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="rounded-2xl bg-zinc-800 px-5 py-4 outline-none"
          />

          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="min-h-[120px] rounded-2xl bg-zinc-800 px-5 py-4 outline-none"
          />

          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="Website"
            className="rounded-2xl bg-zinc-800 px-5 py-4 outline-none"
          />
        </div>

        {/* BUTTON */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-2xl border border-zinc-700 px-6 py-3 transition hover:bg-zinc-800"
          >
            Cancel
          </button>

          <div className="w-[140px]">
            <Button title={loading ? 'Saving...' : 'Save'} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
