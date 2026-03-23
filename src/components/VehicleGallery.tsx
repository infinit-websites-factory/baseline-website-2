import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import VehicleCard from "./VehicleCard";
import { fetchCars, transformApiCarToVehicle, type Vehicle } from "@/services/carsApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  const vehicles: Vehicle[] = carsResponse
    ? carsResponse.items.map(transformApiCarToVehicle)
    : [];

  const recentVehicles = [...vehicles]
    .sort((a, b) => {
      const statusOrder = (status: string) => status === 'Published' ? 0 : 1;
      const statusDiff = statusOrder(a.status) - statusOrder(b.status);
      if (statusDiff !== 0) return statusDiff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 4);

  if (isError) {
    return (
      <section className="py-[100px] bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-[80px]">
            <h2 className="text-4xl font-heading font-semibold mb-4 text-white">{t('vehicle_gallery.title')}</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {t('vehicle_gallery.subtitle')}
            </p>
          </div>

          <Alert className="max-w-md mx-auto bg-[#171B21] border-[#1F232A] text-white/60">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{t('vehicle_gallery.error_loading')}</AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section className="py-[100px] bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-[80px]">
          <h2 className="text-4xl font-heading font-semibold mb-4 text-white">{t('vehicle_gallery.title')}</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {t('vehicle_gallery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 w-full bg-[#171B21]" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-[#171B21]" />
                  <Skeleton className="h-4 w-1/2 bg-[#171B21]" />
                  <Skeleton className="h-8 w-full bg-[#171B21]" />
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
          <div className="text-center mt-8">
            <a
              href="/stock"
              className="inline-flex items-center justify-center text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
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
