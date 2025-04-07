import React from "react";
import { Link } from "wouter";
import { 
  ArrowLeft, 
  Home, 
  User, 
  PieChart, 
  Briefcase, 
  Quote, 
  FileText, 
  Send 
} from "lucide-react";
import { blogPosts } from "@/lib/data";
import { DEFAULT_METADATA } from "@/lib/metadata/seo";

export default function Sitemap() {
  const mainSections = [
    { id: "home", label: "Home", icon: <Home className="w-5 h-5 mr-2" /> },
    { id: "about", label: "About", icon: <User className="w-5 h-5 mr-2" /> },
    { id: "skills", label: "Skills", icon: <PieChart className="w-5 h-5 mr-2" /> },
    { id: "projects", label: "Projects", icon: <Briefcase className="w-5 h-5 mr-2" /> },
    { id: "testimonials", label: "Testimonials", icon: <Quote className="w-5 h-5 mr-2" /> },
    { id: "blog", label: "Blog", icon: <FileText className="w-5 h-5 mr-2" /> },
    { id: "contact", label: "Contact", icon: <Send className="w-5 h-5 mr-2" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Site Map</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Main Sections</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mainSections.map((section) => (
              <li key={section.id}>
                <a 
                  href={`/#${section.id}`} 
                  className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  {section.icon}
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Blog Posts</h2>
          <ul className="space-y-2">
            {blogPosts.map((post) => (
              <li key={post.id}>
                <Link 
                  href={`/blog/${post.id}`}
                  className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">About This Site</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {DEFAULT_METADATA.description}
          </p>
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Chris Folmar. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}