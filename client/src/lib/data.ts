import { Experience, Project, Skill, Tool, Contact, Social } from "@/types";
// Instead of using JSX directly in data.ts, we'll use a function approach
// that will be rendered in the component

export const experiences: Experience[] = [
  {
    title: "Freelance WordPress Developer",
    company: "Self-employed",
    period: "2021 - Present",
    description:
      "Developing custom WordPress solutions for healthcare professionals, restaurants, and small businesses. Created websites for Jennifer Mello LICSW, Locos Cocos Tacos, Slip 14, and Amy Cousineau LICSW. Specialized in creating sites clients can manage themselves, with ongoing technical support as needed. Implemented booking systems, online ordering, and responsive designs tailored to each client's unique needs.",
  },
  {
    title: "Web Development Consultant",
    company: "Various Clients",
    period: "2019 - 2021",
    description:
      "Provided strategic web development consulting services to help clients establish their online presence. Conducted website audits and needs assessments to identify optimal solutions. Focused on accessibility, user experience, and SEO optimization. Created custom web strategies for small businesses looking to enhance their digital presence without requiring extensive technical knowledge to maintain.",
  },
  {
    title: "WordPress Theme Developer",
    company: "Contract Work",
    period: "2018 - 2019",
    description:
      "Developed custom WordPress themes for small to medium-sized businesses. Worked directly with clients to understand their brand identity and functional requirements. Created mobile-responsive designs with clean, maintainable code. Provided training sessions for clients on how to update and maintain their websites independently.",
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
    title: "Jennifer Mello, LICSW - Certified Trauma Therapy",
    description: "When I started my practice, at the root of everything I did, I held my clients in mind. Not only is this space a way for me to introduce myself to you, its also FOR you. I hope you find a sense of peace, belonging, and guidance if that is what you seek.",
    image: "@assets/image_1743954412277.png",
    tags: ["WordPress", "Healthcare", "Professional Services", "Trauma Therapy"],
    demoLink: "https://jmellolicsw.com/",
    codeLink: "https://github.com/chrisfolmar",
    date: "2023-08-15",
  },
  {
    title: "Locos Cocos Tacos - Restaurant Website",
    description: "Kittery, Maine's Loco Cocos Tacos features online ordering for customer pickup, gift cards, special events, and service industry discounts. The site highlights Happy Hour specials Monday through Friday from 3-6 PM with discounts on drafts and house margaritas.",
    image: "@assets/image_1743954612983.png",
    tags: ["WordPress", "Food & Beverage", "E-commerce", "Online Ordering"],
    demoLink: "https://locococostacos.com/",
    codeLink: "https://github.com/chrisfolmar",
    date: "2023-11-10",
  },
  {
    title: "Slip 14 - Marina & Waterfront Dining",
    description: "A waterfront dining website showcasing the restaurant's unique location at the marina, featuring fresh seafood menu offerings, special events, and a full-feature reservation system for an enhanced customer booking experience.",
    image: "@assets/image_1743954620290.png",
    tags: ["WordPress", "Hospitality", "Booking System", "Visual Design"],
    demoLink: "https://www.slip14.com/",
    codeLink: "https://github.com/chrisfolmar",
    date: "2024-01-20",
  },
  {
    title: "Amy Cousineau, LICSW - Multi-State Therapy",
    description: "A therapy resource for clients in Rhode Island and Massachusetts focusing on treatment of anxiety, depression, PTSD, and LGBTQIA+ support. The site covers specialized services for ADD/ADHD, depression, relationship challenges, and self-doubt concerns.",
    image: "@assets/image_1743954631115.png",
    tags: ["WordPress", "Healthcare", "Professional Services", "Mental Health"],
    demoLink: "https://acousineaulicsw.com/",
    codeLink: "https://github.com/chrisfolmar",
    date: "2024-04-05",
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
    avatar: "@assets/image_1743954368907.png"
  },
  {
    id: 2,
    name: "Amy Cousineau",
    position: "LICSW Therapist",
    content: "Working with Chris was a fantastic experience. He understood my vision for a professional yet approachable therapy website and delivered beyond my expectations. The site is easy for me to maintain and has significantly increased my client inquiries.",
    avatar: "@assets/image_1743954631115.png"
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    position: "Restaurant Owner, Locos Cocos Tacos",
    content: "Our restaurant website needed to be vibrant, functional and easy to update with specials and events. Chris delivered a perfect solution that our customers love using for online orders. The site captures our restaurant's energy and has boosted our online presence.",
    avatar: "@assets/image_1743954612983.png"
  },
];

export const blogPosts = [
  {
    id: 1,
    title: "Helping Small Businesses Thrive with WordPress",
    excerpt: "How custom WordPress solutions can provide small businesses with professional websites that they can maintain themselves, reducing long-term costs while maintaining quality.",
    date: "2023-07-15",
    coverImage: "@assets/KP_20240608_0224_3649.jpg",
    category: "WordPress",
    readTime: "5 min read",
    content: `
      <p>Small businesses often face a challenging dilemma when it comes to their web presence: they need a professional website but struggle with ongoing maintenance costs that can quickly add up. After working with dozens of small business owners from restaurants to therapists, I've developed an approach that solves this common problem.</p>
      
      <h3>The Small Business Website Challenge</h3>
      <p>Many small business owners I've worked with have shared similar concerns:</p>
      <ul>
        <li>Wanting a professional site that reflects their brand quality</li>
        <li>Needing to update content regularly without technical help</li>
        <li>Avoiding recurring costs that strain limited marketing budgets</li>
        <li>Keeping their website competitive with larger businesses</li>
      </ul>
      
      <h3>The WordPress Advantage</h3>
      <p>WordPress provides the perfect platform to address these challenges. By creating custom WordPress solutions with carefully selected plugins and thoughtful training, I help small businesses achieve several key benefits:</p>
      
      <h4>1. Client-Managed Content</h4>
      <p>I design intuitive admin interfaces that allow non-technical business owners to update their content independently. For example, Jennifer Mello's therapy practice website uses custom post types that make it simple for her to update her services and resources without any coding knowledge.</p>
      
      <h4>2. Growth-Ready Infrastructure</h4>
      <p>WordPress scales brilliantly, allowing businesses to start with essential features and add complexity as they grow. For Locos Cocos Tacos, we began with a basic menu system that later evolved to include online ordering capabilities without requiring a complete redesign.</p>
      
      <h4>3. Cost-Effective Long-Term Strategy</h4>
      <p>By focusing on training clients during handoff, I ensure they can handle routine updates themselves, only reaching out when they need specific technical assistance. This dramatically reduces their long-term costs compared to monthly maintenance plans.</p>
      
      <p>If you're a small business owner looking to establish or improve your online presence while maintaining control over your website and budget, WordPress might be the ideal solution. Feel free to reach out to discuss how this approach could work specifically for your business needs.</p>
    `
  },
  {
    id: 5,
    title: "Finding the Perfect Balance: Life as a Web Developer and New Husband",
    excerpt: "Reflections on the journey of balancing a growing freelance web development business with personal milestones and the lessons learned along the way.",
    date: "2024-05-10",
    coverImage: "@assets/KP_20240608_0225_3651.jpg",
    category: "Personal",
    readTime: "4 min read",
    content: `
      <p>This summer marks both significant professional growth for my freelance web development business and a major personal milestone—my recent wedding in June. Balancing these two important aspects of life has been both challenging and rewarding, offering valuable lessons that I believe many freelancers and small business owners might relate to.</p>
      
      <h3>The Journey to Balance</h3>
      <p>The path to finding equilibrium between personal and professional life is rarely straightforward, especially when you're passionate about both. Here are some reflections on what this journey has taught me:</p>
      
      <h4>1. Boundaries Create Freedom</h4>
      <p>One of the most counterintuitive lessons I've learned is that setting clear boundaries actually creates more freedom, not less. By establishing dedicated work hours and protected personal time, I've found that both areas of my life have flourished. Clients understand when I'm available, and my personal relationships benefit from my full presence when I'm not working.</p>
      
      <h4>2. Quality Over Quantity</h4>
      <p>As my business has grown, I've had to resist the temptation to take on every project that comes my way. Instead, I've focused on selecting clients and projects that align with my values and expertise. This approach has not only led to more fulfilling work but has also created space for meaningful personal experiences like planning our wedding and setting up our new home.</p>
      
      <h4>3. Personal Growth Fuels Professional Innovation</h4>
      <p>Perhaps most surprisingly, I've discovered that the richness of my personal life directly feeds into my professional creativity. The process of planning our wedding, with all its design decisions and logistical challenges, sparked new approaches to project management that I've since implemented in my web development business.</p>
      
      <h3>Looking Ahead</h3>
      <p>As I look to the future, I'm excited about continuing to grow both my business and my new life as a husband. I'm particularly focused on:</p>
      
      <ul>
        <li>Developing more efficient systems that allow me to serve clients well while protecting family time</li>
        <li>Exploring new web technologies that will help my clients' businesses thrive</li>
        <li>Building a business that complements rather than competes with a fulfilling personal life</li>
      </ul>
      
      <p>For other freelancers and entrepreneurs navigating similar waters, I'd love to hear your stories and strategies for balancing work and personal milestones. After all, the journey is better when we share it.</p>
    `
  },
  {
    id: 2,
    title: "The 'Minimum Cost, Maximum Support' Approach to Web Development",
    excerpt: "Exploring my philosophy of creating websites that clients can maintain themselves while providing support only when needed, making web presence more affordable for small businesses.",
    date: "2023-11-18",
    coverImage: "@assets/KP_20240608_0229_3672 (1).jpg",
    category: "Business Strategy",
    readTime: "7 min read",
    content: `
      <p>After years of working with small businesses and solo practitioners, I've developed what I call the "Minimum Cost, Maximum Support" model for web development. This approach has proven especially valuable for clients with limited budgets who still need professional websites.</p>
      
      <h3>Rethinking the Traditional Web Development Model</h3>
      <p>The standard web development business model often involves:</p>
      <ul>
        <li>High upfront development costs</li>
        <li>Mandatory monthly maintenance packages</li>
        <li>Charges for even minor content updates</li>
        <li>Technical dependency that keeps clients tethered to developers</li>
      </ul>
      
      <p>While this model works well for developers, it can create unnecessary financial strain for small businesses, especially those just starting out or operating with tight margins.</p>
      
      <h3>The Minimum Cost Principle</h3>
      <p>My approach focuses on creating cost efficiency in several ways:</p>
      
      <h4>1. Thoughtful Platform Selection</h4>
      <p>By carefully choosing WordPress as our foundation and selectively implementing only necessary plugins, we avoid bloated systems that require constant maintenance and updates.</p>
      
      <h4>2. Client Empowerment Through Training</h4>
      <p>I dedicate significant time to training clients on maintaining their own websites. For example, Amy Cousineau can now independently update her therapy services, professional credentials, and client resources through a custom dashboard I designed specifically for her workflow.</p>
      
      <h4>3. Documentation as a Resource</h4>
      <p>Each project includes customized documentation and video tutorials tailored to the client's specific website, creating a lasting resource they can reference whenever needed.</p>
      
      <h3>The Maximum Support Promise</h3>
      <p>While I focus on minimizing ongoing costs, I never compromise on support:</p>
      
      <h4>1. Responsive Technical Assistance</h4>
      <p>When clients do need help with something beyond their comfort zone, I'm readily available without the pressure of minimum monthly retainers.</p>
      
      <h4>2. Growth-Focused Consulting</h4>
      <p>As businesses evolve, I provide strategic guidance on how their website can adapt to new needs—whether that's adding online booking for Slip 14 restaurant or implementing secure client forms for healthcare providers.</p>
      
      <p>This balanced approach allows small businesses to maintain professional web presences without unnecessary ongoing expenses. If this philosophy aligns with your business needs, I'd be happy to discuss how it might work for your specific situation.</p>
    `
  },
  {
    id: 3,
    title: "Designing Websites for Healthcare Professionals",
    excerpt: "Special considerations when creating websites for therapists, healthcare providers, and wellness professionals that balance professionalism with accessibility and comfort.",
    date: "2024-02-03",
    coverImage: "@assets/LC_240330_0156_85N_5014-2.jpg",
    category: "Web Design",
    readTime: "8 min read",
    content: `
      <p>Having developed websites for multiple healthcare professionals, including Jennifer Mello LICSW and Amy Cousineau LICSW, I've gained valuable insights into the unique considerations required for this specialized field. Creating effective websites for therapists and healthcare providers requires balancing professional credibility with emotional accessibility.</p>
      
      <h3>Understanding the Healthcare Website Difference</h3>
      <p>Healthcare websites serve a fundamentally different purpose than retail or service businesses:</p>
      <ul>
        <li>Visitors are often in vulnerable situations seeking help</li>
        <li>The content deals with sensitive, personal matters</li>
        <li>Professional credentials and trust signals are paramount</li>
        <li>Privacy concerns require special technical considerations</li>
      </ul>
      
      <h3>Essential Design Elements for Healthcare Websites</h3>
      
      <h4>1. Creating Emotional Safety Through Design</h4>
      <p>For both therapy practice websites I've developed, we carefully selected color palettes, typography, and imagery that convey safety and calm. Jennifer Mello's website uses soft blues and gentle transitions that help anxious visitors feel more at ease as they explore potentially challenging topics like trauma therapy.</p>
      
      <h4>2. Balancing Professionalism with Approachability</h4>
      <p>Healthcare websites must demonstrate expertise without intimidating potential clients. This requires careful content structuring that presents credentials in an accessible way. For Amy Cousineau's site, we organized her impressive qualifications alongside warm personal statements that help visitors connect with her as a person, not just a professional.</p>
      
      <h4>3. Thoughtful Information Architecture</h4>
      <p>People seeking healthcare services are often dealing with cognitive load from stress or medical conditions. This means information must be exceptionally well-organized. We implement:</p>
      <ul>
        <li>Clear navigation paths based on visitor needs</li>
        <li>Chunked information that prevents overwhelm</li>
        <li>Prominently featured contact options for those ready to reach out</li>
        <li>Resources sections for additional support</li>
      </ul>
      
      <h4>4. Compliance and Privacy Considerations</h4>
      <p>Healthcare websites must address specific regulatory concerns. While most therapy websites don't fall under full HIPAA compliance requirements for the public-facing site, implementing strong privacy practices builds trust:</p>
      <ul>
        <li>Secure contact forms with appropriate disclaimers</li>
        <li>Clear privacy policies specific to healthcare settings</li>
        <li>Careful integration of any third-party tools</li>
      </ul>
      
      <h3>Results That Matter</h3>
      <p>The specialized approach I've developed for healthcare websites has yielded meaningful results for my clients. Both Jennifer and Amy report that their websites effectively communicate their practice philosophies and regularly generate qualified client inquiries.</p>
      
      <p>If you're a healthcare professional looking to establish or improve your web presence, I'd be happy to discuss how these principles might apply to your specific practice.</p>
    `
  },
  {
    id: 4,
    title: "Why WordPress Will Continue to Dominate Small Business Websites in 2025",
    excerpt: "Looking ahead to 2025, WordPress will maintain its dominance by continuing to offer unmatched flexibility, control, and growth potential for small businesses despite new competitors.",
    date: "2024-10-15",
    coverImage: "@assets/KP_20240608_0729_5107 (4).jpg",
    category: "WordPress",
    readTime: "6 min read",
    content: `
      <p>With the proliferation of drag-and-drop website builders promising instant websites, many small business owners wonder if WordPress will still be relevant in 2025. After developing dozens of small business websites, I can confidently say that WordPress will continue to be the superior choice for businesses seeking long-term value.</p>
      
      <h3>The WordPress Advantage in 2025</h3>
      
      <h4>1. Unmatched Flexibility</h4>
      <p>While platforms like Wix and Squarespace offer simplicity, they ultimately restrict what you can do with your website. WordPress provides unlimited customization potential, allowing businesses to create truly unique websites that stand out from template-based competitors. For Locos Cocos Tacos, we implemented a custom online ordering system that seamlessly integrates with their specific kitchen workflow—something impossible with most limited platforms.</p>
      
      <h4>2. Ownership and Portability</h4>
      <p>With WordPress, businesses own their website completely. Unlike proprietary platforms that can hold your website hostage through mandatory monthly fees, WordPress sites can be moved between hosting providers without redesign. This gives small businesses leverage and freedom in managing their digital assets.</p>
      
      <h4>3. SEO Advantages</h4>
      <p>WordPress continues to excel in search engine optimization capabilities. With plugins like Yoast SEO and built-in features designed for optimal indexing, WordPress sites consistently outperform other platforms in organic search results—a critical advantage for small businesses competing against larger companies with bigger advertising budgets.</p>
      
      <h4>4. Growing Block Editor Ecosystem</h4>
      <p>The WordPress block editor (Gutenberg) has matured significantly, offering increasingly user-friendly content management that rivals the simplicity of drag-and-drop builders while maintaining WordPress's powerful backend capabilities. This makes content updates exceptionally accessible for non-technical business owners.</p>
      
      <h4>5. Future-Proof Investment</h4>
      <p>WordPress's open-source nature means it evolves continuously without being tied to a single company's business decisions. This provides stability and predictability that proprietary platforms simply cannot match over the long term.</p>
      
      <h3>WordPress Myths vs. Reality in 2025</h3>
      
      <p><strong>Myth:</strong> WordPress is overly complex for small businesses.<br>
      <strong>Reality:</strong> With proper setup and training, WordPress can be remarkably user-friendly for day-to-day updates. I design streamlined admin dashboards tailored to each client's specific needs.</p>
      
      <p><strong>Myth:</strong> WordPress requires constant maintenance.<br>
      <strong>Reality:</strong> With strategically selected plugins and proper hosting, WordPress maintenance can be minimal and largely automated.</p>
      
      <p><strong>Myth:</strong> WordPress is only for blogs.<br>
      <strong>Reality:</strong> WordPress powers approximately 43% of all websites on the internet, from small business sites to massive e-commerce platforms and complex applications.</p>
      
      <p>If you're considering a new website for your small business, I'd be happy to discuss whether WordPress might be the right platform for your specific needs and goals.</p>
    `
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
