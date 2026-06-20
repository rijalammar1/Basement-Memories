import Sidebar from '@/components/home/Sidebar';
import CreateStoryForm from '@/components/story/CreateStoryForm';

import { withPageAuth } from '@/utils/withPageAuth';

import { CreateProps } from '@/types/post';

export const getServerSideProps = withPageAuth();

export default function CreateStoryPage({ user }: CreateProps) {
  return (
    <main className="flex min-h-screen bg-black text-white">
      <Sidebar user={user} />

      <section className="flex flex-1 justify-center p-4 pb-28 md:p-10">
        <CreateStoryForm />
      </section>
    </main>
  );
}
