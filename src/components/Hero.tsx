import heroImg1 from "@/assets/img1.jpg";
import heroImg2 from "@/assets/img2.jpg";
import heroImg3 from "@/assets/img3.jpg";
import heroImg4 from "@/assets/img4.jpg";
import heroImg5 from "@/assets/img5.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const heroImages = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5];

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { getCityName, t } = useLanguage();
  const cityName = getCityName();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/stock?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/stock');
    }
  };

  return (
    <section className="relative h-[500px] md:h-[680px] flex items-center overflow-hidden">
      {/* Background Image Carousel */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${img})`,
            opacity: index === currentSlide ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-[2px] rounded-full transition-all duration-500 ${
              index === currentSlide ? "bg-white w-8" : "bg-white/40 w-4"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white container mx-auto px-4 w-full flex flex-col items-center">
        <div className="w-12 h-[2px] bg-primary mb-8"></div>
        <h1 className="text-3xl md:text-5xl font-normal mb-5 leading-tight tracking-wide text-white drop-shadow-lg">
          {t('hero.title')}
        </h1>
        <p className="text-sm md:text-base uppercase tracking-[0.3em] text-white/80 mb-10 font-light drop-shadow-md">
          {t('hero.subtitle')} {cityName}
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div className="flex gap-0 rounded-full overflow-hidden border border-white/20 bg-black/30 backdrop-blur-md">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-0 text-white placeholder:text-white/50 h-12 pl-5 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button type="submit" className="rounded-none rounded-r-full px-6 h-12">
              <Search className="h-4 w-4 mr-2" />
              {t('common.search')}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Hero;
