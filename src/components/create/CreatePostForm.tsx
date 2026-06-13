import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { IoClose } from 'react-icons/io5';

import { useRouter } from 'next/router';

import Button from '@/components/ui/Button';

import PostAuthor from '@/components/post/PostAuthor';

import PostImagePreview from '@/components/post/PostImagePreview';

import useCreatePost from '@/hooks/useCreatePost';

import { User } from '@/types/post';

interface Props {
  user: User | null;
}

export default function CreatePostForm({ user }: Props) {
  const router = useRouter();

  const { handleUpload, loadingUpload, handleCreatePost, loading, uploadedImageUrl } =
    useCreatePost();

  const [caption, setCaption] = useState('');

  const [imageUrl, setImageUrl] = useState('');

  const handleUploadImage = (e: any) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
  };

  useEffect(() => {
    if (uploadedImageUrl) {
      setImageUrl(uploadedImageUrl);
    }
  }, [uploadedImageUrl]);

  const handleSubmit = async () => {
    if (!imageUrl.trim()) {
      toast.error('Image URL required');

      return;
    }

    await handleCreatePost({
      caption,
      imageUrl,
    });
  };

  return (
    <div className="w-full max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-950 md:rounded-3xl">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-4 md:px-8 md:py-5">
        <h1 className="text-lg font-bold md:text-2xl">Create New Post</h1>

        <button
          onClick={() => router.back()}
          className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <IoClose size={24} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:min-h-[650px] lg:grid-cols-2">
        {/* LEFT */}
        <div className="border-b border-zinc-800 p-4 lg:border-r lg:border-b-0 lg:p-8">
          <PostImagePreview imageUrl={imageUrl} />
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="mt-4 w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-white md:mt-6 md:px-5 md:py-4"
          />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col p-4 md:p-8">
          <PostAuthor user={user} />

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write your caption..."
            className="mt-4 h-40 resize-none rounded-2xl border border-zinc-800 bg-zinc-900 p-4 outline-none md:h-[300px] md:p-5"
          />

          <div className="mt-6 md:mt-auto">
            <Button title="Publish Post" loading={loading} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
