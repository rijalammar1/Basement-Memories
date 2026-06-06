import Button from '@/components/ui/Button';

interface Props {
  keyword: string;
  totalUsers: number;
  onSearch: (value: string) => void;
}

export default function ExploreSearch({ keyword, totalUsers, onSearch }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-3 md:mb-10 md:flex-row md:gap-4">
      <input
        type="text"
        placeholder="Search username..."
        value={keyword}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none md:px-5 md:py-4"
      />

      <div className="w-full md:w-[140px]">
        <Button title={`${totalUsers} Users`} disabled />
      </div>
    </div>
  );
}
