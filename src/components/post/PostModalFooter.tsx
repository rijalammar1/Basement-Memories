import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface Props {
  liked: boolean;

  likesCount: number;

  handleLike: () => void;

  comment: string;

  setComment: (value: string) => void;

  handleComment: () => void;
}

export default function PostModalFooter({
  liked,
  likesCount,
  handleLike,
  comment,
  setComment,
  handleComment,
}: Props) {
  return (
    <div className="border-t border-zinc-800 p-5">
      {/* LIKE */}
      <div className="mb-5 flex items-center gap-4">
        <button onClick={handleLike} className="text-white transition hover:scale-110">
          {liked ? <BsHeartFill size={26} className="text-red-500" /> : <BsHeart size={26} />}
        </button>

        <p className="text-sm text-zinc-400">{likesCount} like</p>
      </div>

      {/* COMMENT */}
      <div className="flex gap-3">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write comment..."
          className="flex-1 rounded-2xl bg-zinc-900 px-4 py-3 outline-none"
        />

        <button
          onClick={handleComment}
          className="rounded-2xl bg-white px-5 py-3 font-semibold text-black transition hover:opacity-80"
        >
          Send
        </button>
      </div>
    </div>
  );
}
