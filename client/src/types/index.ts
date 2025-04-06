export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  percentage: number;
  description?: string;
}

export interface Tool {
  name: string;
  icon: string; // Using icon name instead of JSX element
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  codeLink: string;
  date: string; // Added date field for sorting
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
}

export interface Social {
  name: string;
  url: string;
  icon: string; // Using icon name instead of JSX element
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ExtendedContactFormData extends ContactFormData {
  website?: string; // Honeypot field for bot detection
  formTime?: number; // Time tracking for bot detection
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  content: string;
  avatar: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string;
  category: string;
  readTime: string;
  content?: string; // Optional HTML content for full blog post
}
