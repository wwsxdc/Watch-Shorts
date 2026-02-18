function StoryCard({ story, index, onOpen }) {
  const handleClick = () => {
    onOpen?.(index);
  };

  return (
    <button type="button" onClick={handleClick} aria-label={`Open story ${index + 1}`}>
      {story?.imageBase64 ? "Story" : "Empty"}
    </button>
  );
}

export default StoryCard;
