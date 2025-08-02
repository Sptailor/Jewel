import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug: slug,
      },
      include: {
        category: true,
        images: {
          orderBy: { order: 'asc' },
        },
        variants: {
          orderBy: { price: 'asc' },
        },
        reviews: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Calculate average rating
    const avgRating =
      product.reviews.length > 0
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
          product.reviews.length
        : 0;

    // Get related products
    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
        status: 'ACTIVE',
      },
      include: {
        images: {
          orderBy: { order: 'asc' },
          take: 1,
        },
        category: true,
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      take: 4,
    });

    const relatedWithRating = await Promise.all(
      relatedProducts.map(async (p) => {
        const reviews = await prisma.review.findMany({
          where: { productId: p.id },
          select: { rating: true },
        });
        const rating =
          reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;
        return { ...p, avgRating: Math.round(rating * 10) / 10 };
      })
    );

    return NextResponse.json({
      ...product,
      avgRating: Math.round(avgRating * 10) / 10,
      relatedProducts: relatedWithRating,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}