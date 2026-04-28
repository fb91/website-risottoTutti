import { getContent } from "@/lib/kv";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const revalidate = 60; // Revalidar contenido cada 60 segundos

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero content={content} />
        <About content={content} />
        <Services content={content} />
        <Reviews content={content} />
        <Location content={content} />
        <Contact content={content} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
