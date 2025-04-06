import { Experience, Project, Skill, Tool, Contact, Social } from "@/types";
// Instead of using JSX directly in data.ts, we'll use a function approach
// that will be rendered in the component

export const experiences: Experience[] = [
  {
    title: "Freelance WordPress Developer",
    company: "Self-employed",
    period: "2021 - Present",
    description:
      "Developing custom WordPress solutions for small businesses and professionals. Focused on creating maintainable websites that clients can easily manage themselves with minimal support needed.",
  },
  {
    title: "Web Development Consultant",
    company: "Various Clients",
    period: "2019 - 2021",
    description:
      "Provided web development consulting services to help clients establish their online presence with accessible, user-friendly websites that meet their specific business needs.",
  },
];

export const skills: Skill[] = [
  {
    name: "WordPress Development",
    percentage: 95,
  },
  {
    name: "PHP",
    percentage: 85,
  },
  {
    name: "HTML/CSS",
    percentage: 90,
  },
  {
    name: "JavaScript",
    percentage: 80,
  },
  {
    name: "UI/UX Design",
    percentage: 85,
  },
  {
    name: "Web Performance Optimization",
    percentage: 80,
  },
  {
    name: "SEO",
    percentage: 75,
  },
  {
    name: "Client Consultation",
    percentage: 90,
  },
];

export const tools: Tool[] = [
  {
    name: "WordPress",
    icon: "monitor",
  },
  {
    name: "VS Code",
    icon: "code",
  },
  {
    name: "Git",
    icon: "gitBranch",
  },
  {
    name: "Figma",
    icon: "penTool",
  },
  {
    name: "Adobe Creative Suite",
    icon: "paintBucket",
  },
  {
    name: "WP Plugins",
    icon: "puzzle",
  },
];

export const projects: Project[] = [
  {
    title: "Jennifer Mello, LICSW - Therapy Website",
    description: "A professional therapy practice website for Jennifer Mello, LICSW focused on creating a peaceful online presence for potential clients seeking trauma therapy services in Plymouth, MA.",
    image: "/assets/images/projects/project1.svg",
    tags: ["WordPress", "Healthcare", "Professional Services", "Responsive Design"],
    demoLink: "https://jmellolicsw.com/",
    codeLink: "https://github.com/chrisfolmar",
  },
  {
    title: "Locos Cocos Tacos - Restaurant Website",
    description: "A vibrant, engaging website for Locos Cocos Tacos in Kittery, Maine featuring online ordering, special promotions, and an interactive menu to enhance customer experience.",
    image: "/assets/images/projects/project2.svg",
    tags: ["WordPress", "Food & Beverage", "E-commerce", "Mobile-First"],
    demoLink: "https://locococostacos.com/",
    codeLink: "https://github.com/chrisfolmar",
  },
  {
    title: "Slip 14 - Marina & Restaurant Website",
    description: "A waterfront dining website showcasing the restaurant's unique location, menu offerings, and reservation system for an enhanced customer booking experience.",
    image: "/assets/images/projects/project3.svg",
    tags: ["WordPress", "Hospitality", "Booking System", "Visual Design"],
    demoLink: "https://www.slip14.com/",
    codeLink: "https://github.com/chrisfolmar",
  },
  {
    title: "Amy Cousineau, LICSW - Therapy Practice",
    description: "A professional therapy website for a licensed social worker serving Rhode Island and Massachusetts, designed to provide information about mental health services and treatment specializations.",
    image: "/assets/images/projects/project4.svg",
    tags: ["WordPress", "Healthcare", "Professional Services", "Accessibility"],
    demoLink: "https://acousineaulicsw.com/",
    codeLink: "https://github.com/chrisfolmar",
  },
];

export const contact: Contact = {
  email: "contact@chrisfolmar.com",
  phone: "(603) 988-7967",
  location: "Durham, NH",
};

export const testimonials = [
  {
    id: 1,
    name: "Jennifer Mello",
    position: "Licensed Clinical Social Worker",
    content: "Chris created exactly the website I envisioned for my therapy practice. The calming design perfectly represents my approach to trauma therapy, and my clients frequently comment on how easy the site is to navigate. Chris made the whole process simple and straightforward.",
    avatar: "/assets/images/testimonial1.jpg"
  },
  {
    id: 2,
    name: "Amy Cousineau",
    position: "LICSW Therapist",
    content: "Working with Chris was a fantastic experience. He understood my vision for a professional yet approachable therapy website and delivered beyond my expectations. The site is easy for me to maintain and has significantly increased my client inquiries.",
    avatar: "/assets/images/testimonial2.jpg"
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    position: "Restaurant Owner, Locos Cocos Tacos",
    content: "Our restaurant website needed to be vibrant, functional and easy to update with specials and events. Chris delivered a perfect solution that our customers love using for online orders. The site captures our restaurant's energy and has boosted our online presence.",
    avatar: "/assets/images/testimonial3.jpg"
  },
];

export const blogPosts = [
  {
    id: 1,
    title: "Helping Small Businesses Thrive with WordPress",
    excerpt: "How custom WordPress solutions can provide small businesses with professional websites that they can maintain themselves, reducing long-term costs while maintaining quality.",
    date: "2024-03-20",
    coverImage: "/assets/images/blog/blog1.svg",
    category: "WordPress",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "The 'Minimum Cost, Maximum Support' Approach to Web Development",
    excerpt: "Exploring my philosophy of creating websites that clients can maintain themselves while providing support only when needed, making web presence more affordable for small businesses.",
    date: "2024-02-15",
    coverImage: "/assets/images/blog/blog2.svg",
    category: "Business Strategy",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Designing Websites for Healthcare Professionals",
    excerpt: "Special considerations when creating websites for therapists, healthcare providers, and wellness professionals that balance professionalism with accessibility and comfort.",
    date: "2024-01-10",
    coverImage: "/assets/images/blog/blog3.svg",
    category: "Web Design",
    readTime: "8 min read"
  },
];

export const socials: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/chrisfolmar",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/clfolmar/",
    icon: "linkedin",
  },
  {
    name: "Twitter",
    url: "https://x.com/fomy",
    icon: "twitter",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/fomy/?hl=en",
    icon: "instagram",
  },
  {
    name: "Medium",
    url: "https://medium.com/@c.folmar/following",
    icon: "fileText",
  },
];
