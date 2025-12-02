import Link from 'next/link';
import { Gem, Truck, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative h-[600px] w-full overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="z-10 max-w-4xl text-center px-4">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-lg">
              Exquisite Jewellery Collection
            </h1>
            <p className="mb-8 text-lg text-neutral-200 sm:text-xl drop-shadow">
              Discover timeless elegance and contemporary designs
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/products"
                className="rounded-md bg-white px-8 py-3 text-neutral-900 font-semibold transition hover:bg-neutral-100 shadow-lg"
              >
                Shop Now
              </Link>
              <Link
                href="/products?featured=true"
                className="rounded-md border-2 border-white bg-transparent px-8 py-3 text-white font-semibold transition hover:bg-white/10 backdrop-blur-sm"
              >
                View Featured
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-neutral-900">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80' },
              { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80' },
              { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80' },
              { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name.toLowerCase()}`}
                className="group relative h-64 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url('${category.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-end justify-center pb-6">
                  <h3 className="text-2xl font-semibold text-white drop-shadow-lg">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-neutral-900">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-neutral-900 p-4">
                  <Gem className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Premium Quality</h3>
              <p className="text-neutral-600">
                Handcrafted with the finest materials and attention to detail
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-neutral-900 p-4">
                  <Truck className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Free Shipping</h3>
              <p className="text-neutral-600">
                Complimentary shipping on all orders over $100
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-neutral-900 p-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure Payment</h3>
              <p className="text-neutral-600">
                Safe and encrypted transactions with multiple payment options
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}