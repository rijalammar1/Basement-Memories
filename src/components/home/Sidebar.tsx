import Link from 'next/link';

import { FiHome, FiCompass, FiPlusSquare, FiUser } from 'react-icons/fi';
import { MdOutlineAddCircle } from 'react-icons/md';

import { User } from '@/types/post';

interface SidebarProps {
  user: User | null;
}

export default function Sidebar({ user }: SidebarProps) {
  const menus = [
    {
      name: 'Home',
      href: '/home',
      icon: <FiHome size={22} />,
    },
    {
      name: 'Explore',
      href: '/explore',
      icon: <FiCompass size={22} />,
    },
    {
      name: 'Create Post',
      href: '/create',
      icon: <FiPlusSquare size={22} />,
    },
    {
      name: 'Create Story',
      href: '/story/create',
      icon: <MdOutlineAddCircle size={22} />,
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: <FiUser size={22} />,
    },
  ];

  return (
    <aside className="fixed right-0 bottom-0 left-0 z-50 border-t border-zinc-800 bg-black md:sticky md:top-0 md:flex md:h-screen md:w-[280px] md:flex-col md:border-t-0 md:border-r md:p-6">
      {/* DESKTOP LOGO */}
      <h1 className="hidden text-3xl font-bold md:mb-10 md:block">Photo App</h1>

      {/* MENU */}
      <nav className="flex items-center justify-around py-3 md:flex-1 md:flex-col md:items-stretch md:justify-start md:gap-2 md:py-0">
        {menus.map((menu) => (
          <Link
            key={menu.name}
            href={menu.href}
            className="flex items-center justify-center gap-3 rounded-xl px-3 py-3 transition hover:bg-zinc-900 md:justify-start md:px-4"
          >
            {menu.icon}

            <span className="hidden md:block">{menu.name}</span>
          </Link>
        ))}
      </nav>

      {/* USER CARD */}
      <div className="mt-auto hidden items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:flex">
        <img
          src={user?.profilePictureUrl || 'https://i.pravatar.cc/150'}
          alt="profile"
          className="h-14 w-14 rounded-full object-cover"
        />

        <div>
          <h2 className="font-semibold">{user?.name || user?.username || 'User'}</h2>

          <p className="text-sm text-zinc-400">@{user?.username || 'username'}</p>
        </div>
      </div>
    </aside>
  );
}
