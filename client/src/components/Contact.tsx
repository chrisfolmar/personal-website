import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { contact, socials } from "@/lib/data";
import SectionHeading from "@/components/ui/section-heading";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, CheckCircle2, AlertOctagon, ShieldAlert } from "lucide-react";
import { SiGithub, SiLinkedin, SiX, SiDribbble } from "react-icons/si";
import { ContactFormData, ExtendedContactFormData } from "@/types";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name can only contain letters, spaces, hyphens, and apostrophes" })
    .refine(val => !/admin|administrator|root|support|help|info|webmaster/i.test(val), {
      message: "This name contains restricted terms"
    }),
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .min(5, { message: "Email address is too short" })
    .max(100, { message: "Email address cannot exceed 100 characters" })
    .refine(val => !/(example|test|fake|temp)\.com$/i.test(val), {
      message: "Please use a valid email address"
    }),
  subject: z.string()
    .min(5, { message: "Subject must be at least 5 characters long" })
    .max(100, { message: "Subject cannot exceed 100 characters" })
    .refine(val => !/https?:\/\//i.test(val), {
      message: "URLs are not allowed in the subject"
    }),
  message: z.string()
    .min(20, { message: "Message must be at least 20 characters long" })
    .max(1000, { message: "Message cannot exceed 1000 characters" })
    .refine(val => {
      // Count URLs in the message - limit to max 2 links
      const urlCount = (val.match(/https?:\/\//g) || []).length;
      return urlCount <= 2;
    }, {
      message: "Too many links in your message"
    }),
  // Honeypot field - should remain empty
  website: z.string().max(0, { message: "Bot detected" }).optional(),
  // Time tracking for bot detection
  formTime: z.number().optional(),
});

export default function Contact() {
  const { toast } = useToast();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formStartTimeRef = useRef<number>(Date.now());
  const [botDetected, setBotDetected] = useState(false);
  
  // Set the form start time when component mounts
  useEffect(() => {
    formStartTimeRef.current = Date.now();
  }, []);
  
  const form = useForm<ExtendedContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "", // Honeypot field
    },
  });
  
  const mutation = useMutation({
    mutationFn: (data: ExtendedContactFormData) => 
      apiRequest("POST", "/api/contact", {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        // Don't send honeypot field to server
      }),
    onMutate: () => {
      setFormStatus('submitting');
    },
    onSuccess: () => {
      setFormStatus('success');
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I will get back to you soon.",
      });
      form.reset();
      formStartTimeRef.current = Date.now(); // Reset time tracking
      
      // Reset form status after a delay
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    },
    onError: (error: any) => {
      setFormStatus('error');
      
      // More specific error handling based on error type
      let errorTitle = "Error sending message";
      let errorDescription = "There was an error sending your message. Please try again.";
      
      if (error.status === 429) {
        errorTitle = "Too many requests";
        errorDescription = "Please wait a moment before trying again.";
      } else if (error.status === 400) {
        errorTitle = "Invalid form data";
        errorDescription = "Please check your input and try again.";
      } else if (error.status === 500) {
        errorTitle = "Server error";
        errorDescription = "Our server is experiencing issues. Please try again later.";
      } else if (error.message) {
        errorDescription = error.message;
      }
      
      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
      });
      
      // Reset form status after a delay
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    },
  });
  
  const onSubmit = (data: ExtendedContactFormData) => {
    // Time-based bot detection (filled out too quickly)
    const timeToFill = Date.now() - formStartTimeRef.current;
    
    // If form filled in less than 3 seconds, likely a bot
    if (timeToFill < 3000) {
      setBotDetected(true);
      toast({
        title: "Submission blocked",
        description: "Your submission was flagged by our security system. Please try again more slowly.",
        variant: "destructive",
      });
      
      setTimeout(() => {
        setBotDetected(false);
      }, 5000);
      
      return;
    }
    
    // Check if honeypot field is filled (should be empty)
    if (data.website && data.website.length > 0) {
      // Silently reject the submission without alerting the bot
      console.log("Honeypot triggered, submission silently rejected");
      
      // Fake success response to fool bots
      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle');
        form.reset();
      }, 3000);
      
      return;
    }
    
    // Add the form completion time to the data
    const formData = {
      ...data,
      formTime: timeToFill,
    };
    
    mutation.mutate(formData);
  };
  
  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          description="Have a project in mind or want to discuss potential opportunities? Feel free to reach out!"
        />
        
        <div className="lg:flex lg:space-x-12 section-transition">
          <motion.div 
            className="lg:w-1/2 mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            aria-required="true"
                            aria-invalid={form.formState.errors.name ? "true" : "false"}
                          />
                        </FormControl>
                        <FormMessage aria-live="polite" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            {...field} 
                            aria-required="true"
                            aria-invalid={form.formState.errors.email ? "true" : "false"}
                            placeholder="your.email@example.com"
                          />
                        </FormControl>
                        <FormMessage aria-live="polite" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            aria-required="true"
                            aria-invalid={form.formState.errors.subject ? "true" : "false"}
                            placeholder="What is this regarding?"
                          />
                        </FormControl>
                        <FormMessage aria-live="polite" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={5} 
                            {...field} 
                            aria-required="true" 
                            aria-invalid={form.formState.errors.message ? "true" : "false"}
                            placeholder="Tell me about your project or inquiry..."
                          />
                        </FormControl>
                        <FormMessage aria-live="polite" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Honeypot field - hidden from regular users but visible to bots */}
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <div className="opacity-0 absolute top-0 left-0 h-0 w-0 -z-10 overflow-hidden">
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              autoComplete="off"
                              tabIndex={-1}
                              aria-hidden="true"
                            />
                          </FormControl>
                        </FormItem>
                      </div>
                    )}
                  />
                  
                  {formStatus === 'success' && (
                    <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 mb-4">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertDescription className="text-green-800 dark:text-green-300">
                        Your message has been sent successfully! I'll get back to you soon.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {formStatus === 'error' && (
                    <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 mb-4">
                      <AlertOctagon className="h-4 w-4 text-red-600 dark:text-red-400" />
                      <AlertDescription className="text-red-800 dark:text-red-300">
                        There was an error sending your message. Please try again later.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {botDetected && (
                    <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 mb-4">
                      <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <AlertDescription className="text-amber-800 dark:text-amber-300">
                        Your submission was flagged by our security system. Please try again.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={mutation.isPending || formStatus === 'success'}
                    aria-label="Submit contact form"
                  >
                    {mutation.isPending ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : formStatus === 'success' ? "Message Sent" : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h4>
                  <a href={`mailto:${contact.email}`} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                    {contact.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Phone</h4>
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                    {contact.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">{contact.location}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                {socials.map((social, index) => {
                  // Render the appropriate icon based on the icon name
                  let SocialIcon;
                  switch(social.icon) {
                    case 'github':
                      SocialIcon = SiGithub;
                      break;
                    case 'linkedin':
                      SocialIcon = SiLinkedin;
                      break;
                    case 'twitter':
                      SocialIcon = SiX;
                      break;
                    case 'dribbble':
                      SocialIcon = SiDribbble;
                      break;
                    default:
                      SocialIcon = SiGithub;
                  }
                  
                  return (
                    <a 
                      key={index}
                      href={social.url} 
                      className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SocialIcon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
