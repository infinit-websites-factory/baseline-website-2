import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import googleLogo from "@/assets/google-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { useMemo, useState } from "react";

const OVERALL_RATING = 4.4;
const TOTAL_REVIEWS = 47;

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) => {
  const sizeClasses = { sm: "w-3.5 h-3.5", md: "w-4 h-4" };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(1, Math.max(0, rating - (star - 1)));
        return (
          <div key={star} className="relative">
            <Star className={`${sizeClasses[size]} text-white/20`} />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={`${sizeClasses[size]} fill-primary text-primary`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const GoogleReviews = () => {
  const { t, language } = useLanguage();
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const reviews = useMemo(() => {
    return translations[language].reviews.testimonials;
  }, [language]);

  const visibleReviews = reviews.slice(startIndex, startIndex + visibleCount);
  const canGoBack = startIndex > 0;
  const canGoForward = startIndex + visibleCount < reviews.length;

  return (
    <section className="bg-background pb-[100px]">
      <div className="container mx-auto max-w-7xl px-4 pt-[100px] pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-white mb-6">
            {t('reviews.title')}
          </h2>

          {/* Google Rating Display */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <img src={googleLogo} alt="Google" className="w-6 h-6" />
              <div className="w-px h-6 bg-white/20"></div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-semibold text-white">{OVERALL_RATING}</span>
                <StarRating rating={OVERALL_RATING} size="md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Strip */}
      <div className="flex items-stretch border-y border-[#1F232A] bg-[#101318]">
        {/* Left Chevron */}
        <button
          onClick={() => canGoBack && setStartIndex(startIndex - 1)}
          disabled={!canGoBack}
          className="w-[80px] flex-shrink-0 flex items-center justify-center border-r border-[#1F232A] transition-colors hover:bg-white/5"
          aria-label="Previous reviews"
        >
          <ChevronLeft className={`w-6 h-6 text-white ${canGoBack ? "" : "opacity-30"}`} />
        </button>

        {/* Review Cells */}
        {visibleReviews.map((review, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col justify-center border-r border-[#1F232A] p-6 hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-semibold text-sm">
                  {review.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">{review.name}</h3>
                <StarRating rating={review.rating} size="sm" />
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
              "{review.review}"
            </p>
            <p className="text-xs text-white/50 mt-3 font-medium">
              {t('reviews.google_review')}
            </p>
          </div>
        ))}

        {/* Right Chevron */}
        <button
          onClick={() => canGoForward && setStartIndex(startIndex + 1)}
          disabled={!canGoForward}
          className="w-[80px] flex-shrink-0 flex items-center justify-center transition-colors hover:bg-white/5"
          aria-label="Next reviews"
        >
          <ChevronRight className={`w-6 h-6 text-white ${canGoForward ? "" : "opacity-30"}`} />
        </button>
      </div>
    </section>
  );
};

export default GoogleReviews;
