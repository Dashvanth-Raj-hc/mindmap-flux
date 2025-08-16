import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Generator from "./pages/Generator";
import MindMapViewer from "./pages/MindMapViewer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="mindmap-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ParticleBackground />
        <div className="relative min-h-screen bg-gradient-bg">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/generator" element={<Generator />} />
              <Route path="/mindmap" element={<MindMapViewer />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
