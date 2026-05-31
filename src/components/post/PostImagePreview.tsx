interface Props {
  imageUrl: string;
}

export default function PostImagePreview({ imageUrl }: Props) {
  if (imageUrl) {
    return (
      <img src={imageUrl} alt="preview" className="h-[500px] w-full rounded-3xl object-cover" />
    );
  }

  return (
    <div className="flex h-[500px] items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-900">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Image Preview</h2>

        <p className="mt-2 text-zinc-400">Paste image URL</p>
      </div>
    </div>
  );
}
