import { Experience, Project, Skill, Tool, Contact, Social } from "@/types";
// Instead of using JSX directly in data.ts, we'll use a function approach
// that will be rendered in the component

export const experiences: Experience[] = [
  {
    title: "Senior Software Engineer",
    company: "Tech Company, Inc.",
    period: "Jan 2020 - Present",
    description:
      "Led the development of critical web applications using React, Node.js, and AWS services. Implemented CI/CD pipelines and optimized application performance.",
  },
  {
    title: "Software Developer",
    company: "Digital Solutions Ltd.",
    period: "Jun 2017 - Dec 2019",
    description:
      "Developed and maintained multiple web applications. Collaborated with cross-functional teams to deliver high-quality software solutions on schedule.",
  },
];

export const skills: Skill[] = [
  {
    name: "JavaScript/TypeScript",
    percentage: 95,
  },
  {
    name: "React",
    percentage: 90,
  },
  {
    name: "Node.js",
    percentage: 85,
  },
  {
    name: "HTML5/CSS3",
    percentage: 90,
  },
  {
    name: "SQL/NoSQL",
    percentage: 80,
  },
];

export const tools: Tool[] = [
  {
    name: "Next.js",
    icon: "code",
  },
  {
    name: "Tailwind CSS",
    icon: "layoutGrid",
  },
  {
    name: "Redux",
    icon: "lineChart",
  },
  {
    name: "AWS",
    icon: "package",
  },
  {
    name: "Git/GitHub",
    icon: "gitBranch",
  },
  {
    name: "Docker",
    icon: "database",
  },
];

export const projects: Project[] = [
  {
    title: "E-commerce Web App",
    description: "A fully responsive e-commerce platform with product management, cart functionality, and payment integration.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    tags: ["React", "Node.js"],
    demoLink: "#",
    codeLink: "#",
  },
  {
    title: "Task Management App",
    description: "A productivity application with task organization, deadlines, and team collaboration features.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    tags: ["React", "Firebase"],
    demoLink: "#",
    codeLink: "#",
  },
  {
    title: "Financial Dashboard",
    description: "An interactive dashboard for visualizing financial data with charts, reports, and forecasting.",
    image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f",
    tags: ["TypeScript", "Next.js"],
    demoLink: "#",
    codeLink: "#",
  },
];

export const contact: Contact = {
  email: "your.email@example.com",
  phone: "+1 (234) 567-890",
  location: "San Francisco, California",
};

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Product Manager at TechCorp",
    content: "Working with this developer was an absolute pleasure. Their technical expertise and attention to detail resulted in a product that exceeded our expectations. I was particularly impressed with their ability to translate complex requirements into elegant solutions.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CTO at StartupInnovate",
    content: "One of the most talented developers I've worked with. They not only delivered high-quality code but also provided valuable insights that improved our overall product architecture. Their communication skills made the entire process smooth and effective.",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Frontend Lead at DesignHub",
    content: "I was blown away by the creativity and technical prowess demonstrated throughout our project. The developer showed exceptional problem-solving skills and consistently delivered work that was both visually stunning and functionally robust.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
];

export const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Explore the cutting-edge technologies and methodologies that are shaping the future of web development, from AI integration to serverless architectures.",
    date: "2024-03-20",
    coverImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Web Development",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Mastering TypeScript: Tips and Tricks for Clean Code",
    excerpt: "Discover advanced TypeScript patterns and techniques that will help you write more maintainable, scalable, and error-free code.",
    date: "2024-02-15",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "TypeScript",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Optimizing React Performance: A Deep Dive",
    excerpt: "Learn how to identify and resolve performance bottlenecks in your React applications through code splitting, memoization, and state management techniques.",
    date: "2024-01-10",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "React",
    readTime: "8 min read"
  },
];

export const socials: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: "linkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
    icon: "twitter",
  },
  {
    name: "Dribbble",
    url: "https://dribbble.com",
    icon: "dribbble",
  },
];
