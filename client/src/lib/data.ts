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
