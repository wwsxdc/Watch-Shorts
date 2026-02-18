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
    <div>
      <button type="button" onClick={handlePick} aria-label="Add story">
        +
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default AddStoryButton;
