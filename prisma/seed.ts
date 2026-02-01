import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  console.log('Clearing existing data...');
  await prisma.review.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.shippingAddress.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Existing data cleared.');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@luxjewels.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      emailVerified: new Date() // sets it to the current date/time

    },
  });

  // Create test customer
  const customerPassword = await bcrypt.hash('customer123', 10);
  const customer = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'CUSTOMER',
     emailVerified: new Date() // sets it to the current date/time

    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Rings',
        slug: 'rings',
        description: 'Beautiful rings for every occasion',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Necklaces',
        slug: 'necklaces',
        description: 'Elegant necklaces and pendants',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Earrings',
        slug: 'earrings',
        description: 'Stunning earrings for all styles',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Bracelets',
        slug: 'bracelets',
        description: 'Exquisite bracelets and bangles',
      },
    }),
  ]);

  // Create products
  const products = [
    // Rings
    {
      name: 'Diamond Solitaire Ring',
      slug: 'diamond-solitaire-ring',
      description: 'Classic 1-carat diamond solitaire ring in 18k white gold. A timeless symbol of elegance.',
      sku: 'RING-001',
      price: 4999.99,
      comparePrice: 5999.99,
      categoryId: categories[0].id,
      status: 'ACTIVE' as const,
      featured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop', alt: 'Diamond Solitaire Ring', order: 0 },
        { url: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=800&h=800&fit=crop', alt: 'Diamond Solitaire Ring Side View', order: 1 },
      ],
      variants: [
        { name: 'Size 5', sku: 'RING-001-5', price: 4999.99, stock: 3, attributes: { size: '5' } },
        { name: 'Size 6', sku: 'RING-001-6', price: 4999.99, stock: 5, attributes: { size: '6' } },
        { name: 'Size 7', sku: 'RING-001-7', price: 4999.99, stock: 4, attributes: { size: '7' } },
        { name: 'Size 8', sku: 'RING-001-8', price: 4999.99, stock: 2, attributes: { size: '8' } },
      ],
    },
    {
      name: 'Sapphire and Diamond Ring',
      slug: 'sapphire-diamond-ring',
      description: 'Stunning blue sapphire surrounded by diamonds in 14k yellow gold.',
      sku: 'RING-002',
      price: 2999.99,
      comparePrice: 3499.99,
      categoryId: categories[0].id,
      status: 'ACTIVE' as const,
      featured: false,
      images: [
        { url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop', alt: 'Sapphire and Diamond Ring', order: 0 },
      ],
      variants: [
        { name: 'Size 5', sku: 'RING-002-5', price: 2999.99, stock: 2, attributes: { size: '5' } },
        { name: 'Size 6', sku: 'RING-002-6', price: 2999.99, stock: 3, attributes: { size: '6' } },
        { name: 'Size 7', sku: 'RING-002-7', price: 2999.99, stock: 4, attributes: { size: '7' } },
      ],
    },
    {
      name: 'Rose Gold Band',
      slug: 'rose-gold-band',
      description: 'Simple and elegant rose gold wedding band, 4mm width.',
      sku: 'RING-003',
      price: 799.99,
      categoryId: categories[0].id,
      status: 'ACTIVE' as const,
      featured: false,
      images: [
        { url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop', alt: 'Rose Gold Band', order: 0 },
      ],
      variants: [
        { name: 'Size 6', sku: 'RING-003-6', price: 799.99, stock: 10, attributes: { size: '6' } },
        { name: 'Size 7', sku: 'RING-003-7', price: 799.99, stock: 8, attributes: { size: '7' } },
        { name: 'Size 8', sku: 'RING-003-8', price: 799.99, stock: 6, attributes: { size: '8' } },
        { name: 'Size 9', sku: 'RING-003-9', price: 799.99, stock: 5, attributes: { size: '9' } },
      ],
    },

    // Necklaces
    {
      name: 'Pearl Strand Necklace',
      slug: 'pearl-strand-necklace',
      description: 'Classic freshwater pearl necklace with 14k gold clasp. Length: 18 inches.',
      sku: 'NECK-001',
      price: 1299.99,
      comparePrice: 1599.99,
      categoryId: categories[1].id,
      status: 'ACTIVE' as const,
      featured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop', alt: 'Pearl Strand Necklace', order: 0 },
      ],
      variants: [
        { name: '16 inch', sku: 'NECK-001-16', price: 1199.99, stock: 4, attributes: { length: '16"' } },
        { name: '18 inch', sku: 'NECK-001-18', price: 1299.99, stock: 6, attributes: { length: '18"' } },
        { name: '20 inch', sku: 'NECK-001-20', price: 1399.99, stock: 3, attributes: { length: '20"' } },
      ],
    },
    {
      name: 'Diamond Tennis Necklace',
      slug: 'diamond-tennis-necklace',
      description: '5 carat total weight diamond tennis necklace in 18k white gold.',
      sku: 'NECK-002',
      price: 8999.99,
      categoryId: categories[1].id,
      status: 'ACTIVE' as const,
      featured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop', alt: 'Diamond Tennis Necklace', order: 0 },
      ],
      variants: [
        { name: 'Standard', sku: 'NECK-002-STD', price: 8999.99, stock: 2, attributes: {} },
      ],
    },
    {
      name: 'Gold Pendant Necklace',
      slug: 'gold-pendant-necklace',
      description: 'Delicate pendant necklace in 14k yellow gold with adjustable chain.',
      sku: 'NECK-003',
      price: 499.99,
      categoryId: categories[1].id,
      status: 'ACTIVE' as const,
      featured: false,
      images: [
        { url: 'https://images.unsplash.com/photo-u1DhoJNcmqM?w=800&h=800&fit=crop', alt: 'Gold Pendant Necklace', order: 0 },
      ],
      variants: [
        { name: 'Standard', sku: 'NECK-003-STD', price: 499.99, stock: 15, attributes: {} },
      ],
    },

    // Earrings
    {
      name: 'Diamond Stud Earrings',
      slug: 'diamond-stud-earrings',
      description: '1 carat total weight diamond studs in 14k white gold.',
      sku: 'EAR-001',
      price: 1999.99,
      comparePrice: 2499.99,
      categoryId: categories[2].id,
      status: 'ACTIVE' as const,
      featured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop', alt: 'Diamond Stud Earrings', order: 0 },
      ],
      variants: [
        { name: '0.5 ct tw', sku: 'EAR-001-05', price: 999.99, stock: 8, attributes: { carats: '0.5' } },
        { name: '1.0 ct tw', sku: 'EAR-001-10', price: 1999.99, stock: 5, attributes: { carats: '1.0' } },
        { name: '2.0 ct tw', sku: 'EAR-001-20', price: 3999.99, stock: 2, attributes: { carats: '2.0' } },
      ],
    },
    {
      name: 'Pearl Drop Earrings',
      slug: 'pearl-drop-earrings',
      description: 'Elegant freshwater pearl drop earrings with sterling silver hooks.',
      sku: 'EAR-002',
      price: 299.99,
      categoryId: categories[2].id,
      status: 'ACTIVE' as const,
      featured: false,
      images: [
        { url: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=800&h=800&fit=crop', alt: 'Pearl Drop Earrings', order: 0 },
      ],
      variants: [
        { name: 'Standard', sku: 'EAR-002-STD', price: 299.99, stock: 12, attributes: {} },
      ],
    },
    {
      name: 'Gold Hoop Earrings',
      slug: 'gold-hoop-earrings',
      description: 'Classic gold hoop earrings in 14k yellow gold, 30mm diameter.',
      sku: 'EAR-003',
      price: 599.99,
      categoryId: categories[2].id,
      status: 'ACTIVE' as const,
      featured: false,
      images: [
        { url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop', alt: 'Gold Hoop Earrings', order: 0 },
      ],
      variants: [
        { name: '20mm', sku: 'EAR-003-20', price: 399.99, stock: 10, attributes: { diameter: '20mm' } },
        { name: '30mm', sku: 'EAR-003-30', price: 599.99, stock: 8, attributes: { diameter: '30mm' } },
        { name: '40mm', sku: 'EAR-003-40', price: 799.99, stock: 6, attributes: { diameter: '40mm' } },
      ],
    },

    // Bracelets
    {
      name: 'Diamond Bracelet',
      slug: 'diamond-bracelet',
      description: '3 carat total weight diamond bracelet in 14k white gold.',
      sku: 'BRAC-001',
      price: 4999.99,
      comparePrice: 5999.99,
      categoryId: categories[3].id,
      status: 'ACTIVE' as const,
      featured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-jm4cbOKYk30?w=800&h=800&fit=crop', alt: 'Diamond Bracelet', order: 0 },
      ],
      variants: [
        { name: '6.5 inch', sku: 'BRAC-001-65', price: 4999.99, stock: 3, attributes: { length: '6.5"' } },
        { name: '7 inch', sku: 'BRAC-001-70', price: 4999.99, stock: 4, attributes: { length: '7"' } },
        { name: '7.5 inch', sku: 'BRAC-001-75', price: 4999.99, stock: 3, attributes: { length: '7.5"' } },
      ],
    },
    {
      name: 'Gold Bangle',
      slug: 'gold-bangle',
      description: 'Elegant solid gold bangle in 14k yellow gold.',
      sku: 'BRAC-002',
      price: 899.99,
      categoryId: categories[3].id,
      status: 'ACTIVE' as const,
      featured: false,
      images: [
        { url: 'https://images.unsplash.com/photo-ynts2uDw1ws?w=800&h=800&fit=crop', alt: 'Gold Bangle', order: 0 },
      ],
      variants: [
        { name: 'Small', sku: 'BRAC-002-S', price: 899.99, stock: 7, attributes: { size: 'Small' } },
        { name: 'Medium', sku: 'BRAC-002-M', price: 899.99, stock: 5, attributes: { size: 'Medium' } },
      ],
    },
    {
      name: 'Silver Cuff Bracelet',
      slug: 'silver-cuff-bracelet',
      description: 'Modern sterling silver cuff bracelet with minimalist design.',
      sku: 'BRAC-003',
      price: 349.99,
      categoryId: categories[3].id,
      status: 'ACTIVE' as const,
      featured: false,
      images: [
        { url: 'https://images.unsplash.com/photo-H3qwsFi5CDA?w=800&h=800&fit=crop', alt: 'Silver Cuff Bracelet', order: 0 },
      ],
      variants: [
        { name: 'Small', sku: 'BRAC-003-S', price: 349.99, stock: 6, attributes: { size: 'Small' } },
        { name: 'Medium', sku: 'BRAC-003-M', price: 349.99, stock: 8, attributes: { size: 'Medium' } },
        { name: 'Large', sku: 'BRAC-003-L', price: 349.99, stock: 4, attributes: { size: 'Large' } },
      ],
    },
  ];

  // Create products with images and variants
  for (const productData of products) {
    const { images, variants, ...product } = productData;
    
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        images: {
          create: images,
        },
        variants: {
          create: variants,
        },
      },
    });

    console.log(`Created product: ${createdProduct.name}`);
  }

  // Create sample reviews
  const allProducts = await prisma.product.findMany();
  const reviewComments = [
    { rating: 5, title: 'Absolutely stunning!', comment: 'The quality exceeded my expectations. Beautiful piece!' },
    { rating: 5, title: 'Perfect gift', comment: 'My wife loved it! Excellent craftsmanship.' },
    { rating: 4, title: 'Very nice', comment: 'Beautiful jewellery, though slightly smaller than expected.' },
    { rating: 5, title: 'Exceptional quality', comment: 'Worth every penny. The pictures don\'t do it justice!' },
  ];

  for (let i = 0; i < Math.min(4, allProducts.length); i++) {
    await prisma.review.create({
      data: {
        userId: customer.id,
        productId: allProducts[i].id,
        ...reviewComments[i],
        verified: true,
      },
    });
  }

  // Create customer address
  await prisma.address.create({
    data: {
      userId: customer.id,
      firstName: 'John',
      lastName: 'Doe',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
  });

  console.log('Seed completed successfully!');
  console.log('Admin login: admin@luxjewels.com / admin123');
  console.log('Customer login: customer@example.com / customer123');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });