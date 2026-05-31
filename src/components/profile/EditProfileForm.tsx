import { EDIT_PROFILE_FIELDS } from '@/constants/profile';

interface Props {
  form: any;

  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function EditProfileForm({ form, handleChange }: Props) {
  return (
    <div className="grid gap-4">
      {EDIT_PROFILE_FIELDS.map((field) => (
        <input
          key={field.name}
          name={field.name}
          value={form[field.name] || ''}
          onChange={handleChange}
          placeholder={field.placeholder}
          className="rounded-2xl bg-zinc-800 px-5 py-4 outline-none"
        />
      ))}

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
  );
}
