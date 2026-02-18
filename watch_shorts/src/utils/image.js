import { MAX_IMAGE_HEIGHT, MAX_IMAGE_WIDTH } from "../constants/story";

function resizeImageToBase64(img, maxWidth, maxHeight) {
  const sourceWidth = img.width;
  const sourceHeight = img.height;
  const scale = Math.min(maxWidth / sourceWidth, maxHeight / sourceHeight, 1);
  const targetWidth = Math.max(1, Math.round(sourceWidth * scale));
  const targetHeight = Math.max(1, Math.round(sourceHeight * scale));

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D context is not available");
  }

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  return canvas.toDataURL("image/jpeg", 0.9);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

export async function fileToBase64Constrained(file) {
  if (!file) {
    throw new Error("No file provided");
  }

  if (!file.type?.startsWith("image/")) {
    throw new Error("Selected file is not an image");
  }

  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(dataUrl);
  return resizeImageToBase64(image, MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT);
}
