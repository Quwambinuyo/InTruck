import Navbar from "./LandingNavbar";
import Footer from "./LandingFooter";
import Hero from "./Hero";
import Services from "./Services";
import HowItWorks from "./HowItWorks";
import Fleet from "./Fleet";
import Drivers from "./Drivers";
import Testimonials from "./Testimonials";
import CTA from "./CTA";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Fleet />
        <Drivers />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
