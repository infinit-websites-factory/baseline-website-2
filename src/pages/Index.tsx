import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VehicleGallery from "@/components/VehicleGallery";
import GoogleReviews from "@/components/GoogleReviews";
import Services from "@/components/Services";
import SocialMedia from "@/components/SocialMedia";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <VehicleGallery />
      <GoogleReviews />
      <Services />
      <SocialMedia />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
