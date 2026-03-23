import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('faq.questions.quality.question'),
      answer: t('faq.questions.quality.answer')
    },
    {
      question: t('faq.questions.warranty.question'),
      answer: t('faq.questions.warranty.answer')
    },
    {
      question: t('faq.questions.financing.question'),
      answer: t('faq.questions.financing.answer')
    },
    {
      question: t('faq.questions.delivery.question'),
      answer: t('faq.questions.delivery.answer')
    },
    {
      question: t('faq.questions.trade_in.question'),
      answer: t('faq.questions.trade_in.answer')
    },
    {
      question: t('faq.questions.test_drive.question'),
      answer: t('faq.questions.test_drive.answer')
    },
    {
      question: t('faq.questions.reserve.question'),
      answer: t('faq.questions.reserve.answer')
    },
    {
      question: t('faq.questions.schedule.question'),
      answer: t('faq.questions.schedule.answer')
    },
  ];

  return (
    <section className="py-[100px] px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-white mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-white/70">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="border-x border-[#1F232A] overflow-hidden max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`px-6 border-0 ${index < faqs.length - 1 ? 'border-b border-[#1F232A]' : ''}`}
              >
                <AccordionTrigger className="text-left text-base font-medium text-white hover:text-white/80 py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 pt-0 pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
