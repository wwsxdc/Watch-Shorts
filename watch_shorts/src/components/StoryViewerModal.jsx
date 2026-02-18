function StoryViewerModal({
  stories,
  activeIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) {
  if (!isOpen) return null;

  const activeStory = stories[activeIndex];

  return (
    <section role="dialog" aria-modal="true" aria-label="Story viewer">
      <button type="button" onClick={onClose}>
        Close
      </button>
      <button type="button" onClick={onPrev}>
        Prev
      </button>
      <button type="button" onClick={onNext}>
        Next
      </button>
      <div>
        {activeStory?.imageBase64 ? "Active story preview" : "No active story"}
      </div>
    </section>
  );
}

export default StoryViewerModal;
