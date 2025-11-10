import { Gem, Heart, Shield, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
          About LuxJewels
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-neutral-600">
          Crafting timeless elegance and celebrating life's precious moments since our founding
        </p>
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-neutral-900">Our Story</h2>
            <div className="space-y-4 text-neutral-600">
              <p>
                LuxJewels was born from a passion for creating extraordinary pieces that tell
                unique stories. We believe that jewelry is more than just an accessory—it's a
                celebration of life's most meaningful moments.
              </p>
              <p>
                Every piece in our collection is carefully curated to reflect the perfect balance
                of traditional craftsmanship and contemporary design. Our artisans bring decades
                of experience, ensuring each creation meets the highest standards of quality and beauty.
              </p>
              <p>
                From engagement rings that symbolize eternal love to statement necklaces that
                capture individual style, we're dedicated to helping you find jewelry that
                resonates with your personal journey.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop"
              alt="Chicago skyline at sunset"
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-neutral-900">Our Values</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900">
              <Gem className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-neutral-900">Quality</h3>
            <p className="text-sm text-neutral-600">
              We source only the finest materials and gemstones, ensuring exceptional quality in every piece.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-neutral-900">Passion</h3>
            <p className="text-sm text-neutral-600">
              Our love for jewelry design drives us to create pieces that inspire and delight.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-neutral-900">Trust</h3>
            <p className="text-sm text-neutral-600">
              We build lasting relationships with our customers through transparency and integrity.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-neutral-900">Excellence</h3>
            <p className="text-sm text-neutral-600">
              Every detail matters. We strive for perfection in craftsmanship and customer service.
            </p>
          </div>
        </div>
      </div>

      {/* Craftsmanship */}
      <div className="mb-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop"
                alt="Jeweler crafting fine jewelry"
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="mb-4 text-3xl font-bold text-neutral-900">Expert Craftsmanship</h2>
            <div className="space-y-4 text-neutral-600">
              <p>
                Our master jewelers combine time-honored techniques with innovative design
                approaches to create pieces that stand the test of time. Each item undergoes
                rigorous quality control to ensure it meets our exacting standards.
              </p>
              <p>
                We work with ethically sourced precious metals and certified gemstones,
                supporting sustainable practices throughout our supply chain. Your jewelry
                is not just beautiful—it's responsibly made.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Promise */}
      <div className="rounded-lg bg-neutral-900 px-8 py-12 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">Our Promise to You</h2>
        <p className="mx-auto max-w-3xl text-lg text-neutral-300">
          At LuxJewels, we're committed to providing an exceptional experience from browsing
          to purchase and beyond. Every piece comes with our quality guarantee, free shipping,
          and expert customer support to ensure your complete satisfaction.
        </p>
      </div>
    </div>
  );
}
