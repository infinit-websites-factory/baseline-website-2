import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOProps {
  page: "home" | "stock" | "vehicle_detail" | "sell" | "financing" | "services" | "contact" | "not_found";
  vehicleName?: string;
}

const SEO = ({ page, vehicleName }: SEOProps) => {
  const { t, language, getCityName } = useLanguage();
  const city = getCityName();

  const rawTitle = t(`seo.${page}.title`) as string;
  const rawDescription = t(`seo.${page}.description`) as string;

  const title = rawTitle
    .replace("{city}", city)
    .replace("{vehicle}", vehicleName || "");
  const description = rawDescription
    .replace("{city}", city)
    .replace("{vehicle}", vehicleName || "");

  const langMap = { es: "es", en: "en", fr: "fr" } as const;

  return (
    <Helmet>
      <html lang={langMap[language]} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
