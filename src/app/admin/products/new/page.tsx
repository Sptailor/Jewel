'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Loader2 } from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      sku: formData.get('sku'),
      price: parseFloat(formData.get('price') as string),
      comparePrice: formData.get('comparePrice') ? parseFloat(formData.get('comparePrice') as string) : null,
      categoryId: formData.get('categoryId'),
      status: formData.get('status'),
      featured: formData.get('featured') === 'on',
      imageUrl: formData.get('imageUrl'),
      variantName: formData.get('variantName'),
      variantSku: formData.get('variantSku'),
      variantPrice: parseFloat(formData.get('variantPrice') as string),
      variantStock: parseInt(formData.get('variantStock') as string),
    };

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to create product');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/products"
        className="mb-6 inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to products
      </Link>

      <h1 className="mb-8 text-3xl font-bold">Add New Product</h1>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border bg-white p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-neutral-700">
              Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              required
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              placeholder="product-name"
            />
          </div>

          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-neutral-700">
              SKU
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              required
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            />
          </div>

          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-neutral-700">
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              required
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            >
              <option value="">Select a category</option>
              <option value="clze2m1z20000vkv4u9x7f9qr">Rings</option>
              <option value="clze2m1z20001vkv4j8m5k3lp">Necklaces</option>
              <option value="clze2m1z20002vkv4n6t9r5qw">Earrings</option>
              <option value="clze2m1z20003vkv4p2w8s7xy">Bracelets</option>
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-neutral-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              required
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            />
          </div>

          <div>
            <label htmlFor="comparePrice" className="block text-sm font-medium text-neutral-700">
              Compare Price (Optional)
            </label>
            <input
              type="number"
              id="comparePrice"
              name="comparePrice"
              step="0.01"
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-neutral-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-neutral-700">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            required
            className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <div className="border-t pt-6">
          <h3 className="mb-4 text-lg font-medium">Default Variant</h3>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="variantName" className="block text-sm font-medium text-neutral-700">
                Variant Name
              </label>
              <input
                type="text"
                id="variantName"
                name="variantName"
                required
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                placeholder="Default"
              />
            </div>

            <div>
              <label htmlFor="variantSku" className="block text-sm font-medium text-neutral-700">
                Variant SKU
              </label>
              <input
                type="text"
                id="variantSku"
                name="variantSku"
                required
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              />
            </div>

            <div>
              <label htmlFor="variantPrice" className="block text-sm font-medium text-neutral-700">
                Variant Price
              </label>
              <input
                type="number"
                id="variantPrice"
                name="variantPrice"
                step="0.01"
                required
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              />
            </div>

            <div>
              <label htmlFor="variantStock" className="block text-sm font-medium text-neutral-700">
                Stock
              </label>
              <input
                type="number"
                id="variantStock"
                name="variantStock"
                required
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-neutral-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="OUT_OF_STOCK">Out of Stock</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-500"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-neutral-700">
              Featured Product
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t pt-6">
          <Link
            href="/admin/products"
            className="rounded-md border px-4 py-2 hover:bg-neutral-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}