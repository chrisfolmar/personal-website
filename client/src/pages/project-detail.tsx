import { useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Code, ExternalLink, Globe } from "lucide-react";
import { projects } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LazyImage from "@/components/LazyImage";

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("twitter:title", title, "property");
    setMeta("twitter:description", description, "property");

    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);
}

export default function ProjectDetail() {
  const [location, setLocation] = useLocation();
  const params = useParams();
  const projectId = params?.id || null;
  
  const project = projects.find(project => {
    const urlTitle = project.title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
      
    return urlTitle === projectId;
  });

  usePageMeta(
    project ? `${project.title} | Chris Folmar` : "Project | Chris Folmar",
    project ? project.description : "Project details by Chris Folmar"
  );
  
  useEffect(() => {
    if (!projectId) {
      setLocation("/not-found");
      return;
    }
    
    if (!project) {
      setLocation("/not-found");
      return;
    }
    
    window.scrollTo(0, 0);
  }, [projectId, project, setLocation]);
  
  if (!project) {
    return (
      <div className="py-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  let clientInfo = "";
  let techStack = "";
  let challenge = "";
  let solution = "";
  
  if (project.title.includes("Jennifer Mello")) {
    clientInfo = "Jennifer Mello is a Licensed Independent Clinical Social Worker who specializes in trauma therapy. Her practice in Massachusetts focuses on providing a safe, supportive environment for clients dealing with trauma, anxiety, and depression.";
    techStack = "WordPress, WPBakery Page Builder, Contact Form 7, Slider Revolution, Google Font API, Font Awesome, Jetpack Site Accelerator, Doxy.me telemedicine integration";
    challenge = "Jennifer needed a website that would reflect the calming, professional nature of her practice while making it easy for potential clients to learn about her services and get in touch. The site needed to handle sensitive information securely and present resources for trauma therapy in an accessible way.";
    solution = "I created a serene, minimalist design with soft blues and calming imagery that immediately puts visitors at ease. The site features a clear overview of Jennifer's trauma therapy specializations, secure contact forms, and detailed service descriptions. Special attention was paid to creating a navigation structure that would be intuitive for users who might be experiencing distress.";
  } 
  else if (project.title.includes("Amy Cousineau")) {
    clientInfo = "Amy Cousineau is a Licensed Independent Clinical Social Worker servicing both Rhode Island and Massachusetts. Her practice specializes in treating anxiety, depression, PTSD, and providing supportive services for the LGBTQIA+ community.";
    techStack = "WordPress, WPBakery Page Builder, Font Awesome, Slider Revolution, Contact Form 7, Jetpack Site Accelerator, Google Maps integration, Wordfence Security, Yoast SEO";
    challenge = "Amy required a professional website that would appeal to a diverse client base across two states. She needed to clearly communicate her specialty areas while presenting a warm, approachable persona that would help potential clients feel comfortable reaching out.";
    solution = "I designed a modern, inclusive website with warm color tones and thoughtful typography that reflects Amy's approachable personality. The site features intuitive navigation to specialty areas, state-specific information for her multi-state practice, and secure contact forms for initial consultations. The responsive design ensures a seamless experience for all visitors, regardless of their device.";
  }
  else if (project.title.includes("Locos Cocos")) {
    clientInfo = "Loco Cocos Tacos is a popular Mexican restaurant in Kittery, Maine known for its authentic cuisine, vibrant atmosphere, and commitment to using fresh, local ingredients whenever possible. The restaurant offers dine-in, takeout, and catering services.";
    techStack = "WordPress, HubSpot WordPress Plugin, Jetpack, BatCache, DoorDash integration, Jetpack Site Accelerator, Gravatar Profiles, CrUX Dataset optimization";
    challenge = "Loco Cocos Tacos needed a website that would showcase their colorful, energetic brand while providing practical functionality for online ordering, event announcements, and special promotions. The site needed to handle peak traffic during busy restaurant hours without slowing down.";
    solution = "I created a vibrant, visually appealing website that captures the restaurant's lively atmosphere. The site features an efficient online ordering system optimized for both desktop and mobile users, an interactive menu with high-quality food photography, and special sections highlighting Happy Hour specials and events. Performance optimization ensures the site remains fast and responsive even during high-traffic periods.";
  }
  else if (project.title.includes("Slip 14")) {
    clientInfo = "Located on Nantucket's historic Boat Basin, Slip 14 has offered dockside dining with beautiful harbor breezes for 17 seasons. We serve lunch and dinner in our casual bar area or relaxed inside dining room with a focus on local seafood and fresh seasonal fare.";
    techStack = "WordPress, Google Font API, Easy Fancybox, Endurance Page Cache, Enjoy Social Feed (Instagram integration), Font Awesome, MailChimp for WordPress, Jetpack Site Accelerator";
    challenge = "Slip 14 needed a website that would highlight its unique waterfront location and showcase its fresh seafood menu. The site required an integrated reservation system, seasonal menu updates, and features to promote special events such as live music nights and seasonal offerings.";
    solution = "I designed an elegant, coastal-themed website that emphasizes the restaurant's waterfront setting through high-quality photography and subtle nautical design elements. The site features a seamless reservation system integration, dynamic menus that can be easily updated by staff, and dedicated sections for events and specials. A full-width gallery showcases the venue's beautiful views and culinary offerings.";
  }
  else if (project.title.includes("Portfolio")) {
    clientInfo = "This personal portfolio site highlights my work as a Software Engineering Manager & Freelance developer based in Durham, NH. It serves as a central hub where friends, family, potential clients, and whomever can learn about me, explore the types of projects I take on, read my blog, and understand more about my leadership & development processes.";
    techStack = "React, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI, Wouter for routing";
    challenge = "I needed a modern, responsive portfolio that would effectively communicate my skills and services to potential clients. The site needed to showcase my work in an engaging way while also demonstrating my technical capabilities through its implementation.";
    solution = "I built this portfolio using modern web technologies to create a clean, professional showcase of my work. The site features a dark/light mode toggle, smooth animations for enhanced user experience, and responsive design that works perfectly across all devices. The component-based architecture allows for easy updates and maintenance.";
  }
  
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => {
            setLocation("/");
            setTimeout(() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }, 100);
          }}
          className="mb-6 flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className={index === 0 ? 
                    "bg-primary text-white hover:bg-primary/90" : 
                    "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  }
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{project.title}</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="mr-4">Completed: {formatDate(project.date)}</span>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <LazyImage 
              src={project.image} 
              alt={project.title}
              containerClassName="mb-10 rounded-xl overflow-hidden"
              containerStyle={{
                minHeight: '280px',
                maxHeight: '450px',
                width: '100%'
              }}
              objectFit="contain"
              aspectRatio="16/9"
            />
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>About the Client</h2>
              <p>{clientInfo}</p>
              
              <h2>Project Description</h2>
              <p>{project.description}</p>
              
              <div className="not-prose bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold mb-4">Technical Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies Used</h4>
                    <p className="text-gray-600 dark:text-gray-400">{techStack}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Project Type</h4>
                    <p className="text-gray-600 dark:text-gray-400">{project.tags[0]}</p>
                  </div>
                </div>
              </div>
              
              <h2>The Challenge</h2>
              <p>{challenge}</p>
              
              <h2>The Solution</h2>
              <p>{solution}</p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 gap-6">
              {project.codeLink === "https://github.com/chrisfolmar" ? (
                <a 
                  href={project.demoLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-primary text-white py-3 px-6 rounded-md flex items-center justify-center hover:bg-primary/90 transition-colors max-w-xs mx-auto"
                >
                  <Globe className="mr-2 h-5 w-5" />
                  Visit Live Website
                </a>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <a 
                    href={project.demoLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-primary text-white py-3 px-6 rounded-md flex items-center justify-center hover:bg-primary/90 transition-colors"
                  >
                    <Globe className="mr-2 h-5 w-5" />
                    Visit Live Website
                  </a>
                  <a 
                    href={project.codeLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="border border-gray-300 dark:border-gray-700 py-3 px-6 rounded-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Code className="mr-2 h-5 w-5" />
                    View Source Code
                  </a>
                </div>
              )}
            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-6">More Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects
                  .filter(p => p.title !== project.title)
                  .slice(0, 2)
                  .map((relatedProject, index) => {
                    const urlTitle = relatedProject.title
                      .toLowerCase()
                      .replace(/[^\w\s]/g, '')
                      .replace(/\s+/g, '-');
                      
                    return (
                      <div 
                        key={index} 
                        className="group cursor-pointer"
                        onClick={() => {
                          window.scrollTo(0, 0);
                          setLocation(`/project/${urlTitle}`);
                        }}
                      >
                        <div className="mb-3 overflow-hidden rounded-lg" style={{ height: '200px' }}>
                          <LazyImage 
                            src={relatedProject.image} 
                            alt={relatedProject.title} 
                            className="transition-transform duration-300 group-hover:scale-105"
                            containerClassName="w-full h-full"
                            objectFit="cover"
                            aspectRatio="16/9"
                          />
                        </div>
                        <h4 className="font-bold group-hover:text-primary transition-colors">
                          {relatedProject.title}
                        </h4>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}