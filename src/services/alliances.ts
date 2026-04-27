import { request } from "./api";
import type { Alliance } from "../types";

export const getAlliances = () =>
  request.get<Alliance[]>("/alliances/");

export const getAlliance = (id: number) =>
  request.get<Alliance>(`/alliances/${id}/`);
