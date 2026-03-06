import { createContext, useContext, useState, ReactNode } from "react";
import { translations, TranslationKey } from "@/translations";

export type Language = "es" | "en" | "fr";

interface AddressInfo {
  street: string;
  city: string;
  full: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  getPhoneNumber: () => string;
  getPhoneNumberWithPrefix: () => string;
  getWhatsAppNumber: () => string;
  getAddress: () => AddressInfo;
  getCityName: () => string;
  getCurrency: () => string;
  getCurrencySymbol: () => string;
  formatPrice: (price: number) => string;
  t: (key: TranslationKey, options?: { returnObjects?: boolean }) => any;
  translateVehicleAttribute: (category: 'fuel' | 'transmission' | 'body_type' | 'color', value: string) => string;
}

const PHONE_NUMBERS = {
  es: "+34747775728",
  en: "+34747775728",
  fr: "+34747775728",
};

const ADDRESSES: Record<Language, AddressInfo> = {
  es: {
    street: "Carretera Ca l'Alaio, 3",
    city: "08820 El Prat de Llobregat, Barcelona, España",
    full: "Carretera Ca l'Alaio, 3, 08820 El Prat de Llobregat, Barcelona, España",
    mapsUrl: "https://maps.app.goo.gl/KPTob6R2WPd9uDtd7",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.053040855266!2d2.0815250758755677!3d41.32945997130732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49f8445d66b77%3A0xf63709398a17e367!2sLuxury%20Car!5e0!3m2!1sen!2sin!4v1772612177733!5m2!1sen!2sin"
  },
  en: {
    street: "Carretera Ca l'Alaio, 3",
    city: "08820 El Prat de Llobregat, Barcelona, Spain",
    full: "Carretera Ca l'Alaio, 3, 08820 El Prat de Llobregat, Barcelona, Spain",
    mapsUrl: "https://maps.app.goo.gl/KPTob6R2WPd9uDtd7",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.053040855266!2d2.0815250758755677!3d41.32945997130732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49f8445d66b77%3A0xf63709398a17e367!2sLuxury%20Car!5e0!3m2!1sen!2sin!4v1772612177733!5m2!1sen!2sin"
  },
  fr: {
    street: "Carretera Ca l'Alaio, 3",
    city: "08820 El Prat de Llobregat, Barcelone, Espagne",
    full: "Carretera Ca l'Alaio, 3, 08820 El Prat de Llobregat, Barcelone, Espagne",
    mapsUrl: "https://maps.app.goo.gl/KPTob6R2WPd9uDtd7",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.053040855266!2d2.0815250758755677!3d41.32945997130732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49f8445d66b77%3A0xf63709398a17e367!2sLuxury%20Car!5e0!3m2!1sen!2sin!4v1772612177733!5m2!1sen!2sin"
  }
};

const CURRENCIES: Record<Language, { code: string; symbol: string }> = {
  es: { code: "EUR", symbol: "€" },
  en: { code: "EUR", symbol: "€" },
  fr: { code: "EUR", symbol: "€" }
};

const formatPhoneNumber = (phone: string, language: Language): string => {
  const digits = phone.substring(1);
  // Spanish format: +34 747 77 57 28
  return `+34 ${digits.substring(2, 5)} ${digits.substring(5, 7)} ${digits.substring(7, 9)} ${digits.substring(9)}`;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("es");

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const getPhoneNumber = () => {
    return formatPhoneNumber(PHONE_NUMBERS[language], language);
  };

  const getPhoneNumberWithPrefix = () => {
    return PHONE_NUMBERS[language];
  };

  const getWhatsAppNumber = () => {
    return PHONE_NUMBERS[language].substring(1);
  };

  const getAddress = () => {
    return ADDRESSES[language];
  };

  const getCityName = () => {
    return "El Prat de Llobregat";
  };

  const getCurrency = () => {
    return CURRENCIES[language].code;
  };

  const getCurrencySymbol = () => {
    return CURRENCIES[language].symbol;
  };

  const formatPrice = (price: number): string => {
    const currency = CURRENCIES[language];
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const t = (key: TranslationKey, options?: { returnObjects?: boolean }): any => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    if (options?.returnObjects) {
      return value;
    }

    return typeof value === 'string' ? value : key;
  };

  const translateVehicleAttribute = (category: 'fuel' | 'transmission' | 'body_type' | 'color', value: string): string => {
    if (!value) return value;

    try {
      const translationKey = `vehicle_attributes.${category}.${value}` as TranslationKey;
      const translated = t(translationKey);

      if (translated === translationKey) {
        return value;
      }

      return translated;
    } catch {
      return value;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getPhoneNumber, getPhoneNumberWithPrefix, getWhatsAppNumber, getAddress, getCityName, getCurrency, getCurrencySymbol, formatPrice, t, translateVehicleAttribute }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
