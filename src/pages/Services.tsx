import { Car, Shield, CreditCard, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import heroImage from "@/assets/servicios-hero.png";
import servicios2Image from "@/assets/servicios-2.png";

const Services = () => {
  const { getCityName, t } = useLanguage();
  const cityName = getCityName();
  const mainServices = [
    {
      icon: Car,
      title: t('services_page.main_services.vip.title'),
      description: t('services_page.main_services.vip.description')
    },
    {
      icon: Shield,
      title: t('services_page.main_services.warranty.title'),
      description: t('services_page.main_services.warranty.description')
    },
    {
      icon: Truck,
      title: t('services_page.main_services.shipping.title'),
      description: t('services_page.main_services.shipping.description')
    },
    {
      icon: CreditCard,
      title: t('services_page.main_services.financing.title'),
      description: t('services_page.main_services.financing.description')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO page="services" />
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {t('services_page.hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('services_page.hero.subtitle')} {cityName}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section
        className="relative py-20 px-4"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <IconComponent className="w-7 h-7 text-primary group-hover:text-black transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white text-center mb-4">
                    {service.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-primary/50 mx-auto mb-4 group-hover:w-12 transition-all duration-300" />
                  <p className="text-white/60 leading-relaxed text-sm text-center group-hover:text-white/80 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sell Your Car Section - Dark with image */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            {/* Image Side */}
            <div className="relative h-[300px] lg:h-auto overflow-hidden">
              <img
                src={servicios2Image}
                alt={t('services_page.alt_texts.sell')}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:to-[#111]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent lg:hidden" />
            </div>

            {/* Content Side */}
            <div className="bg-[#111] flex items-center">
              <div className="px-8 py-16 lg:px-16 lg:py-20 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                  <Car className="w-4 h-4" />
                  <span>{t('services_page.sell_section.title')}</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                  {t('services_page.sell_section.title')}
                </h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  {t('services_page.sell_section.description')}
                </p>
                <Button
                  variant="premium"
                  size="lg"
                  className="gap-2"
                  asChild
                >
                  <a href="/sell">
                    {t('services_page.sell_section.button')}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      <Footer />
    </div>
  );
};

export default Services;