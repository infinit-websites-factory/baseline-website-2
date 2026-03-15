import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VehicleGallery from "@/components/VehicleGallery";
import GoogleReviews from "@/components/GoogleReviews";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO page="home" />
      <Header />
      <Hero />
      <VehicleGallery />
      <GoogleReviews />
      <Services />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
