function StoryCard({ story, index, onOpen }) {
  const handleClick = () => {
    onOpen?.(index);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="grid shrink-0 cursor-pointer justify-items-center gap-1.5 border-0 bg-transparent p-0"
      aria-label={`Open story ${index + 1}`}
    >
      <span className="h-[72px] w-[72px] overflow-hidden rounded-full border border-transparent ring-2 ring-zinc-900 hover:border-pink-600 duration-300">
        {story?.imageBase64 ? (
          <img
            src={story.imageBase64}
            alt=""
            className="block h-full w-full rounded-full bg-zinc-300 object-cover"
          />
        ) : (
          <span className="grid h-full w-full place-items-center rounded-full bg-zinc-300 text-[11px] text-zinc-600">
            Empty
          </span>
        )}
      </span>
    </button>
  );
}

export default StoryCard;
