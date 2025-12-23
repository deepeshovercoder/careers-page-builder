export interface Company {
  id: string;
  slug: string;
  name: string;
  user_id: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    bannerUrl: string;
    videoUrl: string;
  };
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Job {
  id: string;
  company_id: string;
  title: string;
  department?: string;
  location?: string;
  job_type?: string;
  description?: string;
  posted_at?: string;
  work_policy?: string;
  employment_type?: string;
  experience_level?: string;
  salary_range?: string;
  job_slug?: string;
  posted_days_ago?: number;
}
