import { useEffect, useMemo, useState } from "react";
import { STORY_TTL_MS } from "../constants/story";
import { fileToBase64Constrained } from "../utils/image";
import { readStoriesFromStorage, writeStoriesToStorage } from "../utils/storage";

function removeExpiredStories(stories) {
  const now = Date.now();
  return stories.filter((story) => (story?.expiresAt ?? 0) > now);
}

export function useStories() {
  const [stories, setStories] = useState(() => removeExpiredStories(readStoriesFromStorage()));
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    writeStoriesToStorage(stories);
  }, [stories]);

  const addStory = async (file) => {
    // TODO: wire AddStoryButton to provide real file.
    if (!file) return;

    const imageBase64 = await fileToBase64Constrained(file);
    const createdAt = Date.now();

    const nextStory = {
      id: crypto.randomUUID(),
      imageBase64,
      createdAt,
      expiresAt: createdAt + STORY_TTL_MS,
    };

    setStories((prev) => [...removeExpiredStories(prev), nextStory]);
  };

  const openViewer = (index) => {
    setActiveStoryIndex(index);
    setIsViewerOpen(true);
  };

  const closeViewer = () => setIsViewerOpen(false);

  const goNext = () => {
    setActiveStoryIndex((prev) => {
      if (!stories.length) return 0;
      return (prev + 1) % stories.length;
    });
  };

  const goPrev = () => {
    setActiveStoryIndex((prev) => {
      if (!stories.length) return 0;
      return (prev - 1 + stories.length) % stories.length;
    });
  };

  const value = useMemo(
    () => ({
      stories,
      activeStoryIndex,
      isViewerOpen,
      addStory,
      openViewer,
      closeViewer,
      goNext,
      goPrev,
    }),
    [stories, activeStoryIndex, isViewerOpen]
  );

  return value;
}
