import { Car, Shield, CreditCard, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Car,
      title: t('services.vip.title'),
      description: t('services.vip.description'),
      additionalInfo: t('services.vip.additional_info'),
    },
    {
      icon: Shield,
      title: t('services.warranty.title'),
      description: t('services.warranty.description'),
      additionalInfo: t('services.warranty.additional_info'),
    },
    {
      icon: CreditCard,
      title: t('services.financing.title'),
      description: t('services.financing.description'),
      additionalInfo: undefined,
    }
  ];

  return (
    <section className="py-[100px] px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-white mb-5">
            {t('services.title')}
          </h2>
          <p className="text-lg text-white/50 mx-auto max-w-3xl leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group border border-[#1F232A] bg-[#171B21] p-8 hover:bg-[#1C2027] transition-colors relative"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="w-12 h-12 border border-[#1F232A] flex items-center justify-center mb-6 group-hover:border-primary/30 transition-colors">
                  <IconComponent className="w-6 h-6 text-white/40 group-hover:text-primary transition-colors" />
                </div>

                <h3 className="text-xl font-heading font-medium text-white mb-4 leading-tight">
                  {service.title}
                </h3>

                <p className="text-white/50 leading-relaxed mb-5 text-sm">
                  {service.description}
                </p>

                {service.additionalInfo && (
                  <div className="flex items-start gap-2 text-xs text-primary/60 border-t border-[#1F232A] pt-4 mt-4">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span className="italic">{service.additionalInfo}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="px-8 h-10">
            <a href="/services" className="inline-flex items-center gap-2">
              {t('common.more_information')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
