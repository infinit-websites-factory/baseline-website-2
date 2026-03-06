import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import VehicleCard from "./VehicleCard";
import { fetchCars, transformApiCarToVehicle, type Vehicle } from "@/services/carsApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import showroomBg from "@/assets/img1.jpg";

const VehicleGallery = () => {
  const { t } = useLanguage();
  const {
    data: carsResponse,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['cars'],
    queryFn: () => fetchCars(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  const vehicles: Vehicle[] = carsResponse
    ? carsResponse.items.map(transformApiCarToVehicle)
    : [];

  // Sort by status (Published first), then by most recent (createdAt), and take first 4
  const recentVehicles = [...vehicles]
    .sort((a, b) => {
      // First, sort by status (Published vehicles first)
      const statusOrder = (status: string) => status === 'Published' ? 0 : 1;
      const statusDiff = statusOrder(a.status) - statusOrder(b.status);
      if (statusDiff !== 0) return statusDiff;

      // Then sort by most recent
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 4);

  if (isError) {
    return (
      <section
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url(${showroomBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{t('vehicle_gallery.title')}</h2>
            <div className="premium-divider mb-6"></div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('vehicle_gallery.subtitle')}
            </p>
          </div>

          <Alert className="max-w-md mx-auto bg-white/10 border-white/20 text-white">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {t('vehicle_gallery.error_loading')}
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: `url(${showroomBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{t('vehicle_gallery.title')}</h2>
          <div className="premium-divider mb-6"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('vehicle_gallery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg bg-white/10" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-white/10" />
                  <Skeleton className="h-4 w-1/2 bg-white/10" />
                  <Skeleton className="h-8 w-full bg-white/10" />
                </div>
              </div>
            ))
          ) : (
            recentVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))
          )}
        </div>

        {!isLoading && vehicles.length > 4 && (
          <div className="text-center mt-12">
            <a
              href="/stock"
              className="inline-flex items-center justify-center rounded-md text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-white text-gray-900 hover:bg-gray-100 h-12 px-8 py-3 shadow-lg hover:shadow-xl"
            >
              {t('vehicle_gallery.view_cars')}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default VehicleGallery;
