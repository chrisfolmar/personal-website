import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { contact, socials } from "@/lib/data";
import SectionHeader from "@/components/SectionHeader";
import FadeIn from "@/components/FadeIn";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, CheckCircle2, AlertOctagon, ShieldAlert } from "lucide-react";
import { SiGithub, SiLinkedin, SiX, SiInstagram, SiMedium } from "react-icons/si";
import { ExtendedContactFormData } from "@/types";
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
      const urlCount = (val.match(/https?:\/\//g) || []).length;
      return urlCount <= 2;
    }, {
      message: "Too many links in your message"
    }),
  website: z.string().max(0, { message: "Bot detected" }).optional(),
  formTime: z.number().optional(),
});

export default function Contact() {
  const { toast } = useToast();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formStartTimeRef = useRef<number>(Date.now());
  const [botDetected, setBotDetected] = useState(false);

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
      website: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ExtendedContactFormData) =>
      apiRequest("POST", "/api/contact", {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
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
      formStartTimeRef.current = Date.now();
      setTimeout(() => setFormStatus('idle'), 3000);
    },
    onError: (error: any) => {
      setFormStatus('error');
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

      setTimeout(() => setFormStatus('idle'), 3000);
    },
  });

  const onSubmit = (data: ExtendedContactFormData) => {
    const timeToFill = Date.now() - formStartTimeRef.current;

    if (timeToFill < 3000) {
      setBotDetected(true);
      toast({
        title: "Submission blocked",
        description: "Your submission was flagged by our security system. Please try again more slowly.",
        variant: "destructive",
      });
      setTimeout(() => setBotDetected(false), 5000);
      return;
    }

    if (data.website && data.website.length > 0) {
      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle');
        form.reset();
      }, 3000);
      return;
    }

    mutation.mutate({ ...data, formTime: timeToFill });
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get in touch"
          title="Have a project in mind, or want to compare notes?"
          description="The best way to reach me is the form below — or any of the channels listed here."
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <FadeIn className="lg:col-span-7">
            <div className="bg-card border border-border rounded-md p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} aria-required="true" />
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
                          <Input type="email" {...field} placeholder="your.email@example.com" />
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
                          <Input {...field} placeholder="What is this regarding?" />
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
                            placeholder="Tell me about your project or inquiry..."
                          />
                        </FormControl>
                        <FormMessage aria-live="polite" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <div className="opacity-0 absolute top-0 left-0 h-0 w-0 -z-10 overflow-hidden">
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input {...field} autoComplete="off" tabIndex={-1} aria-hidden="true" />
                          </FormControl>
                        </FormItem>
                      </div>
                    )}
                  />

                  {formStatus === 'success' && (
                    <Alert className="bg-primary/5 border-primary/30">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <AlertDescription className="text-foreground">
                        Your message has been sent successfully — I'll get back to you soon.
                      </AlertDescription>
                    </Alert>
                  )}

                  {formStatus === 'error' && (
                    <Alert variant="destructive">
                      <AlertOctagon className="h-4 w-4" />
                      <AlertDescription>
                        There was an error sending your message. Please try again later.
                      </AlertDescription>
                    </Alert>
                  )}

                  {botDetected && (
                    <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
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
                  >
                    {mutation.isPending
                      ? "Sending…"
                      : formStatus === 'success'
                        ? "Message sent"
                        : "Send message"}
                  </Button>
                </form>
              </Form>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-5">
            <div className="text-eyebrow mb-4">Contact</div>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-display font-semibold text-foreground">Email</div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-display font-semibold text-foreground">Location</div>
                  <div className="text-sm text-muted-foreground">{contact.location}</div>
                </div>
              </li>
            </ul>

            <div className="mt-10">
              <div className="text-eyebrow mb-4">Elsewhere</div>
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => {
                  let SocialIcon = SiGithub;
                  switch (social.icon) {
                    case "github": SocialIcon = SiGithub; break;
                    case "linkedin": SocialIcon = SiLinkedin; break;
                    case "twitter": SocialIcon = SiX; break;
                    case "instagram": SocialIcon = SiInstagram; break;
                    case "fileText": SocialIcon = SiMedium; break;
                  }
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      <SocialIcon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
