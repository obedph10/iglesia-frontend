import { request } from "./api";
import type { DonationOption, Donation } from "../types";

export const getDonationOptions = () =>
  request.get<DonationOption[]>("/donations/options/");

export const createDonation = (data: Partial<Donation>) =>
  request.post<Donation>("/donations/", data);
