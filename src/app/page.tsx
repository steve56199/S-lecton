import { Header } from "@/components/marketing/Header";
import { Hero } from "@/components/marketing/Hero";
import { Pillars } from "@/components/marketing/Pillars";
import { Products } from "@/components/marketing/Products";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Roles } from "@/components/marketing/Roles";
import { Security } from "@/components/marketing/Security";
import { Footer } from "@/components/marketing/Footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Pillars />
        <Products />
        <HowItWorks />
        <Roles />
        <Security />
      </main>
      <Footer />
    </div>
  );
}
