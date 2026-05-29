import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Quote from "./pages/Quote";
import Machines from "./pages/Machines";
import FiberLasers from "./pages/FiberLasers";
import TubeProfileLasers from "./pages/TubeProfileLasers";
import PressBrakes from "./pages/PressBrakes";
import GunDrills from "./pages/GunDrills";
import GunDrillingMachines from "./pages/GunDrillingMachines";
import BtaDeepHoleDrilling from "./pages/BtaDeepHoleDrilling";
import FlcP1530 from "./pages/FlcP1530";
import OpenTypeFiberLaser from "./pages/OpenTypeFiberLaser";
import CoveredPipeProfileFiberLaser from "./pages/CoveredPipeProfileFiberLaser";
import ClosedTypeFiberLaser from "./pages/ClosedTypeFiberLaser";
import NotFound from "./pages/NotFound";
import KaimecChatAgent from "./components/chat/KaimecChatAgent";
import Consultation from "./pages/Consultation";
import Faq from "./pages/Faq";
import Eblast1 from "./pages/Eblast1";
import Quotations from "./pages/Quotations";
import QuoteMachine from "./pages/QuoteMachine";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/request-info" element={<Quote />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/eblast-1" element={<Eblast1 />} />
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/quotations/:slug" element={<QuoteMachine />} />
          <Route path="/machines" element={<Machines />} />
          <Route path="/machines/cnc-fiber-lasers" element={<FiberLasers />} />
          <Route path="/machines/tube-profile-lasers" element={<TubeProfileLasers />} />
          <Route path="/machines/press-brakes" element={<PressBrakes />} />
          <Route path="/machines/gun-drills" element={<GunDrills />} />
          <Route path="/fiber-lasers" element={<FiberLasers />} />
          <Route path="/tube-profile-lasers" element={<TubeProfileLasers />} />
          <Route path="/press-brakes" element={<PressBrakes />} />
          <Route path="/gun-drills" element={<GunDrills />} />
          <Route path="/gun-drills/gun-drilling-machines" element={<GunDrillingMachines />} />
          <Route path="/gun-drills/bta-deep-hole-drilling" element={<BtaDeepHoleDrilling />} />
          <Route path="/machines/cnc-fiber-lasers/flc-p-1530" element={<FlcP1530 />} />
          <Route path="/flc-p-1530" element={<FlcP1530 />} />
          <Route path="/machines/laser-cutting/open-type-fiber-laser" element={<OpenTypeFiberLaser />} />
          <Route path="/machines/laser-cutting/covered-pipe-profile-fiber-laser" element={<CoveredPipeProfileFiberLaser />} />
          <Route path="/machines/laser-cutting/closed-type-fiber-laser" element={<ClosedTypeFiberLaser />} />
          <Route path="/laser-cutting/closed-type-fiber-laser" element={<ClosedTypeFiberLaser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <KaimecChatAgent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
