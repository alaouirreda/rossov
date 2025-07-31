import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Membership from "@/pages/Membership";
import Store from "@/pages/Store";
import Gallery from "@/pages/Gallery";
import News from "@/pages/News";
import NewsPost from "@/pages/NewsPost";
import Auth from "@/pages/Auth";
import MemberDashboard from "@/pages/MemberDashboard";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="membership" element={<Membership />} />
                <Route path="store" element={<Store />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="news" element={<News />} />
                <Route path="news/:id" element={<NewsPost />} />
                <Route path="auth" element={<Auth />} />
                <Route path="member" element={<MemberDashboard />} />
                <Route path="admin/*" element={<AdminDashboard />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;