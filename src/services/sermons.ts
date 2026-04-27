import { request } from "./api";
import type { Sermon, Series } from "../types";

export const getSermons = (params?: Record<string, string>) =>
  request.get<{ results: Sermon[] }>("/sermons/", { params });

export const getSermon = (id: number) =>
  request.get<Sermon>(`/sermons/${id}/`);

export const getSeries = () =>
  request.get<Series[]>("/sermons/series/");
