import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedCarousel } from '@/components/home/FeaturedCarousel';
import { TrustBadges } from '@/components/home/TrustBadges';

export function HomePage() {
  return (
    <div>
      <HeroBanner />
      <CategoryGrid />
      <FeaturedCarousel />
      <TrustBadges />
    </div>
  );
}
