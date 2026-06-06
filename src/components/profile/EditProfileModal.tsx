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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 md:p-5">
      <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:rounded-3xl md:p-8">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between md:mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">Edit Profile</h1>

          <button
            onClick={onClose}
            className="text-xl text-zinc-400 transition hover:text-white md:text-2xl"
          >
            ✕
          </button>
        </div>

        {/* PREVIEW */}
        <EditProfilePreview
          name={form.name}
          username={form.username}
          profilePictureUrl={form.profilePictureUrl}
        />

        {/* FORM */}
        <EditProfileForm form={form} handleChange={handleChange} />

        {/* ACTIONS */}
        <div className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row md:justify-end md:gap-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl border border-zinc-700 px-6 py-3 transition hover:bg-zinc-800 md:w-auto md:rounded-2xl"
          >
            Cancel
          </button>

          <div className="w-full md:w-[140px]">
            <Button title={loading ? 'Saving...' : 'Save'} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
