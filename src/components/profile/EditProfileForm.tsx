import { EDIT_PROFILE_FIELDS } from '@/constants/profile';

interface Props {
  form: any;
  uploadedImageUrl: string;
  loadingUpload: boolean;

  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;

  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function EditProfileForm({
  form,
  uploadedImageUrl,
  loadingUpload,
  handleUpload,
  handleChange,
}: Props) {
  return (
    <div className="grid gap-3 md:gap-4">
      {/* PROFILE PICTURE */}
      <div className="mb-4 flex flex-col items-center gap-4">
        <img
          src={uploadedImageUrl || '/images/default-avatar.png'}
          alt="profile"
          className="h-28 w-28 rounded-full object-cover md:h-32 md:w-32"
          onError={(e) => {
            e.currentTarget.src = '/images/default-avatar.png';
          }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={loadingUpload}
          className="w-full rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white outline-none md:px-5 md:py-4"
        />

        {loadingUpload && <p className="text-sm text-zinc-400">Uploading image...</p>}
      </div>

      {/* INPUTS */}
      {EDIT_PROFILE_FIELDS.map((field) => (
        <input
          key={field.name}
          name={field.name}
          value={form[field.name] || ''}
          onChange={handleChange}
          placeholder={field.placeholder}
          className="w-full rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white transition outline-none focus:ring-2 focus:ring-white/20 md:rounded-2xl md:px-5 md:py-4 md:text-base"
        />
      ))}

      {/* BIO */}
      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
        placeholder="Bio"
        className="min-h-[100px] rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white transition outline-none focus:ring-2 focus:ring-white/20 md:min-h-[120px] md:rounded-2xl md:px-5 md:py-4 md:text-base"
      />

      {/* WEBSITE */}
      <input
        type="url"
        name="website"
        value={form.website}
        onChange={handleChange}
        placeholder="https://yourwebsite.com"
        className="w-full rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white transition outline-none focus:ring-2 focus:ring-white/20 md:rounded-2xl md:px-5 md:py-4 md:text-base"
      />
    </div>
  );
}
