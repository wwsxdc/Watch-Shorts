import { useEffect, useMemo, useState } from "react";
import { STORY_TTL_MS } from "../constants/story";
import { fileToBase64Constrained } from "../utils/image";
import {
  readStoriesFromStorage,
  writeStoriesToStorage,
} from "../utils/storage";

function removeExpiredStories(stories) {
  const now = Date.now();
  return stories.filter((story) => (story?.expiresAt ?? 0) > now);
}

export function useStories() {
  const [stories, setStories] = useState(() =>
    removeExpiredStories(readStoriesFromStorage()),
  );
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [storyError, setStoryError] = useState("");

  useEffect(() => {
    const timerId = setInterval(() => {
      setStories((prev) => removeExpiredStories(prev));
    }, 60_000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (!stories.length) {
      setActiveStoryIndex(0);
      setIsViewerOpen(false);
      return;
    }
    if (activeStoryIndex > stories.length - 1) {
      setActiveStoryIndex(stories.length - 1);
    }
  }, [stories, activeStoryIndex]);

  useEffect(() => {
    const cleaned = removeExpiredStories(stories);

    if (cleaned.length !== stories.length) {
      setStories(cleaned);
      return;
    }
    try {
      writeStoriesToStorage(cleaned);
    } catch {
      setStoryError("Не удалось сохранить историю");
    }
  }, [stories]);

  const addStory = async (file) => {
    if (!file) return false;

    setIsAddingStory(true);
    setStoryError("");

    try {
      const imageBase64 = await fileToBase64Constrained(file);
      const createdAt = Date.now();

      const nextStory = {
        id: crypto.randomUUID(),
        imageBase64,
        createdAt,
        expiresAt: createdAt + STORY_TTL_MS,
      };

      setStories((prev) => [...removeExpiredStories(prev), nextStory]);
      return true;
    } catch (error) {
      setStoryError(error?.message || "Ошибка при добавлении истории");
      return false;
    } finally {
      setIsAddingStory(false);
    }
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
      isAddingStory,
      storyError,
      addStory,
      openViewer,
      closeViewer,
      goNext,
      goPrev,
    }),
    [stories, activeStoryIndex, isViewerOpen, isAddingStory, storyError],
  );

  return value;
}
