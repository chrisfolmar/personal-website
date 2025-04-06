import { useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Code, ExternalLink, Globe } from "lucide-react";
import { projects } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetail() {
  const [location, setLocation] = useLocation();
  const params = useParams();
  const projectId = params?.id || null;
  
  const project = projects.find(project => {
    // Convert title to URL-friendly string
    const urlTitle = project.title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
      
    return urlTitle === projectId;
  });
  
  useEffect(() => {
    console.log(`ProjectDetail component mounted/updated with projectId: ${projectId}`);
    
    if (!projectId) {
      console.warn("No project ID provided in URL, redirecting to not-found");
      setLocation("/not-found");
      return;
    }
    
    if (!project) {
      console.warn(`Project with ID ${projectId} not found, redirecting to not-found`);
      setLocation("/not-found");
      return;
    }
    
    // Scroll to top when component mounts or updates
    window.scrollTo(0, 0);
    
    console.log(`Successfully loaded project: "${project.title}"`);
  }, [projectId, project, setLocation]);
  
  if (!project) {
    return null;
  }

  // Client information based on project title
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
    techStack = "WordPress, WooCommerce, Restaurant Menu Plugin, Online Ordering System, Jetpack, Booking Calendar";
    challenge = "Loco Cocos Tacos needed a website that would showcase their colorful, energetic brand while providing practical functionality for online ordering, event announcements, and special promotions. The site needed to handle peak traffic during busy restaurant hours without slowing down.";
    solution = "I created a vibrant, visually appealing website that captures the restaurant's lively atmosphere. The site features an efficient online ordering system optimized for both desktop and mobile users, an interactive menu with high-quality food photography, and special sections highlighting Happy Hour specials and events. Performance optimization ensures the site remains fast and responsive even during high-traffic periods.";
  }
  else if (project.title.includes("Slip 14")) {
    clientInfo = "Slip 14 is a waterfront dining destination located at a marina in southern Maine. The restaurant specializes in fresh seafood and offers stunning water views from its deck seating area. It's a popular spot for both locals and tourists during the summer season.";
    techStack = "WordPress, Google Font API, Easy Fancybox, Endurance Page Cache, Enjoy Social Feed (Instagram integration), Font Awesome, MailChimp for WordPress, Jetpack Site Accelerator";
    challenge = "Slip 14 needed a website that would highlight its unique waterfront location and showcase its fresh seafood menu. The site required an integrated reservation system, seasonal menu updates, and features to promote special events such as live music nights and seasonal offerings.";
    solution = "I designed an elegant, coastal-themed website that emphasizes the restaurant's waterfront setting through high-quality photography and subtle nautical design elements. The site features a seamless reservation system integration, dynamic menus that can be easily updated by staff, and dedicated sections for events and specials. A full-width gallery showcases the venue's beautiful views and culinary offerings.";
  }
  else if (project.title.includes("Portfolio")) {
    clientInfo = "This personal portfolio site showcases my work as a WordPress developer based in Durham, NH. The site serves as a central hub for potential clients to learn about my services, view previous projects, and get in touch regarding their website needs.";
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
            console.log("Navigating back to projects section");
            setLocation("/");
            // Scroll to projects section after a short delay
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
            <div className="mb-10 rounded-xl overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  console.error(`Failed to load project image: ${project.image}`);
                  e.currentTarget.src = project.image + `?v=${Date.now()}`;
                }}
              />
            </div>
            
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
              {project.title.includes("Amy Cousineau") || project.title.includes("Jennifer Mello") || project.title.includes("Slip 14") ? (
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
                    // Convert title to URL-friendly string
                    const urlTitle = relatedProject.title
                      .toLowerCase()
                      .replace(/[^\w\s]/g, '')
                      .replace(/\s+/g, '-');
                      
                    return (
                      <div 
                        key={index} 
                        className="group cursor-pointer"
                        onClick={() => {
                          console.log(`Navigating to related project: ${urlTitle}`);
                          // Force reload the page with the new project
                          window.scrollTo(0, 0);
                          setLocation(`/project/${urlTitle}`);
                        }}
                      >
                        <div className="mb-3 overflow-hidden rounded-lg">
                          <img 
                            src={relatedProject.image} 
                            alt={relatedProject.title} 
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              console.error(`Failed to load related project image: ${relatedProject.image}`);
                              e.currentTarget.src = relatedProject.image + `?v=${Date.now()}`;
                            }}
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