import { FeaturedEvents } from "./components/FeaturedEvents";
import { Header } from "./components/Header";
import HeroSlider from "./components/heroslider/HeroSlider";
import StickyTextParallax from "./components/StickyTextParallax/StickyTextParallax";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSlider/>
      <div className=" bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#34D399]/20 h-[50px] w-full"></div>
      <FeaturedEvents />
      <StickyTextParallax />
    </>
  );
}
