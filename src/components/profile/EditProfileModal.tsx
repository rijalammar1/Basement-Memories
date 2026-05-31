import Button from '@/components/ui/Button';

import { useEditProfile } from '@/hooks/useEditProfile';

import { EditProfileModalProps } from '@/types/profile';

import EditProfilePreview from './EditProfilePreview';

import EditProfileForm from './EditProfileForm';

export default function EditProfileModal({ user, onClose, onSuccess }: EditProfileModalProps) {
  const { form, loading, handleChange, handleSubmit } = useEditProfile({
    user,
    onClose,
    onSuccess,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
      <div className="w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Edit Profile</h1>

          <button onClick={onClose} className="text-2xl text-zinc-400 hover:text-white">
            ✕
          </button>
        </div>

        <EditProfilePreview
          name={form.name}
          username={form.username}
          profilePictureUrl={form.profilePictureUrl}
        />

        <EditProfileForm form={form} handleChange={handleChange} />

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-2xl border border-zinc-700 px-6 py-3 hover:bg-zinc-800"
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
