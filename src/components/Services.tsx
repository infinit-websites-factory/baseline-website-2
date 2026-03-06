import { Car, Shield, CreditCard, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import servicesBg from "@/assets/img4.jpg";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Car,
      title: t('services.vip.title'),
      description: t('services.vip.description'),
      additionalInfo: t('services.vip.additional_info'),
      accent: "bg-blue-600",
      iconBg: "bg-blue-600/10 text-blue-600",
    },
    {
      icon: Shield,
      title: t('services.warranty.title'),
      description: t('services.warranty.description'),
      additionalInfo: t('services.warranty.additional_info'),
      accent: "bg-emerald-600",
      iconBg: "bg-emerald-600/10 text-emerald-600",
    },
    {
      icon: CreditCard,
      title: t('services.financing.title'),
      description: t('services.financing.description'),
      additionalInfo: undefined,
      accent: "bg-amber-600",
      iconBg: "bg-amber-600/10 text-amber-600",
    }
  ];

  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{
        backgroundImage: `url(${servicesBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Light warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/92 via-gray-50/90 to-blue-50/88" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 rounded-full px-5 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 text-sm font-semibold tracking-wide uppercase">Premium</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            {t('services.title')}
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-600 mx-auto max-w-3xl leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-2xl hover:shadow-blue-600/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${service.accent} opacity-80 group-hover:opacity-100 transition-opacity`} />

                <div className={`w-16 h-16 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">
                  {service.description}
                </p>

                {service.additionalInfo && (
                  <div className="flex items-start gap-2 text-sm text-blue-700/80 bg-blue-50 rounded-lg px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                    <span className="italic">{service.additionalInfo}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Button
            asChild
            className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 text-base font-semibold h-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <a href="/services" className="inline-flex items-center gap-2">
              {t('common.more_information')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
