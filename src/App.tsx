import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import About from "./pages/About";
import Quote from "./pages/Quote";
import Machines from "./pages/Machines";
import FiberLasers from "./pages/FiberLasers";
import TubeProfileLasers from "./pages/TubeProfileLasers";
import PressBrakes from "./pages/PressBrakes";
import GunDrills from "./pages/GunDrills";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/machines" element={<Machines />} />
          <Route path="/machines/cnc-fiber-lasers" element={<FiberLasers />} />
          <Route path="/machines/tube-profile-lasers" element={<TubeProfileLasers />} />
          <Route path="/machines/press-brakes" element={<PressBrakes />} />
          <Route path="/machines/gun-drills" element={<GunDrills />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
