import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { BlogCards } from "@/constants";

interface BlogCardItem {
  id: number;
  img: string | StaticImageData;
  icon: string;
  text: string;
  title: string;
  date: string;
  link: string;
  category?: string;
}

const BlogCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {(BlogCards as BlogCardItem[]).map(
        ({ id, img, text, title, date, link, category }, index) => (
          <Link
            href={link}
            key={id}
            className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 will-change-transform"
            data-aos="fade-up"
            data-aos-delay={index * 80}
          >
            {/* Image */}
            <div className="relative w-full h-52 overflow-hidden">
              <Image
                src={img}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />

              {/* Category badge */}
              {category && (
                <span className="absolute top-3 left-3 text-[11px] font-semibold text-[#293C97] bg-white/90 backdrop-blur-sm border border-[#c7cef0] px-3 py-1 rounded-full">
                  {category}
                </span>
              )}

              {/* Arrow icon top-right */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-[#293C97] flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                ↗
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-3 p-5 flex-1">
              <h3 className="font-lato font-bold text-[0.95rem] text-[#0E0E1D] leading-snug">
                {title}
              </h3>

              <p className="font-montserrat text-sm text-[#666] leading-relaxed line-clamp-3">
                {text}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-xs text-[#999]">{date}</span>
                <span className="text-xs font-semibold text-[#293C97] flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                  Read more <span>→</span>
                </span>
              </div>
            </div>
          </Link>
        )
      )}
    </div>
  );
};

export default BlogCard;