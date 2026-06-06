import Sidebar from '@/components/home/Sidebar';

import CreatePostForm from '@/components/create/CreatePostForm';

import { withAuth } from '@/utils/withAuth';

import { CreateProps } from '@/types/post';

export const getServerSideProps = withAuth;

export default function CreatePage({ user }: CreateProps) {
  return (
    <main className="flex min-h-screen bg-black text-white">
      <Sidebar user={user} />

      <section className="flex flex-1 justify-center p-4 pb-28 md:p-10">
        <CreatePostForm user={user} />
      </section>
    </main>
  );
}
