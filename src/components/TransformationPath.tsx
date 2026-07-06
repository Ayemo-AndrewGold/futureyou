import TransformPathCard from "./TransformPathCard";

const TransformationPath = () => {
  return (
    <section
      className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-3 overflow-hidden mb-10 sm:mb-15"
      data-aos="fade-up"
    >
      {/* Header */}
      <div className="mb-12" data-aos="fade-up" data-aos-delay="100">

        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2 bg-[#EEF0FA] border border-[#c7cef0] text-[#293C97] text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#293C97] inline-block" />
          Transformation Pathways
        </div>

        <h2 className="font-lato font-extrabold text-[2rem] sm:text-[2.6rem] lg:text-[3rem] text-[#0E0E1D] leading-[1.1] tracking-tight mb-4">
          Every Transformation Begins <br /> {" "}
          <span className="text-[#293C97]">with a Decision.</span>
           
        </h2>

        <p className="font-montserrat text-base sm:text-lg text-[#555] leading-relaxed max-w-2xl">
          Wherever you are today, your future can be different. Whether you're seeking personal 
          growth, career advancement, business expansion, or financial support, 
          <b> Future You</b> provides the guidance, strategy, and resources to help you 
          move confidently toward your goals.
        </p>
      </div>

      {/* Cards */}
      <div data-aos="fade-up" data-aos-delay="150">
        <TransformPathCard />
      </div>
    </section>
  );
};

export default TransformationPath;