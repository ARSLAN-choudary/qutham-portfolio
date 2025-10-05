import { FeaturedEvents } from "./components/FeaturedEvents";
import { Header } from "./components/Header";
import StickyTextParallax from "./components/StickyTextParallax/StickyTextParallax";

export default function Home() {
  return (
    <>
      <Header />
      <FeaturedEvents />
      <StickyTextParallax />
    </>
  );
}
