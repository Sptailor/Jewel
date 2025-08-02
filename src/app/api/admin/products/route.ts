import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();

    // Check if SKU already exists
    const existingProduct = await prisma.product.findUnique({
      where: { sku: data.sku },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this SKU already exists' },
        { status: 400 }
      );
    }

    // Check if variant SKU already exists
    const existingVariant = await prisma.productVariant.findUnique({
      where: { sku: data.variantSku },
    });

    if (existingVariant) {
      return NextResponse.json(
        { error: 'Variant with this SKU already exists' },
        { status: 400 }
      );
    }

    // Create product with image and variant
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        sku: data.sku,
        price: data.price,
        comparePrice: data.comparePrice,
        categoryId: data.categoryId,
        status: data.status,
        featured: data.featured,
        images: {
          create: {
            url: data.imageUrl,
            alt: data.name,
            order: 0,
          },
        },
        variants: {
          create: {
            name: data.variantName,
            sku: data.variantSku,
            price: data.variantPrice,
            stock: data.variantStock,
            attributes: {},
          },
        },
      },
      include: {
        images: true,
        variants: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}