import { experiences } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";
import TimelineItem from "@/components/ui/timeline-item";
import { ArrowRight } from "lucide-react";
import { useDeviceType, DeviceType } from "@/hooks/use-mobile";
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
  const deviceType = useDeviceType();
  
  // Helper function to render timeline items based on device type
  const renderTimelineItems = (deviceType: DeviceType) => {
    switch (deviceType) {
      case 'mobile':
      case 'tablet':
        // Static timeline items for mobile and tablet to prevent flashing
        return experiences.map((experience, index) => (
          <StaticTimelineItem
            key={index}
            title={experience.title}
            company={experience.company}
            period={experience.period}
            description={experience.description}
            isLast={index === experiences.length - 1}
          />
        ));
      case 'desktop':
      default:
        // Animated timeline items for desktop
        return experiences.map((experience, index) => (
          <TimelineItem
            key={index}
            title={experience.title}
            company={experience.company}
            period={experience.period}
            description={experience.description}
            isLast={index === experiences.length - 1}
            index={index}
          />
        ));
    }
  };
  
  return (
    <section id="about" className="py-24 bg-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          description="The career arc — from software developer to engineering manager to the person helping Fullscript modernize how it operates."
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
                <strong className="text-gray-800 dark:text-gray-200">Software Developer.</strong> I started my career as a software developer, shipping production code, learning systems end-to-end, and figuring out how the pieces actually fit together. On the side I picked up freelance WordPress work for restaurants and therapists, which kept me close to real users and the messy realities of running a small business. Shipping end-to-end for real people is still how I think about software.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                <strong className="text-gray-800 dark:text-gray-200">Technical Lead.</strong> At Emerson Ecologics and then Fullscript, the work shifted from writing all the code to helping a group of engineers ship reliably and own their systems. I cared most about the operating model — how we plan, how we review, how we hand things off — because that was always the thing that broke first.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                <strong className="text-gray-800 dark:text-gray-200">Engineering Manager.</strong> Today I run three globally distributed teams at Fullscript. Less code, more leverage: hiring, coaching, performance, prioritization, and the unglamorous work of making sure the right things actually get done.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                <strong className="text-gray-800 dark:text-gray-200">Business Systems Leader.</strong> My remit has expanded from product engineering into the systems behind Fullscript — ERP, WMS, fulfillment, finance, and catalog. The job is making sure the systems that run Fullscript keep up with where Fullscript is going.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                <strong className="text-gray-800 dark:text-gray-200">AI Transformation / Team GSD Leader.</strong> Most of my recent energy has gone into AI-enabled workflows — automating away the work people shouldn't have to do, so teams can spend their time on the things that actually move Fullscript forward. I'm building the muscle for AI-first operations across five departments.
              </p>

              <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Outside of Work</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Husband to Lauren, dad-to-dogs to Penny and Belle, lifelong Arsenal fan, and an instinctive systems thinker who can't help looking for the leverage point in any process — including the ones I run at home.
              </p>
            </div>
          </div>
          
          {/* Professional Experience section */}
          <div className="lg:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold mb-6">Professional Experience</h3>
              
              {/* Render timeline items based on device type */}
              {renderTimelineItems(deviceType)}
              
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
