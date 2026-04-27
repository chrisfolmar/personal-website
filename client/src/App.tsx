import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/hooks/use-theme";
import ErrorBoundary from "@/components/ErrorBoundary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import NotFound from "@/pages/not-found";
import BlogPost from "@/pages/blog-post";
import ProjectDetail from "@/pages/project-detail";
import Sitemap from "@/pages/sitemap";
import CaseStudies from "@/pages/case-studies";
import CaseStudyDetail from "@/pages/case-study-detail";
import NowPage from "@/pages/now";
import Resume from "@/pages/resume";
import WritingIndex from "@/pages/writing";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ErrorBoundary>
          <Header />
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/blog/:id" component={BlogPost} />
            <Route path="/project/:id" component={ProjectDetail} />
            <Route path="/case-studies" component={CaseStudies} />
            <Route path="/case-studies/:slug" component={CaseStudyDetail} />
            <Route path="/now" component={NowPage} />
            <Route path="/resume" component={Resume} />
            <Route path="/writing" component={WritingIndex} />
            <Route path="/sitemap" component={Sitemap} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
          <Toaster />
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
