import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import * as ReactHelmetAsync from "react-helmet-async";
import { lazy, Suspense, useState, type ReactNode } from "react";
import { SiteSettingsProvider } from "./contexts/SiteSettingsContext";
import type { SiteSettings } from "./lib/siteSettingsData";
import CmsPage from "./pages/CmsPage";
import ScrollToTop from "./components/ScrollToTop";
import GlobalScripts from "./components/GlobalScripts";

const { HelmetProvider } = (ReactHelmetAsync as { default?: typeof ReactHelmetAsync } & { HelmetProvider?: typeof ReactHelmetAsync }).default || ReactHelmetAsync;

const AdminRoutes = lazy(() => import("./pages/AdminRoutes"));

type RouterMode = "browser" | "memory";

interface AppProps {
  router?: RouterMode;
  initialEntries?: string[];
  initialSiteSettings?: SiteSettings | null;
  helmetContext?: Record<string, unknown>;
}

function AppRouter({
  mode,
  initialEntries,
  children,
}: {
  mode: RouterMode;
  initialEntries?: string[];
  children: ReactNode;
}) {
  if (mode === "memory") {
    return <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>;
  }

  return <BrowserRouter>{children}</BrowserRouter>;
}

export default function App({
  router = "browser",
  initialEntries,
  initialSiteSettings = null,
  helmetContext,
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <SiteSettingsProvider initialSettings={initialSiteSettings}>
          <GlobalScripts />
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRouter mode={router} initialEntries={initialEntries}>
              <ScrollToTop />
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/admin/*" element={<AdminRoutes />} />
                  <Route path="*" element={<CmsPage />} />
                </Routes>
              </Suspense>
            </AppRouter>
          </TooltipProvider>
        </SiteSettingsProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
