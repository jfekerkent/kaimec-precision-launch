import Layout from "@/components/Layout";

export default function Quotations() {
  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="container">
          <p className="section-label mb-3">Pricing</p>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-6">
            Quotations
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Contact our sales team for detailed quotations on all KAIMEC machines.
            We provide competitive pricing and flexible financing options tailored
            to your production needs.
          </p>
        </div>
      </section>
    </Layout>
  );
}
