interface Props {
  imageUrl: string;
}

export default function PostImagePreview({ imageUrl }: Props) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt="preview"
        className="h-[250px] w-full rounded-2xl object-cover md:h-[500px] md:rounded-3xl"
      />
    );
  }

  return (
    <div className="flex h-[250px] items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 md:h-[500px] md:rounded-3xl">
      <div className="px-4 text-center">
        <h2 className="text-lg font-semibold md:text-2xl">Image Preview</h2>

        <p className="mt-2 text-sm text-zinc-400 md:text-base">Paste image URL</p>
      </div>
    </div>
  );
}
