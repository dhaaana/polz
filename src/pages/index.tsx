import Navbar from '@/components/layout/Navbar';
import LandingPageHero from '@/components/pages/home/LandingPageHero';
import Helmet from '@/components/utilities/Helmet';

export default function HomePage() {
  return (
    <>
      <Helmet />
      <Navbar />
      <main>
        <LandingPageHero />
      </main>
    </>
  );
}
