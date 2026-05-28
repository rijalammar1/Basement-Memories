const users = [
  'https://i.pravatar.cc/100?img=1',
  'https://i.pravatar.cc/100?img=2',
  'https://i.pravatar.cc/100?img=3',
  'https://i.pravatar.cc/100?img=4',
  'https://i.pravatar.cc/100?img=5',
];

export default function Stories() {
  return (
    <div className="flex gap-5 overflow-x-auto rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
      {users.map((user, index) => (
        <div key={index} className="flex min-w-fit flex-col items-center gap-2">
          <div className="rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 p-[3px]">
            <img
              src={user}
              alt="story"
              className="h-16 w-16 rounded-full border-2 border-black object-cover"
            />
          </div>

          <p className="text-sm text-zinc-300">user{index + 1}</p>
        </div>
      ))}
    </div>
  );
}
