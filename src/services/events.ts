import { request } from "./api";
import type { Event } from "../types";

export const getEvents = (params?: Record<string, string>) =>
  request.get<{ results: Event[] }>("/events/", { params });

export const getEvent = (id: number) =>
  request.get<Event>(`/events/${id}/`);
