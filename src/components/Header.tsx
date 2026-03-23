import { Phone, MapPin, Menu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import luxuryCarLogo from "@/assets/logoo.webp";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const Header = () => {
  const { getPhoneNumber, getAddress, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const address = getAddress();

  const navigationLinks = [
    { href: "/", label: t('header.home') },
    { href: "/stock", label: t('header.vehicles') },
    { href: "/sell", label: t('header.sell_your_car') },
    { href: "/financing", label: t('header.financing') },
    { href: "/services", label: t('header.services') },
    { href: "/contact", label: t('header.contact') },
  ];

  return (
    <header className="bg-background text-white border-b border-[#1F232A]">
      <div className="container mx-auto max-w-7xl px-4 flex h-[70px] items-center justify-between">
        {/* Left: Logo */}
        <a href="/" className="hover:opacity-80 transition-opacity pr-3">
          <img
            src={luxuryCarLogo}
            alt="Luxury Car Logo"
            className="h-[46px] object-contain"
          />
        </a>

        {/* Center: Contact Info */}
        <div className="hidden md:flex items-center self-stretch">
          <a
            href={`tel:${getPhoneNumber()}`}
            className="group flex items-center gap-3 self-stretch px-5 border-x border-[#1F232A] transition-colors hover:bg-[#171B21]"
          >
            <Phone size={16} className="shrink-0 text-white/60 transition-colors group-hover:text-white" />
            <span className="text-sm leading-6 text-white/60 transition-colors group-hover:text-white">{getPhoneNumber()}</span>
          </a>
          <a
            href={address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 self-stretch px-5 border-r border-[#1F232A] transition-colors hover:bg-[#171B21]"
          >
            <MapPin size={16} className="shrink-0 text-white/60 transition-colors group-hover:text-white" />
            <span className="text-sm leading-6 text-white/60 transition-colors group-hover:text-white hidden lg:inline">{address.city}</span>
          </a>
        </div>

        {/* Right: Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 self-stretch px-5 border-x border-[#1F232A] transition-colors hover:bg-[#171B21] ml-auto"
          aria-label="Open menu"
        >
          <span className="text-sm font-medium text-white/60 transition-colors group-hover:text-white hidden sm:inline">{t('common.menu')}</span>
          <Menu size={18} className="text-white" />
        </button>
      </div>

      {/* Slide-out Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="bg-background text-white border-l border-[#1F232A] w-[300px] sm:w-[350px]">
          <SheetHeader>
            <SheetTitle className="text-white text-left text-xl font-heading">{t('common.menu')}</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col mt-8 -mx-6">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg text-white/90 hover:text-primary hover:bg-white/[0.03] transition-colors py-3.5 px-6"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact Info in Menu */}
          <div className="-mx-6 mt-8 pt-8 border-t border-[#1F232A] px-6">
            <p className="text-white/50 text-sm mb-4">{t('footer.contact_title')}</p>
            <div className="space-y-3">
              <a
                href={`tel:${getPhoneNumber()}`}
                className="flex items-center gap-3 text-white/90 hover:text-primary transition-colors"
              >
                <Phone size={16} className="text-primary" />
                <span>{getPhoneNumber()}</span>
              </a>
              <a
                href={address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/90 hover:text-primary transition-colors"
              >
                <MapPin size={16} className="text-primary" />
                <span className="text-sm">{address.full}</span>
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
