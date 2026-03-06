import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import googleLogo from "@/assets/google-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { useMemo } from "react";

const OVERALL_RATING = 4.4;
const TOTAL_REVIEWS = 47;

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(1, Math.max(0, rating - (star - 1)));
        return (
          <div key={star} className="relative">
            <Star className={`${sizeClasses[size]} text-gray-300`} />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={`${sizeClasses[size]} fill-amber-400 text-amber-400`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const GoogleReviews = () => {
  const { t, language } = useLanguage();

  const reviews = useMemo(() => {
    return translations[language].reviews.testimonials;
  }, [language]);

  return (
    <section className="reviews-section relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,66,159,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.08),transparent_60%)]" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            {t('reviews.title')}
          </h2>
          <p className="text-slate-400 text-base md:text-lg mb-10">
            {t('reviews.subtitle')}
          </p>

          {/* Google Rating Badge */}
          <div className="inline-flex items-center gap-5 bg-white/[0.07] backdrop-blur-xl border border-white/[0.1] rounded-2xl px-8 py-5 shadow-2xl shadow-black/20">
            <img
              src={googleLogo}
              alt="Google"
              className="w-10 h-10"
            />
            <div className="w-px h-12 bg-white/10" />
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-white">{OVERALL_RATING}</span>
                <StarRating rating={OVERALL_RATING} size="lg" />
              </div>
              <span className="text-slate-400 text-sm mt-1">
                {t('reviews.based_on')} {TOTAL_REVIEWS} {t('reviews.reviews_count')}
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-5">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-3 md:pl-5 basis-full">
                  <div className="group h-full max-w-2xl mx-auto bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-7 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/[0.15] hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                    {/* Review Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 ring-2 ring-white/10">
                          <span className="text-white font-semibold text-sm">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-sm">{review.name}</h3>
                          <p className="text-xs text-slate-500">{review.date}</p>
                        </div>
                      </div>
                      <img src={googleLogo} alt="" className="w-5 h-5 opacity-60" />
                    </div>

                    {/* Stars */}
                    <div className="mb-4">
                      <StarRating rating={review.rating} size="sm" />
                    </div>

                    {/* Review Text */}
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {review.review}
                    </p>

                    {/* Bottom tag */}
                    <div className="mt-5 pt-4 border-t border-white/[0.06]">
                      <div className="flex items-center gap-1.5">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-green-400/80 fill-current">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                        <span className="text-xs text-slate-500">{t('reviews.google_review')}</span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] text-white hover:bg-white/[0.15] hover:text-white w-11 h-11 shadow-xl" />
            <CarouselNext className="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] text-white hover:bg-white/[0.15] hover:text-white w-11 h-11 shadow-xl" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
