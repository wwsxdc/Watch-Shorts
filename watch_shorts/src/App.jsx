import "./App.css";
import StoryBar from "./components/StoryBar";
import StoryViewerModal from "./components/StoryViewerModal";
import { useStories } from "./hooks/useStories";

function App() {
  const {
    stories,
    activeStoryIndex,
    isViewerOpen,
    isAddingStory,
    storyError,
    addStory,
    openViewer,
    closeViewer,
    goNext,
    goPrev,
  } = useStories();

  return (
    <main className="app">
      <header className="app__header">
        <h1 className="text-4xl text-center">Watch Shorts</h1>
      </header>

      <StoryBar
        stories={stories}
        onAddStory={addStory}
        onOpenStory={openViewer}
        isAddingStory={isAddingStory}
        storyError={storyError}
      />

      <StoryViewerModal
        stories={stories}
        activeIndex={activeStoryIndex}
        isOpen={isViewerOpen}
        onClose={closeViewer}
        onNext={goNext}
        onPrev={goPrev}
      />
    </main>
  );
}

export default App;
