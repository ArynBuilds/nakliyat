import { HomeHero } from "@/components/home/hero";
import { StatSlab } from "@/components/home/stat-slab";
import { ServicesGrid } from "@/components/home/services-grid";
import { LiveActivityFeed } from "@/components/home/live-activity-feed";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { FleetCarousel } from "@/components/home/fleet-carousel";
import { TestimonialMarquee } from "@/components/home/testimonial-marquee";
import { InstagramGrid } from "@/components/home/instagram-grid";
import { TrustStrip } from "@/components/home/trust-strip";
import { FinalCta } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StatSlab />
      <ServicesGrid />
      <LiveActivityFeed />
      <ProcessTimeline />
      <FleetCarousel />
      <TestimonialMarquee />
      <InstagramGrid />
      <TrustStrip />
      <FinalCta />
    </>
  );
}
