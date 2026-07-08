/*
 * App.tsx — Rapbae Brand Builder
 * Design: Structural Minimalism / 전략 제안서형
 * Routes: Home, Works, CaseStudy, About, Contact, Thinking, Article + Admin CMS
 */

import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Works from "./pages/Works";
import CaseStudy from "./pages/CaseStudy";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Thinking from "./pages/Thinking";
import Article from "./pages/Article";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminWorks from "./pages/admin/AdminWorks";
import AdminProjectEditor from "./pages/admin/AdminProjectEditor";
import AdminThinking from "./pages/admin/AdminThinking";
import AdminArticleEditor from "./pages/admin/AdminArticleEditor";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminContact from "./pages/admin/AdminContact";
import AdminSEO from "./pages/admin/AdminSEO";
import AdminSettings from "./pages/admin/AdminSettings";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      <Route path="/works" component={Works} />
      <Route path="/works/:slug" component={CaseStudy} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/thinking" component={Thinking} />
      <Route path="/thinking/:slug" component={Article} />

      {/* Admin routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/works" component={AdminWorks} />
      <Route path="/admin/works/new" component={AdminProjectEditor} />
      <Route path="/admin/works/:id" component={AdminProjectEditor} />
      <Route path="/admin/thinking" component={AdminThinking} />
      <Route path="/admin/thinking/new" component={AdminArticleEditor} />
      <Route path="/admin/thinking/:id" component={AdminArticleEditor} />
      <Route path="/admin/media" component={AdminMedia} />
      <Route path="/admin/about" component={AdminAbout} />
      <Route path="/admin/contact" component={AdminContact} />
      <Route path="/admin/seo" component={AdminSEO} />
      <Route path="/admin/settings" component={AdminSettings} />

      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;