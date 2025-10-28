import { FeaturedEvents } from "./components/FeaturedEvents";
import { Header } from "./components/Header";
import HeroSlider from "./components/heroslider/HeroSlider";
import StickyTextParallax from "./components/StickyTextParallax/StickyTextParallax";
import TeamCardSlider from "./components/TeamCardSlider/TeamCardSlider";

export default function Home() {
  
  return (
    <>
      <Header />
      <HeroSlider />
      <div className="h-[50px] w-full bg-[linear-gradient(180deg,hsl(0_0%_0%)_0%,hsl(77_100%_2%)_16%,hsl(73_35%_5%)_32%,hsl(74_17%_8%)_46%,hsl(77_13%_10%)_58%,hsl(77_11%_13%)_68%,hsl(77_9%_15%)_77%,hsl(77_9%_13%)_84%,hsl(77_8%_11%)_90%,hsl(77_7%_10%)_95%,hsl(75_6%_8%)_98%,hsl(75_6%_6%)_100%,hsl(0_0%_3%)_100%)]"></div>
      <FeaturedEvents />
      <StickyTextParallax />
      <TeamCardSlider/>
    </>
  );
}
