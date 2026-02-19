import { useRef } from "react";

function AddStoryButton({ onAddStory }) {
  const inputRef = useRef(null);

  const handlePick = () => {
    inputRef.current?.click();
  };
  const handleChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onAddStory?.(file);
    }
    event.target.value = "";
  };

  return (
    <div className="shrink-0">
      <button
        type="button"
        onClick={handlePick}
        aria-label="Add story"
        className="grid h-[72px] w-[72px] place-items-center overflow-hidden rounded-full border border-transparent bg-zinc-300 p-0 text-5xl leading-none text-zinc-900 ring-2 ring-zinc-900 hover:border-pink-500 duration-300"
      >
        <span className="-translate-y-1">+</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}

export default AddStoryButton;
