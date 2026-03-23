import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import ReservedBanner from "@/components/ReservedBanner";
import dgtB from "@/assets/dgt-b.png";
import dgtC from "@/assets/dgt-c.png";
import dgtCero from "@/assets/dgt-cero.png";
import dgtEco from "@/assets/dgt-eco.png";

interface VehicleCardProps {
  id: string;
  images: string[];
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  mileageUnit: string;
  fuel: string;
  transmission: string;
  type: string;
  status: string;
  environmentalBadge?: string;
}

const VehicleCard = ({
  id,
  images = [],
  brand,
  model,
  year,
  price,
  mileage,
  mileageUnit,
  fuel,
  transmission,
  type,
  status,
  environmentalBadge
}: VehicleCardProps) => {
  const { translateVehicleAttribute, formatPrice, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  console.log('VehicleCard - environmentalBadge:', environmentalBadge, 'for', brand, model);

  // Preload all images
  useEffect(() => {
    if (images.length > 1) {
      const loadPromises = images.map((src, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => {
              const newLoaded = [...prev];
              newLoaded[index] = true;
              return newLoaded;
            });
            resolve();
          };
          img.onerror = () => resolve();
          img.src = src;
        });
      });

      Promise.all(loadPromises);
    }
  }, [images]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[currentImageIndex] || '/placeholder.svg';

  const getBadgeImage = (badge?: string) => {
    if (!badge) return null;
    const badgeLower = badge.toLowerCase();
    if (badgeLower.includes('cero') || badgeLower.includes('0')) return dgtCero;
    if (badgeLower.includes('eco')) return dgtEco;
    if (badgeLower.includes('c')) return dgtC;
    if (badgeLower.includes('b')) return dgtB;
    return null;
  };

  const badgeImage = getBadgeImage(environmentalBadge);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link to={`/stock/${id}`} className="block h-full" onClick={handleClick}>
      <Card className="group overflow-hidden bg-[#171B21] border border-[#1F232A] hover:border-white/20 transition-all duration-700 flex flex-col h-full cursor-pointer">
        <div className="relative overflow-hidden">
          {status === 'Reserved' && <ReservedBanner size="small" />}
          <img
            src={currentImage}
            alt={`${brand} ${model}`}
            className="w-full h-52 object-cover group-hover:scale-[1.03] transition-transform duration-700"
            style={{ imageRendering: 'auto' }}
          />
          {/* Subtle gradient overlay at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#171B21] to-transparent" />
          {images.length > 1 && (
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white border border-[#1F232A]"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white border border-[#1F232A]"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white/60 text-[10px] px-2 py-0.5 font-body tracking-wider">
              {currentImageIndex + 1}/{images.length}
            </div>
          )}
        </div>

        <CardContent className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-heading font-semibold text-lg text-white">{brand} {model}</h3>
              <p className="text-white/40 text-xs font-body font-light tracking-wide">{year} · {translateVehicleAttribute('body_type', type)}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-heading font-semibold text-white">{formatPrice(price)}</p>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex items-end justify-between gap-4 mb-4">
              <div className="grid grid-cols-2 gap-2 text-[11px] text-white/35 font-body font-light">
                <div>📏 {mileage.toLocaleString()} {mileageUnit}</div>
                <div>⛽ {translateVehicleAttribute('fuel', fuel)}</div>
                <div>⚙️ {translateVehicleAttribute('transmission', transmission)}</div>
                <div>📅 {year}</div>
              </div>
              {badgeImage && (
                <div className="flex-shrink-0">
                  <img src={badgeImage} alt={`Badge ${environmentalBadge}`} className="w-10 h-10 opacity-70" />
                </div>
              )}
            </div>
            <Button
              className="w-full text-[10px]"
              variant="outline"
            >
              <Eye size={14} className="mr-2" />
              {t('common.view_details')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VehicleCard;
