import { experiences } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";
import TimelineItem from "@/components/ui/timeline-item";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { memo } from "react";

// Simple static timeline item for mobile devices
const StaticTimelineItem = memo(({
  title,
  company,
  period,
  description,
  isLast = false
}: {
  title: string;
  company: string;
  period: string;
  description: string;
  isLast?: boolean;
}) => {
  return (
    <div className={`border-l-4 border-primary pl-6 relative ${isLast ? '' : 'mb-8'}`}>
      <div className="absolute -left-2.5 top-1 w-5 h-5 rounded-full bg-primary"></div>
      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-primary mb-1">{company}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{period}</p>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
});

export default function About() {
  const isMobile = useIsMobile();
  
  return (
    <section id="about" className="py-24 bg-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          description="Here's a brief introduction about me and my professional journey."
        />
        
        {/* Image centered at the top */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="overflow-hidden rounded-xl shadow-md">
            <img 
              src="/assets/images/optimized/about.jpg" 
              alt="Chris Folmar with his wife" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
              width="800"
              height="600"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
        
        {/* Content sections */}
        <div className="lg:flex lg:items-start lg:justify-between section-transition gap-8">
          {/* Who I Am section */}
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold mb-6">Who I Am</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Hi, I'm Chris Folmar. I'm a Software Engineering Manager with a passion for technology, leadership, and building teams that thrive. Over the years, I've had the privilege of working with amazing teams to drive technical innovations and deliver high-quality, scalable software solutions. My current role at Fullscript allows me to lead high-performing teams, work on challenging projects, and empower others to grow in their careers.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                I believe in continuous improvement, whether it's refining systems, optimizing processes, or expanding my own skill set. I'm a firm believer in leading by example, creating environments where people feel supported, challenged, and empowered to make an impact. Whether leading the design of a new system or coaching a team through a technical challenge, I'm always focused on building solutions that matter.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Beyond my professional life, I'm an avid Arsenal fan, and I love spending time outdoors. Whether I'm hiking with my two amazing dogs, Penny and Belle, or enjoying a quiet weekend with my wife, Lauren, I find balance in nature and in the company of those I care about. Family and friends are everything to me, and I'm committed to nurturing the connections that make life richer.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                As I continue to grow in my career, I aim to stay grounded, adaptable, and driven by a genuine passion for building high-performing teams and solving real-world problems through technology. If you'd like to connect or learn more about how I can help solve your organization's challenges, let's talk!
              </p>
              
              <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Professional Summary</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Strategic Engineering Leader with over 10 years of experience building high-impact engineering teams and driving operational efficiencies across enterprise-scale systems. Known for leading automation-driven transformations, re-architecting core platforms, and scaling engineering throughput 300%+ without additional headcount. Currently managing 3 cross-functional teams at Fullscript, delivering critical systems across ERP, WMS, and internal tooling for a $1B+ eCommerce platform. Adept at AI-driven problem-solving, fostering talent development, and aligning technical initiatives with business growth.
              </p>
            </div>
          </div>
          
          {/* Professional Experience section */}
          <div className="lg:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold mb-6">Professional Experience</h3>
              
              {/* Render different Timeline components based on device */}
              {isMobile ? (
                /* Static Timeline Items for Mobile */
                experiences.map((experience, index) => (
                  <StaticTimelineItem
                    key={index}
                    title={experience.title}
                    company={experience.company}
                    period={experience.period}
                    description={experience.description}
                    isLast={index === experiences.length - 1}
                  />
                ))
              ) : (
                /* Animated Timeline Items for Desktop */
                experiences.map((experience, index) => (
                  <TimelineItem
                    key={index}
                    title={experience.title}
                    company={experience.company}
                    period={experience.period}
                    description={experience.description}
                    isLast={index === experiences.length - 1}
                    index={index}
                  />
                ))
              )}
              
              <div className="flex justify-center mt-8">
                <a href="https://www.linkedin.com/in/clfolmar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:text-primary-dark transition-colors font-medium">
                  <span>View LinkedIn</span>
                  <ArrowRight className="h-5 w-5 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
