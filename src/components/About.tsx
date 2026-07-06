"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";

const checklistItems = [
  "Personalized Coaching",
  "Strategic Business Consulting",
  "Flexible Growth Capital",
  "Holistic Support for Lasting Success",
];

const About = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handlePlayWithSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    video.play();
    setHasInteracted(true);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 xl:gap-16">

      {/* ── Video column ── */}
      <div
        className="w-full lg:w-1/2"
        data-aos="fade-right"
        data-aos-delay="100"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-black aspect-video">
          <video
            ref={videoRef}
            src="/videos/aboutfutureyou.mp4"
            playsInline
            loop
            preload="metadata"
            controls={hasInteracted}
            className="w-full h-full object-cover"
          />

          {/* Play overlay */}
          {!hasInteracted && (
            <button
              type="button"
              onClick={handlePlayWithSound}
              aria-label="Play video with sound"
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/50 hover:bg-black/40 transition-colors duration-300 group"
            >
              {/* Play button ring */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-20 h-20 rounded-full bg-white/20 animate-ping" />
                <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
                  <Play size={24} className="text-[#293C97] ml-1" />
                </div>
              </div>
              <span className="text-sm font-semibold text-white bg-white/15 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20">
                Play with sound
              </span>
            </button>
          )}

          {/* Duration badge */}
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm pointer-events-none">
            3:42
          </div>
        </div>
      </div>

      {/* ── Text column ── */}
      <div
        className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left"
        data-aos="fade-left"
        data-aos-delay="200"
      >
        <div>
          <h3 className="font-lato font-extrabold text-[1.8rem] sm:text-[2.2rem] text-[#0E0E1D] leading-tight tracking-tight mb-4">
            A Vision for Lasting{" "}
            <span className="text-[#293C97]">Transformation.</span>
            
          </h3>

          <p className="font-montserrat text-base text-[#555] leading-relaxed">
            Future You exists to help individuals and businesses move beyond limitations through 
            coaching, consulting, and growth capital creating meaningful, lasting transformation.
          </p>
        </div>

        {/* Checklist */}
        <ul className="flex flex-col gap-3">
          {checklistItems.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-sm text-[#333] font-montserrat"
            >
              <span className="w-5 h-5 rounded-full bg-[#EEF0FA] border border-[#c7cef0] flex items-center justify-center shrink-0 text-[#293C97] font-bold text-[10px]">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
          <Link
            href="/start-journey"
            className="inline-flex items-center gap-2 bg-[#293C97] hover:bg-[#1e2d85] text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-sm shadow-[#293C97]/20"
          >
            Get Started Today
            <span>→</span>
          </Link>
          <Link
            href="/about-us"
            className="inline-flex items-center gap-2 text-[#293C97] border-[1.5px] border-[#293C97] hover:bg-[#293C97] hover:text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200"
          >
            Discover More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;