import SocialLinksScroll from "../components/SocialLinksScroll/SocialLinksScroll";
import StickyTextParallax from "../components/StickyTextParallax/StickyTextParallax";



export default function page() {
  return (
    <main className="relative min-h-[300vh] bg-gray-50">

      <div className="h-[150vh]" />
      <StickyTextParallax /> <SocialLinksScroll />
      <div className="h-[150vh]" />

    </main>
  );
}

