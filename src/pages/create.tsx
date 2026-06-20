import Sidebar from '@/components/home/Sidebar';
import CreatePostForm from '@/components/create/CreatePostForm';

import { withPageAuth } from '@/utils/withPageAuth';

import { CreateProps } from '@/types/post';

export const getServerSideProps = withPageAuth();

export default function CreatePage({ user }: CreateProps) {
  return (
    <main className="flex min-h-screen bg-black text-white">
      <Sidebar user={user} />

      <section className="flex flex-1 justify-center overflow-y-auto px-4 py-4 pb-32 md:p-10">
        <CreatePostForm user={user} />
      </section>
    </main>
  );
}
