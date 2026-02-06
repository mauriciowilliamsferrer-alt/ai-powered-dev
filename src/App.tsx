import React, { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { FloatingIndexButton } from "@/components/FloatingIndexButton";

// Lazy load pages for better performance
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const Index = React.lazy(() => import("./pages/Index"));
const DevToolsGuide = React.lazy(() => import("./pages/DevToolsGuide"));
const ToolIndexHub = React.lazy(() => import("./pages/ToolIndexHub"));
const ToolCategoryPage = React.lazy(() => import("./pages/ToolCategoryPage"));
const ProjectSuggestionsPage = React.lazy(() => import("./pages/ProjectSuggestionsPage"));
const MarketingGuidePage = React.lazy(() => import("./pages/MarketingGuidePage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="space-y-4 w-full max-w-md">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);

// Component to conditionally show the floating button (not on /indice pages)
const FloatingButton = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/indice')) return null;
  return <FloatingIndexButton />;
};

const AppRoutes = () => (
  <>
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/indice" element={<ToolIndexHub />} />
        <Route path="/indice/:groupId" element={<ToolCategoryPage />} />
        <Route path="/projetos" element={<ProjectSuggestionsPage />} />
        <Route path="/divulgacao" element={<MarketingGuidePage />} />
        <Route path="/dashboard" element={<Index />} />
        <Route path="/devtools-guide" element={<DevToolsGuide />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    <FloatingButton />
  </>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
