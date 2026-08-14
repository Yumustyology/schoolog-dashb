import {
  getRequest,
  putRequest,
  publicGetRequest,
} from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type BrandSection = {
  websiteLogo?: string;
  heroSectionImage?: string;
  aboutUsImage?: string;
  retinaLogo?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  aboutUsText?: string;
};

export type FaqQuestion = { title: string; description: string };
export type FaqSection = Record<string, FaqQuestion[]>;

export type Testimonial = {
  name: string;
  role: string;
  date?: string;
  testimonial: string;
  image?: string;
};
export type TestimonialsSection = Testimonial[];

export type PartnerLogosSection = { logo: string }[];

export type SocialSection = {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
};

export type ContactSection = {
  websiteName?: string;
  address?: string;
  email?: string;
  customUrl?: string;
  supportEmail?: string;
  phoneNumber?: string;
  seoKeywords?: string[];
};

export type WebsiteContent = {
  brand?: BrandSection;
  faq?: FaqSection;
  testimonials?: TestimonialsSection;
  partnerLogos?: PartnerLogosSection;
  social?: SocialSection;
  contact?: ContactSection;
  updatedAt?: string;
};

// Authenticated: loads the current school's saved website content for the editor forms.
export async function getMyWebsiteContent(): Promise<ResponseType<WebsiteContent>> {
  return getRequest<WebsiteContent>('/website-content/school');
}

export async function saveBrandSection(payload: BrandSection): Promise<ResponseType<WebsiteContent>> {
  return putRequest<WebsiteContent>('/website-content/brand', payload);
}

export async function saveFaqSection(payload: FaqSection): Promise<ResponseType<WebsiteContent>> {
  return putRequest<WebsiteContent>('/website-content/faq', payload);
}

export async function saveTestimonialsSection(payload: TestimonialsSection): Promise<ResponseType<WebsiteContent>> {
  return putRequest<WebsiteContent>('/website-content/testimonials', { testimonials: payload });
}

export async function savePartnerLogosSection(payload: PartnerLogosSection): Promise<ResponseType<WebsiteContent>> {
  return putRequest<WebsiteContent>('/website-content/partner-logos', { partnerLogos: payload });
}

export async function saveSocialSection(payload: SocialSection): Promise<ResponseType<WebsiteContent>> {
  return putRequest<WebsiteContent>('/website-content/social', payload);
}

export async function saveContactSection(payload: ContactSection): Promise<ResponseType<WebsiteContent>> {
  return putRequest<WebsiteContent>('/website-content/contact', payload);
}

// Public (unauthenticated): fetches a school's published website content by tenant
// hostname, used server-side by the public website renderer.
export async function fetchPublicWebsiteContent(hostname: string): Promise<ResponseType<WebsiteContent>> {
  return publicGetRequest<WebsiteContent>('/website-content/public', { hostname });
}

const websiteContentActions = {
  getMyWebsiteContent,
  saveBrandSection,
  saveFaqSection,
  saveTestimonialsSection,
  savePartnerLogosSection,
  saveSocialSection,
  saveContactSection,
  fetchPublicWebsiteContent,
};

export default websiteContentActions;
