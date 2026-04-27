import { request } from "./api";
import type { Page } from "../types";

export const getPages = () => request.get<Page[]>("/pages/");

export const getPageBySlug = (slug: string) =>
  request.get<Page>(`/pages/${slug}/`);
