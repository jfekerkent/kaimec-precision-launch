import { Link } from "react-router-dom";
import { Phone, CheckCircle, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import flcP1530Img from "@/assets/flc-p-1530-1.png";

const FlcP1530 = () => {
  return (
    <Layout>
      <div className="pt-24 min-h-screen bg-white">
        <div className="container py-8">
          <nav className="flex mb-8 text-sm text-muted-foreground bg-gray-900 p-4 rounded-lg">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/machines" className="hover:text-white">Laser</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">FLC-P 1530</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-4">FLC-P 1530</h1>
              <p className="text-xl text-gray-600 mb-6">Closed Type Pipe & Profile Fiber Laser Cutting Machine</p>
              <img src={flcP1530Img} alt="FLC-P 1530" className="w-full rounded-xl border border-gray-200 shadow-sm" />
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">Machine Overview</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                The FLC-P 1530 is a high-performance closed-type fiber laser system designed for both sheet metal and pipe/profile cutting. 
                It offers exceptional precision, safety, and versatility for modern fabrication shops.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span>Integrated sheet and pipe cutting capabilities</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span>Fully enclosed design for maximum operator safety</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span>High-speed performance with advanced fiber laser technology</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Link to="/quote" className="w-full">
                  <button className="w-full bg-primary text-white py-3 px-6 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center justify-center">
                    Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
                <a href="tel:7142588526" className="w-full border border-gray-300 py-3 px-6 rounded-lg font-bold text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <Phone className="mr-2 h-4 w-4" /> (714) 258-8526
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FlcP1530;
