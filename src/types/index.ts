export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
}

export interface Series {
  id: number;
  name: string;
  description: string;
  image: string | null;
  sermon_count: number;
  created_at: string;
}

export interface Sermon {
  id: number;
  title: string;
  description: string;
  speaker: string;
  youtube_url: string;
  date: string;
  image: string | null;
  series: number | null;
  series_name: string;
  series_detail?: Series;
  order: number;
  created_at: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string | null;
  end_date: string | null;
  location: string;
  image: string | null;
  category: string;
  registration_link: string;
  order: number;
  created_at: string;
}

export interface GalleryCategory {
  id: number;
  name: string;
  slug: string;
  order: number;
  image_count: number;
}

export interface GalleryImage {
  id: number;
  title: string;
  description: string;
  image: string;
  category: number | null;
  category_name: string;
  order: number;
  created_at: string;
}

export interface DonationOption {
  id: number;
  payment_method: "paypal" | "bank_transfer" | "card" | "other";
  label: string;
  description: string;
  bank_name: string;
  account_type: string;
  account_number: string;
  account_holder: string;
  identification: string;
  paypal_email: string;
  card_image: string | null;
  order: number;
}

export interface Donation {
  id: number;
  amount: string;
  donor_name: string;
  donor_email: string;
  payment_method: string;
  transaction_id: string;
  status: "pending" | "completed" | "failed";
  message: string;
  created_at: string;
}

export interface AllianceProject {
  id: number;
  title: string;
  description: string;
  image: string | null;
  impact_category: string;
  start_date: string;
  end_date: string | null;
  location: string;
  volunteers_needed: number;
  is_active: boolean;
  created_at: string;
}

export interface Alliance {
  id: number;
  name: string;
  description: string;
  logo: string | null;
  website: string;
  project_count: number;
  projects?: AllianceProject[];
  created_at: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface PrayerRequest {
  name?: string;
  email?: string;
  prayer_request: string;
  is_private?: boolean;
}

export interface SiteSettings {
  id: number;
  address: string;
  phone: string;
  email: string;
  youtube_url: string;
  facebook_url: string;
  instagram_url: string;
  tiktok_url: string;
  google_maps_url: string;
  about_us: string;
  our_faith: string;
  faith_declaration: string;
  home_title: string;
  home_subtitle: string;
  home_pillar_1_title: string;
  home_pillar_1_desc: string;
  home_pillar_2_title: string;
  home_pillar_2_desc: string;
  home_pillar_3_title: string;
  home_pillar_3_desc: string;
  home_pillar_4_title: string;
  home_pillar_4_desc: string;
  vision: string;
  mission: string;
  schedule: string;
  donations_bible_verse: string;
  donations_bible_reference: string;
  donations_why_donate: string;
}
