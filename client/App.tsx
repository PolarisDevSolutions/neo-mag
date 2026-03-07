import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SiteSettingsProvider } from "./contexts/SiteSettingsContext";
import { lazy, Suspense } from "react";
import CmsPage from "./pages/CmsPage";
import ScrollToTop from "./components/ScrollToTop";
import GlobalScripts from "./components/GlobalScripts";

const AdminRoutes = lazy(() => import("./pages/AdminRoutes"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <SiteSettingsProvider>
        <GlobalScripts />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={null}>
              <Routes>
                {/* ── Admin (CMS back-office) ────────────────────────────── */}
                <Route path="/admin/*" element={<AdminRoutes />} />

                {/* ── All other paths go through CmsPage (handles 404 internally) ── */}
                <Route path="*" element={<CmsPage />} />
              </Routes>
          </Suspense>
        </BrowserRouter>
        </TooltipProvider>
      </SiteSettingsProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
