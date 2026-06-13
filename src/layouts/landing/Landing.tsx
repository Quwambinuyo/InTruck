import Navbar from "./LandingNavbar";
import Footer from "./LandingFooter";
import Hero from "./Hero";
import Services from "./Services";
import HowItWorks from "./HowItWorks";
import Fleet from "./Fleet";
import Drivers from "./Drivers";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import Reveal from "../../ui/Reveal";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Reveal animation="fade-up" duration={700}>
          <Services />
        </Reveal>
        <Reveal animation="fade-left" duration={700} delay={100}>
          <HowItWorks />
        </Reveal>
        <Reveal animation="fade-right" duration={700} delay={100}>
          <Fleet />
        </Reveal>
        <Reveal animation="fade-up" duration={700} delay={100}>
          <Drivers />
        </Reveal>
        <Reveal animation="fade-down" duration={700} delay={100}>
          <Testimonials />
        </Reveal>
        <Reveal animation="fade-up" duration={700} delay={100}>
          <CTA />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
