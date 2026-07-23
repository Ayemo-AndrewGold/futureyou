
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import FutureYouJourney from "@/components/FutureYouJourney";
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import NeedtoGrow from "@/components/NeedtoGrow";
import StartJourneyNow from "@/components/StartJourneyNow";
import Testimonials from "@/components/Testimonials";
import TransformationPath from "@/components/TransformationPath";
import WorkSpace from "@/components/WorkSpace";
import Image from "next/image";
import NewsletterSection from "@/components/NewsletterSection ";


export default function HomePage() {

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <section className="pb-5 max-w-[1440px] mx-auto overflow-x-hidden">
        <Hero />
      </section>

      <NewsletterSection />

      <section className="max-w-[1440px] mx-auto px-3 sm:px-16 overflow-x-hidden">
        <NeedtoGrow />
      </section>

      <section className="max-w-[1440px] mx-auto px-3 sm:px-16 overflow-x-hidden">
        <TransformationPath />
      </section>

      <section className="pt-5 max-w-[1440px] mx-auto px-2 sm:px-16 overflow-x-hidden">
        <FutureYouJourney />
      </section>


      {/* <section className="py-10 max-w-[1440px] mx-auto px-1 sm:px-16 overflow-x-hidden">
        <Community />
      </section> */}

      <section className="sm:py-8 pt-2 max-w-[1440px] mx-auto sm:px-16 overflow-x-hidden">
        <Testimonials />
      </section>

      {/* <section className="sm:py-14 py-10 max-w-[1440px] mx-auto sm:px-16 overflow-x-hidden">
        <Blog />
      </section> */}
      
      <section className="sm:py-26 pb-10 max-w-[1440px] mx-auto px-4 sm:px-16 overflow-x-hidden">
        <StartJourneyNow />
      </section>

      {/* Footer */}
      <div className="relative w-full overflow-hidden pb-3">
        <Image 
          src="/images/footer.webp" 
          alt="footer background"
          fill
          className="object-cover object-top pointer-events-none select-none"
          loading="lazy"
          decoding="async"
          priority={false}
          fetchPriority="low"
        />
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}