import { useEffect, useRef } from "react";

function StoryViewerModal({
  stories,
  activeIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) {
  const pointerStartXRef = useRef(null);
  const swipeThreshold = 50;

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (!stories.length) return null;
  const activeStory = stories[activeIndex];
  if (!activeStory) return null;

  const handlePointerDown = (event) => {
    pointerStartXRef.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (pointerStartXRef.current === null) return;

    const deltaX = event.clientX - pointerStartXRef.current;
    pointerStartXRef.current = null;

    if (Math.abs(deltaX) < swipeThreshold) return;
    if (deltaX < 0) {
      onNext?.();
      return;
    }
    onPrev?.();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Story viewer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-zinc-900 p-3"
      >
        <div className="mb-3 flex items-center justify-between text-xs text-zinc-200">
          <span>
            {activeIndex + 1} / {stories.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-zinc-600 px-2 py-1 hover:bg-gray-500 duration-300"
          >
            Close
          </button>
        </div>

        <div
          className="aspect-[9/16] w-full select-none touch-pan-y overflow-hidden rounded-xl bg-black"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <img
            src={activeStory.imageBase64}
            alt={`Story ${activeIndex + 1}`}
            className="h-full w-full object-contain"
            draggable="false"
          />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onPrev}
            className="rounded-md border border-zinc-600 px-3 py-2 text-sm text-zinc-100 hover:bg-gray-500 duration-300"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={onNext}
            className="rounded-md border border-zinc-600 px-3 py-2 text-sm text-zinc-100 hover:bg-gray-500 duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoryViewerModal;
