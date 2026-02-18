import AddStoryButton from "./AddStoryButton";
import StoryCard from "./StoryCard";

function StoryBar({ stories, onAddStory, onOpenStory }) {
  return (
    <section aria-label="Stories">
      <AddStoryButton onAddStory={onAddStory} />

      <div>
        {stories.map((story, index) => (
          <StoryCard
            key={story.id ?? index}
            story={story}
            index={index}
            onOpen={onOpenStory}
          />
        ))}
      </div>
    </section>
  );
}

export default StoryBar;
