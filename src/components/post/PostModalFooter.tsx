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
    <div className="border-t border-zinc-800 p-4">
      {/* LIKE */}
      <div className="mb-4 flex items-center gap-4 md:mb-5">
        <button onClick={handleLike} className="text-white transition hover:scale-110">
          {liked ? <BsHeartFill size={26} className="text-red-500" /> : <BsHeart size={26} />}
        </button>

        <p className="text-sm text-zinc-400">{likesCount} likes</p>
      </div>

      {/* COMMENT */}
      <div className="flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write comment..."
          className="flex-1 rounded-xl bg-zinc-900 px-4 py-3 outline-none"
        />

        <button
          onClick={handleComment}
          className="rounded-xl bg-white px-4 py-3 font-semibold text-black"
        >
          Send
        </button>
      </div>
    </div>
  );
}
