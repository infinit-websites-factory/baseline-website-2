import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  ClipboardCheck,
  CarFront,
  Clock,
  Sparkles,
  MessageCircleQuestion,
} from "lucide-react";

const FAQ = () => {
  const { t } = useLanguage();
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  const faqs = [
    {
      key: "quality",
      icon: ClipboardCheck,
      color: "from-blue-500/20 to-blue-600/10",
      iconColor: "text-blue-600",
      question: t('faq.questions.quality.question'),
      answer: t('faq.questions.quality.answer')
    },
    {
      key: "warranty",
      icon: ShieldCheck,
      color: "from-emerald-500/20 to-emerald-600/10",
      iconColor: "text-emerald-600",
      question: t('faq.questions.warranty.question'),
      answer: t('faq.questions.warranty.answer')
    },
    {
      key: "financing",
      icon: CreditCard,
      color: "from-violet-500/20 to-violet-600/10",
      iconColor: "text-violet-600",
      question: t('faq.questions.financing.question'),
      answer: t('faq.questions.financing.answer')
    },
    {
      key: "delivery",
      icon: Truck,
      color: "from-amber-500/20 to-amber-600/10",
      iconColor: "text-amber-600",
      question: t('faq.questions.delivery.question'),
      answer: t('faq.questions.delivery.answer')
    },
    {
      key: "trade_in",
      icon: CarFront,
      color: "from-rose-500/20 to-rose-600/10",
      iconColor: "text-rose-600",
      question: t('faq.questions.trade_in.question'),
      answer: t('faq.questions.trade_in.answer')
    },
    {
      key: "test_drive",
      icon: Sparkles,
      color: "from-cyan-500/20 to-cyan-600/10",
      iconColor: "text-cyan-600",
      question: t('faq.questions.test_drive.question'),
      answer: t('faq.questions.test_drive.answer')
    },
    {
      key: "reserve",
      icon: MessageCircleQuestion,
      color: "from-indigo-500/20 to-indigo-600/10",
      iconColor: "text-indigo-600",
      question: t('faq.questions.reserve.question'),
      answer: t('faq.questions.reserve.answer')
    },
    {
      key: "schedule",
      icon: Clock,
      color: "from-teal-500/20 to-teal-600/10",
      iconColor: "text-teal-600",
      question: t('faq.questions.schedule.question'),
      answer: t('faq.questions.schedule.answer')
    },
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 bg-primary/8 backdrop-blur-sm rounded-full px-5 py-2.5 mb-6 border border-primary/10">
            <MessageCircleQuestion className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight">
            {t('faq.title')}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Grid */}
        <Accordion
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openItem === `item-${index}`;

            return (
              <AccordionItem
                key={faq.key}
                value={`item-${index}`}
                className={`
                  group rounded-2xl border border-slate-200/80 bg-white
                  shadow-sm hover:shadow-md
                  transition-all duration-300 ease-out
                  ${isOpen ? 'shadow-lg border-primary/20 md:col-span-2 ring-1 ring-primary/10' : 'hover:border-slate-300'}
                `}
              >
                <AccordionTrigger className="text-left px-5 py-4 hover:no-underline gap-4 [&>svg]:hidden">
                  <div className="flex items-center gap-4 w-full">
                    <div className={`
                      flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${faq.color}
                      flex items-center justify-center
                      transition-all duration-300
                      ${isOpen ? 'scale-110 shadow-md' : 'group-hover:scale-105'}
                    `}>
                      <Icon className={`w-5 h-5 ${faq.iconColor} transition-colors duration-300`} />
                    </div>
                    <span className={`
                      text-[15px] font-semibold leading-snug flex-1
                      transition-colors duration-200
                      ${isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary/80'}
                    `}>
                      {faq.question}
                    </span>
                    <div className={`
                      flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                      transition-all duration-300
                      ${isOpen ? 'bg-primary/10 rotate-180' : 'bg-slate-100 group-hover:bg-slate-200'}
                    `}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className={`transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-slate-500'}`}
                      >
                        <path
                          d="M3.5 5.25L7 8.75L10.5 5.25"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <div className="pl-15 ml-[60px] pt-1 border-t border-slate-100">
                    <p className="text-muted-foreground leading-relaxed text-[14.5px] pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
