import { EDIT_PROFILE_FIELDS } from '@/constants/profile';

interface Props {
  form: any;

  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function EditProfileForm({ form, handleChange }: Props) {
  return (
    <div className="grid gap-3 md:gap-4">
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

      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
        placeholder="Bio"
        className="min-h-[100px] rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white transition outline-none focus:ring-2 focus:ring-white/20 md:min-h-[120px] md:rounded-2xl md:px-5 md:py-4 md:text-base"
      />

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
