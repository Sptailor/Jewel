import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">LuxJewels</h3>
            <p className="text-sm text-neutral-400">
              Exquisite jewellery for every occasion. Quality craftsmanship and timeless designs.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-neutral-400 hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=rings" className="text-neutral-400 hover:text-white">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/products?category=necklaces" className="text-neutral-400 hover:text-white">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link href="/products?category=earrings" className="text-neutral-400 hover:text-white">
                  Earrings
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Customer</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-neutral-400 hover:text-white">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-neutral-400 hover:text-white">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Connect</h4>
            <p className="mb-4 text-sm text-neutral-400">
              Subscribe to our newsletter for exclusive offers and new arrivals.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-l-md bg-neutral-800 px-4 py-2 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="rounded-r-md bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 border-t border-neutral-800 pt-8 text-center text-sm text-neutral-400">
          <p>&copy; {new Date().getFullYear()} LuxJewels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}