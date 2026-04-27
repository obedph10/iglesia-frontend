import { request } from "./api";
import type { ContactMessage, PrayerRequest, SiteSettings } from "../types";

export const sendContactMessage = (data: ContactMessage) =>
  request.post("/contact/messages/", data);

export const sendPrayerRequest = (data: PrayerRequest) =>
  request.post("/contact/prayer/", data);

export const getSiteSettings = () =>
  request.get<SiteSettings>("/contact/settings/");
