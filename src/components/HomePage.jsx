"use client";

const HomePage = () => {
  return (
    <main className="w-full overflow-x-hidden">
      <section className="pb-12 max-w-[1440px] mx-auto px-4 sm:px-16 overflow-x-hidden">
        <Hero />
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-16 overflow-x-hidden">
        <NeedToGrow />
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-16 overflow-x-hidden">
        <TransformationPath />
      </section>

      <section className="py-10 max-w-[1440px] mx-auto px-4 sm:px-16 overflow-x-hidden">
        <FutureYouJourney />
      </section>

      <section className="bg-transparent sm:bg-[#EDEDED] max-w-[1440px] mx-auto mt-10 px-4 sm:px-16 overflow-x-hidden">
        <WorkSpace />
      </section>

      <section className="py-10 max-w-[1440px] mx-auto px-4 sm:px-16 overflow-x-hidden">
        <Community />
      </section>

      <section className="sm:py-24 pt-12 max-w-[1440px] mx-auto px-4 sm:px-16 overflow-x-hidden">
        <Testimonials />
      </section>

      <section className="sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-16 overflow-x-hidden">
        <Blog />
      </section>

      <section className="sm:py-32 py-8 max-w-[1440px] mx-auto px-4 sm:px-16 overflow-x-hidden">
        <StartJourneyNow />
      </section>

      {/* Footer */}
      <div className="relative w-full overflow-hidden pb-8">
        <Image 
          src="/images/backgroundImage.webp"
          alt="footer background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
