import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    const where: Prisma.ProductWhereInput = {
      status: 'ACTIVE',
    };

    if (category) {
      where.category = {
        slug: category,
      };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        images: {
          orderBy: { order: 'asc' },
          take: 1,
        },
        variants: {
          orderBy: { price: 'asc' },
          take: 1,
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy: {
        [sort]: order,
      },
    });

    // Calculate average rating for each product
    const productsWithRating = await Promise.all(
      products.map(async (product) => {
        const reviews = await prisma.review.findMany({
          where: { productId: product.id },
          select: { rating: true },
        });

        const avgRating =
          reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
            : 0;

        return {
          ...product,
          avgRating: Math.round(avgRating * 10) / 10,
        };
      })
    );

    return NextResponse.json(productsWithRating);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}