export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative h-[600px] w-full overflow-hidden bg-neutral-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="z-10 max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl md:text-7xl">
              Exquisite Jewellery Collection
            </h1>
            <p className="mb-8 text-lg text-neutral-600 sm:text-xl">
              Discover timeless elegance and contemporary designs
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="/products"
                className="rounded-md bg-neutral-900 px-8 py-3 text-white transition hover:bg-neutral-800"
              >
                Shop Now
              </a>
              <a
                href="/products?featured=true"
                className="rounded-md border border-neutral-300 bg-white px-8 py-3 text-neutral-900 transition hover:bg-neutral-50"
              >
                View Featured
              </a>
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
            {['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((category) => (
              <a
                key={category}
                href={`/products?category=${category.toLowerCase()}`}
                className="group relative h-64 overflow-hidden rounded-lg bg-neutral-200"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-semibold text-neutral-900 transition group-hover:scale-110">
                    {category}
                  </h3>
                </div>
              </a>
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
              <div className="mb-4 text-4xl">💎</div>
              <h3 className="mb-2 text-xl font-semibold">Premium Quality</h3>
              <p className="text-neutral-600">
                Handcrafted with the finest materials and attention to detail
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-4xl">🚚</div>
              <h3 className="mb-2 text-xl font-semibold">Free Shipping</h3>
              <p className="text-neutral-600">
                Complimentary shipping on all orders over $100
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-4xl">🔒</div>
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