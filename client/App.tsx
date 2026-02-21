import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SiteSettingsProvider } from "./contexts/SiteSettingsContext";
import CmsPage from "./pages/CmsPage";
import NotFound from "./pages/NotFound";
import AdminRoutes from "./pages/AdminRoutes";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <SiteSettingsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* ── CMS-driven pages ───────────────────────────────────── */}
              <Route path="/" element={<CmsPage />} />
              <Route path="/o-nama" element={<CmsPage />} />
              <Route path="/o-nama/" element={<CmsPage />} />
              <Route path="/neo-mag-pirot" element={<CmsPage />} />
              <Route path="/neo-mag-pirot/" element={<CmsPage />} />
              <Route path="/dijagnostika" element={<CmsPage />} />
              <Route path="/dijagnostika/" element={<CmsPage />} />
              <Route path="/dijagnostika/magnetna-rezonanca" element={<CmsPage />} />
              <Route path="/dijagnostika/magnetna-rezonanca/" element={<CmsPage />} />
              <Route path="/dijagnostika/rendgen" element={<CmsPage />} />
              <Route path="/dijagnostika/rendgen/" element={<CmsPage />} />
              <Route path="/dijagnostika/ultrazvuk" element={<CmsPage />} />
              <Route path="/dijagnostika/ultrazvuk/" element={<CmsPage />} />
              <Route path="/dijagnostika/multilajsni-skener" element={<CmsPage />} />
              <Route path="/dijagnostika/multilajsni-skener/" element={<CmsPage />} />
              <Route path="/dijagnostika/ostali-pregledi" element={<CmsPage />} />
              <Route path="/dijagnostika/ostali-pregledi/" element={<CmsPage />} />
              <Route path="/cenovnik" element={<CmsPage />} />
              <Route path="/cenovnik/" element={<CmsPage />} />
              <Route path="/kontakt" element={<CmsPage />} />
              <Route path="/kontakt/" element={<CmsPage />} />

              {/* ── Admin (CMS back-office) ────────────────────────────── */}
              <Route path="/admin/*" element={<AdminRoutes />} />

              {/* ── Catch-all 404 ─────────────────────────────────────── */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SiteSettingsProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
