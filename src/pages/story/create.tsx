import Sidebar from '@/components/home/Sidebar';
import CreateStoryForm from '@/components/story/CreateStoryForm';

import { withAuth } from '@/utils/withAuth';

import { CreateProps } from '@/types/post';

export const getServerSideProps = withAuth;

export default function CreateStoryPage({ user }: CreateProps) {
  return (
    <main className="flex min-h-screen bg-black text-white">
      <Sidebar user={user} />

      <section className="flex flex-1 items-center justify-center p-10">
        <CreateStoryForm />
      </section>
    </main>
  );
}
