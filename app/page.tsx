import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedCarousel } from '@/components/home/FeaturedCarousel';
import { TrustBadges } from '@/components/home/TrustBadges';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroBanner />
      <TrustBadges />
      <FeaturedCarousel />
      <CategoryGrid />
    </div>
  );
}
