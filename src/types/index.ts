export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type Project = {
  id: string;
  title: string;
  location: string;
  image: string;
  stats: { label: string; value: string }[];
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
  avatar?: string;
  initials?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  coverImage?: string;
  content: string;
  readingTime: string;
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ROICalculation = {
  monthlyBill: number;
  roofSize: number;
  location: string;
  annualSavings: number;
  paybackYears: number;
  recommendedPackage: string;
  systemSizeKw: number;
};
