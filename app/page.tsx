import { FeaturedEvents } from "./components/FeaturedEvents";
import { Header } from "./components/Header";
import HeroSlider from "./components/heroslider/HeroSlider";
import StickyTextParallax from "./components/StickyTextParallax/StickyTextParallax";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSlider/>
      <FeaturedEvents />
      <StickyTextParallax />
    </>
  );
}
