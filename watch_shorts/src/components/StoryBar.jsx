import AddStoryButton from "./AddStoryButton";
import StoryCard from "./StoryCard";

function StoryBar({
  stories = [],
  onAddStory,
  onOpenStory,
  isAddingStory = false,
  storyError = "",
}) {
  return (
    <section aria-label="Stories" className="grid gap-2.5">
      <div
        className="mt-2 no-scrollbar flex items-center-safe gap-3 overflow-x-auto py-1 pb-2 border-2 rounded-2xl bg-gray-100"
        role="list"
        aria-label="Stories list"
      >
        <AddStoryButton onAddStory={onAddStory} />
        {stories.map((story, index) => (
          <StoryCard
            key={story.id ?? index}
            story={story}
            index={index}
            onOpen={onOpenStory}
          />
        ))}
      </div>

      {!stories.length ? (
        <p className="m-0 text-sm text-zinc-600">
          No stories yet. Add the first one.
        </p>
      ) : null}

      {isAddingStory ? (
        <p className="m-0 text-xs text-zinc-700">Uploading...</p>
      ) : null}
      {storyError ? (
        <p className="m-0 text-xs text-red-700" role="alert">
          {storyError}
        </p>
      ) : null}
    </section>
  );
}

export default StoryBar;
