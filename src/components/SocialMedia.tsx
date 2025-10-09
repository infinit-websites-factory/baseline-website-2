import aciertoCarsLogo from "@/assets/acierto-cars-logo.png";

const SocialMedia = () => {
  return (
    <section className="py-16 px-4 bg-muted">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Síguenos en Redes sociales
          </h2>
          <p className="text-lg text-muted-foreground">
            Conecta con nosotros en nuestras plataformas oficiales
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* TikTok Card */}
          <a 
            target="_blank" 
            href="https://www.tiktok.com/@aciertocars?refer=creator_embed"
            className="block p-8 border border-border rounded-lg bg-background transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={aciertoCarsLogo} 
                  alt="Acierto Cars Logo" 
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">@aciertocars</h3>
              <p className="text-muted-foreground mb-4">
                Descubre nuestros vehículos premium y contenido exclusivo en TikTok
              </p>
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <p className="text-lg font-bold text-foreground">590</p>
                  <p className="text-xs text-muted-foreground">Siguiendo</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">6.1K</p>
                  <p className="text-xs text-muted-foreground">Seguidores</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">24.8K</p>
                  <p className="text-xs text-muted-foreground">Me gusta</p>
                </div>
              </div>
              <div className="px-6 py-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-full text-sm font-medium">
                Ver en TikTok
              </div>
            </div>
          </a>

          {/* Instagram Card */}
          <a 
            target="_blank" 
            href="https://www.instagram.com/aciertocars/"
            className="block p-8 border border-border rounded-lg bg-background transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={aciertoCarsLogo} 
                  alt="Acierto Cars Logo" 
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">@aciertocars</h3>
              <p className="text-muted-foreground mb-4">
                Fotos exclusivas de nuestros vehículos y eventos especiales
              </p>
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <p className="text-lg font-bold text-foreground">245</p>
                  <p className="text-xs text-muted-foreground">Publicaciones</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">3.2K</p>
                  <p className="text-xs text-muted-foreground">Seguidores</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">892</p>
                  <p className="text-xs text-muted-foreground">Siguiendo</p>
                </div>
              </div>
              <div className="px-6 py-2 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 text-white rounded-full text-sm font-medium">
                Ver en Instagram
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;