import { HiOutlineMoon, HiOutlineBell } from 'react-icons/hi';

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-900 bg-black/80 backdrop-blur-lg">
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        <h1 className="text-xl font-bold md:hidden">Photo App</h1>

        <div className="ml-auto flex items-center gap-3">
          <button className="rounded-xl p-2 transition hover:bg-zinc-900">
            <HiOutlineBell size={22} />
          </button>

          <button className="rounded-xl p-2 transition hover:bg-zinc-900">
            <HiOutlineMoon size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
