import { request } from "./api";
import type { GalleryImage, GalleryCategory } from "../types";

export const getGalleryImages = (params?: Record<string, string>) =>
  request.get<{ results: GalleryImage[] }>("/gallery/images/", { params });

export const getGalleryCategories = () =>
  request.get<GalleryCategory[]>("/gallery/categories/");
