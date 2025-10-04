import StickyTextParallax from "../components/StickyTextParallax/StickyTextParallax";



export default function page() {
  return (
    <main className="relative min-h-[300vh] bg-gray-50">
      <div className="h-[150vh]" /> {/* just empty space for scroll */}
      <StickyTextParallax />
      <div className="h-[150vh]" />
     
    </main>
  );
}

