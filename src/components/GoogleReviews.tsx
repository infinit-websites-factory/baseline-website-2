import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import googleLogo from "@/assets/google-logo.jpeg";

const GoogleReviews = () => {
  const reviews = [
    {
      name: "Nadia G",
      review: "Gracias al soporte de Jorge en todo el proceso he avanzado comprando mi primer coche y a distancia. Me ha transmitido confianza y me ha ayudado con el proceso de financiación. Responden rapido y estan disponibles cuando los necesitas. Fuimos a buscar el coche a Madrid y todo estaba tal cual nos habían dicho. Volvimos a casa con el coche y todo super bien. Los recomiendo!"
    },
    {
      name: "CRIS ZALEA",
      review: "Muy contentos, queríamos un coche para nuestro hijo, fuimos a verlo, y en 2 días lo estaba conduciendo, todo muy rápido, y fácil. Muchas gracias por las gestiones. Recomendable 100%"
    },
    {
      name: "Rocio Luna",
      review: "Hemos comprado un Seat Arona TGI (GNC), desde que entré en el concesionario sentí la sensación, que allí encontraría el coche que estábamos buscando, ajustado a nuestro presupuesto en relación CALIDAD y PRECIO. En un principio, sólo queríamos mirar coches, y al final salimos comprando uno. Igualmente , muy agradecidos por la atención de sus vendedores, en especial con JORGE , que ha estado muy pendiente tanto en la venta como en la postventa del coche , y por estás razones de gran peso cuando se adquiere un coche recomiendo este concesionario al 💯 por cien ."
    },
    {
      name: "Alexander Gonzalez",
      review: "Hace poco compré un BMW X1 híbrido enchufable completamente online en ACIEROTOCAR LUXURY, mi experiencia fue muy satisfactoria fue atendido por JORGE, quien en todo momento fue muy cordial correcto y me brindó todas las fotografías, vídeos y documentación para poder comprar el coche con absoluta tranquilidad y transparencia hicimos nuestras transacciones de manera que las Las dos partes hiciéramos el negocio lo más satisfactorio para ambas partes Mi coche fue entregado en Almería capital Tal y como me lo prometieron y en el tiempo que habíamos acordado. Recomiendo a ACIERTOCAR a cualquier persona que quiera comprar su coche a larga distancia, con total confianza y tranquilidad, lo he recomendado amigos y familiares para que lo tengan en cuenta, cuando tome la decisión de comprar o cambiar su coche."
    },
    {
      name: "Alberto de la Puente",
      review: "Nos ha tratado fenomenal, el coche que hemos comprado estaba como nuevo y tenía un precio muy competitivo. Volveremos a trabajar con ellos."
    }
  ];

  return (
    <section className="py-16 px-4 bg-muted">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Lo que dicen nuestros clientes de nosotros
          </h2>
          
          {/* Google Rating Display */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <a 
                href="https://www.google.com/maps?cid=11476981079179398744"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src={googleLogo}
                  alt="Google"
                  className="w-6 h-6"
                />
              </a>
              <div className="w-px h-6 bg-border"></div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-foreground">4.9</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover-scale h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-semibold text-sm">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{review.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        "{review.review}"
                      </p>
                      <p className="text-xs text-muted-foreground mt-3 font-medium">
                        Reseña de Google
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-background border-border shadow-md hover:bg-accent" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-background border-border shadow-md hover:bg-accent" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;