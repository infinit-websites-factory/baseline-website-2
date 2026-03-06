import { Button } from "@/components/ui/button";
import { Phone, Menu, X, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import luxuryCarLogo from "@/assets/logoo.webp";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const { getPhoneNumber, getAddress, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const address = getAddress();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationLinks = [
    { href: "/", label: t('header.home') },
    { href: "/stock", label: t('header.vehicles') },
    { href: "/sell", label: t('header.sell_your_car') },
    { href: "/financing", label: t('header.financing') },
    { href: "/services", label: t('header.services') },
    { href: "/contact", label: t('header.contact') },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-black/80 backdrop-blur-xl shadow-lg shadow-black/20'
        : 'bg-black/40 backdrop-blur-md'
    }`}>
      {/* Line 1: Logo, Address, Hours, Call Button */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="hover:opacity-80 transition-opacity">
              <img
                src={luxuryCarLogo}
                alt="Luxury Car Logo"
                className="h-10 object-contain"
              />
            </a>

            {/* Address & Hours - Desktop Only */}
            <div className="hidden lg:flex items-center gap-12 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-white/80 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-white text-xs tracking-wide uppercase">{t('header.address')}</span>
                  <span className="text-white/60 text-xs">{address.full}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={15} className="text-white/80 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-white text-xs tracking-wide uppercase">{t('header.hours')}</span>
                  <span className="text-white/60 text-xs">{t('footer.hours.weekday')}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={15} className="text-white/80 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-white text-xs tracking-wide uppercase">{t('header.phone')}</span>
                  <span className="text-white/60 text-xs">{getPhoneNumber()}</span>
                </div>
              </div>
            </div>

            {/* Call Button - Desktop */}
            <Button variant="premium" className="hidden md:flex items-center gap-2" asChild>
              <a href={`tel:${getPhoneNumber()}`}>
                <Phone size={16} />
                {t('common.call_now')}
              </a>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-gray-300"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Line 2: Navigation Menu */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center space-x-8 py-3">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-white transition-colors font-medium text-sm tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="bg-white">
          <SheetHeader>
            <SheetTitle className="text-foreground text-left">{t('common.menu')}</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-6 mt-8">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg text-foreground hover:text-gray-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button variant="premium" className="w-full items-center gap-2 mt-4" asChild>
              <a href={`tel:${getPhoneNumber()}`}>
                <Phone size={16} />
                {t('common.call_now')}
              </a>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;