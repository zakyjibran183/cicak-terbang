import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/* ================= LOADING SCREEN ================= */
const LoadingScreen = ({ isFading }: { isFading: boolean }) => {
  return (
    <div
      className={`
        fixed inset-0 z-[99999]
        flex flex-col items-center justify-center
        bg-background
        transition-all duration-700
        ${isFading ? "opacity-0 scale-110" : "opacity-100 scale-100"}
      `}
    >
      {/* glow background biar premium */}
      <div className="absolute w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/20 blur-[120px] rounded-full" />

      {/* animation */}
      <div className="w-64 h-64 z-10">
        <DotLottieReact
          src="https://lottie.host/0e9b9000-453b-4d76-9525-2a6fc7be0c93/3pjsctUxIa.lottie"
          loop
          autoplay
        />
      </div>

      <p className="text-muted-foreground mt-4 animate-pulse">
        Loading Portfolio...
      </p>
    </div>
  );
};

/* ================= APP ================= */
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => {
      setIsFading(true);

      // tunggu animasi fade selesai
      const end = setTimeout(() => {
        setIsLoading(false);
      }, 700); // HARUS sesuai transition 700ms

      return () => clearTimeout(end);
    }, 2500); // loading duration

    return () => clearTimeout(start);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>

        {/* 🔥 INI KUNCI UTAMA: JANGAN RENDER APP SAAT LOADING */}
        {!isLoading && (
          <>
            <Toaster />
            <Sonner />

            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </>
        )}

        {/* LOADING SELALU DI ATAS */}
        {isLoading && <LoadingScreen isFading={isFading} />}

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;