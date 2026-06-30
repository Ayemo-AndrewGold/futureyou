import React from "react";
import Image from "next/image";
import Link from "next/link";

import SubscriptionCard from "@/components/SubscriptionCard";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import StartJourneyNow from "@/components/StartJourneyNow";

const CoWorkingPage: React.FC = () => {
  return (
    <main className="font-lato max-w-[1440px] mx-auto px-4 sm:px-16 overflow-hidden">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center mt-20 sm:mt-30 text-center">
        <h1 className="text-4xl sm:text-5xl w-full sm:w-[53%]">
          A Space to Focus, Connect, and Grow
        </h1>

        <p className="mt-5">
          Book a professional, high-speed workspace whenever you need it — by the
          day, week, or month
        </p>

        <Link href="/" className="mt-5">
          <Button
            label="Book Now"
            bgcolor="bg-[#293C97]"
            color="text-white"
            className="w-full sm:w-auto py-3 sm:py-4 px-6"
          />
        </Link>
      </section>

      {/* Image Section */}
      <section className="flex flex-col justify-start items-start mt-10 sm:mt-20 mb-6">
        <h2 className="text-3xl mb-3">Everything You Need to Thrive</h2>

        <p className="w-full sm:w-[55%] mb-6">
          Our co-working space is designed to foster creativity, collaboration,
          and productivity — perfect for freelancers, entrepreneurs, remote
          teams, and creatives looking for focus and flow.
        </p>

        <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/images/coWorking.webp"
            alt="Co-working space"
            fill
            className="object-cover object-center rounded-lg"
            priority={false}
          />
        </div>
      </section>

      {/* Description */}
      <section>
        <h2 className="text-[#293C97] text-[1.2rem]">Description</h2>
        <hr className="w-[3%] border border-[#293C97]" />

        <div className="w-full sm:w-[75%] text-[1.1rem] mt-5 space-y-4">
          <p>
            Welcome to a space designed not just for work — but for growth,
            focus, and connection. Our co-working environment offers a modern,
            thoughtfully curated setting that meets the evolving needs of
            freelancers, entrepreneurs, remote teams, and creators alike.
          </p>

          <p>
            We offer an inspiring atmosphere filled with natural light,
            ergonomic seating, and vibrant creative energy. High-speed
            internet, private meeting rooms, printing access, and a stocked
            refreshment area are just a few of the essentials you’ll find here.
          </p>
        </div>
      </section>

      {/* Facilities */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-[#0E0E1D] mb-8">FACILITIES</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full sm:w-[70%]">
          <Facility
            icon="/images/highSpeed.png"
            text="High-Speed Internet"
          />
          <Facility
            icon="/images/refreshment.png"
            text="24/7 Access"
          />
          <Facility
            icon="/images/fullAccess.png"
            text="Full Access to Facilities"
          />
          <Facility
            icon="/images/comfortableDesk.png"
            text="Comfortable Desks & Ergonomic Chairs"
          />
        </div>
      </section>

      {/* Location */}
      <section className="mt-10">
        <h2 className="text-3xl mb-5">Location</h2>
        <p className="text-[1rem]">
          Blk F3 Suite 256 Eastline HFP Complex, Lekki-Epe Expressway, Lagos.
        </p>

        <div className="mt-5 w-full h-[400px] rounded-lg overflow-hidden shadow-md">
          <iframe
            title="Company location map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.2482845357127!2d3.5327718159199635!3d6.457019725372295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf83d09e1c7f5%3A0x5c97b4fef6b93dc4!2sEastline%20Shopping%20Complex!5e0!3m2!1sen!2sng!4v1721726209805!5m2!1sen!2sng"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Subscription */}
      <section className="mt-20 text-center">
        <h2 className="text-3xl sm:text-4xl mb-10">
          Choose the Plan That Works for You
        </h2>
        <SubscriptionCard />
      </section>

      <StartJourneyNow />

      {/* Footer */}
      <div className="relative w-full pb-8 mt-20">
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
    </main>
  );
};

export default CoWorkingPage;

/* -------------------- */
/* Facility Component */
/* -------------------- */

interface FacilityProps {
  icon: string;
  text: string;
}

const Facility: React.FC<FacilityProps> = ({ icon, text }) => (
  <div className="flex items-center gap-5">
    <Image
      src={icon}
      alt={text}
      width={48}
      height={48}
      className="object-contain"
    />
    <p className="text-base text-gray-700">{text}</p>
  </div>
);
