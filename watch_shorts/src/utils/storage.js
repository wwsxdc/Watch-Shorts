import { STORIES_STORAGE_KEY } from "../constants/story";

export function readStoriesFromStorage() {
  const raw = localStorage.getItem(STORIES_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeStoriesToStorage(stories) {
  localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(stories));
}
