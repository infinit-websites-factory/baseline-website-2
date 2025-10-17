import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import infinitCarsLogo from "@/assets/infinit-cars-logo.png";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const { getPhoneNumber, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { href: "/stock", label: t('header.vehicles') },
    { href: "/sell", label: t('header.sell_your_car') },
    { href: "/financing", label: t('header.financing') },
    { href: "/services", label: t('header.services') },
    { href: "/contact", label: t('header.contact') },
  ];

  return (
    <header className="bg-nav-background text-nav-foreground border-b border-border/10">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img
              src={infinitCarsLogo}
              alt="INFINIT Cars Logo"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold">INFINIT Cars</h1>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-nav-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <Button variant="premium" className="hidden md:flex items-center gap-2" asChild>
            <a href={`tel:${getPhoneNumber()}`}>
              <Phone size={16} />
              {t('common.call_now')}
            </a>
          </Button>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-nav-foreground hover:text-primary"
              >
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-nav-background text-nav-foreground">
              <SheetHeader>
                <SheetTitle className="text-nav-foreground text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-6 mt-8">
                {navigationLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-lg text-nav-foreground hover:text-primary transition-colors"
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
        </div>
      </div>
    </header>
  );
};

export default Header;