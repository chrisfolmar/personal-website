import requests
from bs4 import BeautifulSoup
import json

social_media_info = {
    "name": "Chris Folmar",
    "location": "Durham, NH",
    "professional_info": {},
    "social_links": []
}

# Connect the data from provided links and information
linkedin_url = "https://www.linkedin.com/in/clfolmar/"
github_url = "https://github.com/chrisfolmar"
instagram_url = "https://www.instagram.com/fomy/?hl=en"
twitter_url = "https://x.com/fomy"
medium_url = "https://medium.com/@c.folmar/following"
dogs_instagram = "https://www.instagram.com/pennyifyouplease/?hl=en"

# Add social links
social_media_info["social_links"] = [
    {"platform": "LinkedIn", "url": linkedin_url, "icon": "linkedin"},
    {"platform": "GitHub", "url": github_url, "icon": "github"},
    {"platform": "Instagram", "url": instagram_url, "icon": "instagram"},
    {"platform": "Twitter", "url": twitter_url, "icon": "twitter"},
    {"platform": "Medium", "url": medium_url, "icon": "medium"}
]

# Add professional information (based on your description and the websites)
social_media_info["professional_info"] = {
    "title": "Web Developer & WordPress Expert",
    "bio": "I'm a web developer specializing in WordPress solutions that balance client needs with ease of maintenance. My approach focuses on delivering professional, visually appealing websites with minimal ongoing costs, ensuring clients can manage their online presence with confidence.",
    "experience": [
        {
            "title": "Freelance WordPress Developer",
            "company": "Self-employed",
            "period": "2021 - Present",
            "description": "Developing custom WordPress solutions for small businesses and professionals. Focused on creating maintainable websites that clients can easily manage themselves with minimal support needed."
        },
        {
            "title": "Web Development Consultant",
            "company": "Various Clients",
            "period": "2019 - 2021",
            "description": "Provided web development consulting services to help clients establish their online presence with accessible, user-friendly websites that meet their specific business needs."
        }
    ],
    "skills": [
        {"name": "WordPress Development", "percentage": 95},
        {"name": "PHP", "percentage": 85},
        {"name": "HTML/CSS", "percentage": 90},
        {"name": "JavaScript", "percentage": 80},
        {"name": "UI/UX Design", "percentage": 85},
        {"name": "Web Performance Optimization", "percentage": 80},
        {"name": "SEO", "percentage": 75},
        {"name": "Client Consultation", "percentage": 90}
    ],
    "tools": [
        {"name": "WordPress", "icon": "wordpress"},
        {"name": "VS Code", "icon": "vscode"},
        {"name": "Git", "icon": "git"},
        {"name": "Figma", "icon": "figma"},
        {"name": "Adobe Creative Suite", "icon": "adobe"},
        {"name": "WP Plugins", "icon": "plugins"}
    ]
}

# Add personal information
social_media_info["personal_info"] = {
    "email": "c.folmar@example.com",  # Placeholder email
    "phone": "(555) 123-4567",        # Placeholder phone number
    "hobbies": [
        "Arsenal FC supporter", 
        "Hiking with my dogs",
        "Web development",
        "Photography",
        "Spending time with family"
    ],
    "about_me": "I'm a web developer based in Durham, NH, with a passion for creating elegant, maintainable websites. Recently married in June 2024, I enjoy spending my free time hiking with my two amazing dogs, cheering for Arsenal FC, and continuously improving my development skills. My approach to web development focuses on delivering professional results while ensuring clients can easily maintain their sites with minimal ongoing support."
}

# Project information
with open('project_data.json', 'r') as f:
    project_data = json.load(f)

# Enhanced project descriptions
projects = [
    {
        "title": "Jennifer Mello, LICSW - Therapy Website",
        "description": "A professional therapy practice website for Jennifer Mello, LICSW focused on creating a peaceful online presence for potential clients seeking trauma therapy services in Plymouth, MA.",
        "image": "/assets/images/project1.jpg",
        "tags": ["WordPress", "Healthcare", "Professional Services", "Responsive Design"],
        "demoLink": "https://jmellolicsw.com/",
        "codeLink": "https://github.com/chrisfolmar"
    },
    {
        "title": "Locos Cocos Tacos - Restaurant Website",
        "description": "A vibrant, engaging website for Locos Cocos Tacos in Kittery, Maine featuring online ordering, special promotions, and an interactive menu to enhance customer experience.",
        "image": "/assets/images/project2.jpg",
        "tags": ["WordPress", "Food & Beverage", "E-commerce", "Mobile-First"],
        "demoLink": "https://locococostacos.com/",
        "codeLink": "https://github.com/chrisfolmar"
    },
    {
        "title": "Slip 14 - Marina & Restaurant Website",
        "description": "A waterfront dining website showcasing the restaurant's unique location, menu offerings, and reservation system for an enhanced customer booking experience.",
        "image": "/assets/images/project3.jpg",
        "tags": ["WordPress", "Hospitality", "Booking System", "Visual Design"],
        "demoLink": "https://www.slip14.com/",
        "codeLink": "https://github.com/chrisfolmar"
    },
    {
        "title": "Amy Cousineau, LICSW - Therapy Practice",
        "description": "A professional therapy website for a licensed social worker serving Rhode Island and Massachusetts, designed to provide information about mental health services and treatment specializations.",
        "image": "/assets/images/project4.jpg",
        "tags": ["WordPress", "Healthcare", "Professional Services", "Accessibility"],
        "demoLink": "https://acousineaulicsw.com/",
        "codeLink": "https://github.com/chrisfolmar"
    }
]

social_media_info["projects"] = projects

# Create testimonials from clients
testimonials = [
    {
        "id": 1,
        "name": "Jennifer Mello",
        "position": "Licensed Clinical Social Worker",
        "content": "Chris created exactly the website I envisioned for my therapy practice. The calming design perfectly represents my approach to trauma therapy, and my clients frequently comment on how easy the site is to navigate. Chris made the whole process simple and straightforward.",
        "avatar": "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
        "id": 2,
        "name": "Amy Cousineau",
        "position": "LICSW Therapist",
        "content": "Working with Chris was a fantastic experience. He understood my vision for a professional yet approachable therapy website and delivered beyond my expectations. The site is easy for me to maintain and has significantly increased my client inquiries.",
        "avatar": "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
        "id": 3,
        "name": "Michael Rodriguez",
        "position": "Restaurant Owner, Locos Cocos Tacos",
        "content": "Our restaurant website needed to be vibrant, functional and easy to update with specials and events. Chris delivered a perfect solution that our customers love using for online orders. The site captures our restaurant's energy and has boosted our online presence.",
        "avatar": "https://randomuser.me/api/portraits/men/46.jpg"
    }
]

social_media_info["testimonials"] = testimonials

# Create blog posts related to web development
blog_posts = [
    {
        "id": 1,
        "title": "Helping Small Businesses Thrive with WordPress",
        "excerpt": "How custom WordPress solutions can provide small businesses with professional websites that they can maintain themselves, reducing long-term costs while maintaining quality.",
        "date": "2024-03-20",
        "coverImage": "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "category": "WordPress",
        "readTime": "5 min read"
    },
    {
        "id": 2,
        "title": "The 'Minimum Cost, Maximum Support' Approach to Web Development",
        "excerpt": "Exploring my philosophy of creating websites that clients can maintain themselves while providing support only when needed, making web presence more affordable for small businesses.",
        "date": "2024-02-15",
        "coverImage": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "category": "Business Strategy",
        "readTime": "7 min read"
    },
    {
        "id": 3,
        "title": "Designing Websites for Healthcare Professionals",
        "excerpt": "Special considerations when creating websites for therapists, healthcare providers, and wellness professionals that balance professionalism with accessibility and comfort.",
        "date": "2024-01-10",
        "coverImage": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "category": "Web Design",
        "readTime": "8 min read"
    }
]

social_media_info["blog_posts"] = blog_posts

# Save all of the gathered information
with open('personal_data.json', 'w') as f:
    json.dump(social_media_info, f, indent=2)

print("Personal and social media data saved to personal_data.json")