import { MapPin, Phone, Mail } from "lucide-react";
import Layout from "@/components/Layout";
import RequestInfoForm from "@/components/RequestInfoForm";

export default function Quote() {
  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <p className="section-label mb-3">Get Started</p>
              <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">
                Request for Info
              </h1>
              <p className="text-muted-foreground mb-8">
                Our engineers will respond within 1 business day.
              </p>
              <RequestInfoForm />
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-lg border border-border bg-card p-8">
                <h3 className="text-lg font-bold text-foreground mb-6">Contact Information</h3>
                <ul className="space-y-5">
                  <li className="flex gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Address</div>
                      <span>1231 Edinger Ave, Tustin, CA</span>
                    </div>
                  </li>
                  <li className="flex gap-3 text-sm text-muted-foreground">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Phone</div>
                      <a href="tel:5623502071" className="hover:text-primary transition-colors">(562) 350-2071</a>
                    </div>
                  </li>
                  <li className="flex gap-3 text-sm text-muted-foreground">
                    <Mail className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Email</div>
                      <a href="mailto:sales@kaimec.com" className="hover:text-primary transition-colors">sales@kaimec.com</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
