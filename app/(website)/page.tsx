import HeroSection from "@/components/home/hero-section";
import AboutSection from "@/components/home/about-section";
import VividhtaSection from "@/components/home/vividhta-section";
import RecentPostSection from "@/components/home/recentpost-section";
import GallerySection from "@/components/home/gallery-section";
import TestimonialSection from "@/components/home/testimonial-section";

export default function Home() {
    return (
        <div>
            <HeroSection />
            <AboutSection />
            <VividhtaSection />
            <RecentPostSection />
            <GallerySection />
            <TestimonialSection />
        </div>
    );
}
