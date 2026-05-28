import Button from '@/components/ui/Button';

interface Props {
  keyword: string;

  totalUsers: number;

  onSearch: (value: string) => void;
}

export default function ExploreSearch({ keyword, totalUsers, onSearch }: Props) {
  return (
    <div className="mb-10 flex gap-4">
      <input
        type="text"
        placeholder="Search username..."
        value={keyword}
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none"
      />

      <div className="w-[140px]">
        <Button title={`${totalUsers} Users`} disabled />
      </div>
    </div>
  );
}
