import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getLiveCatalogPath(): string {
  const candidates = [
    path.resolve(process.cwd(), '..', 'web', 'src', 'data', 'live-catalog.json'),
    path.resolve(process.cwd(), 'src', 'data', 'live-catalog.json'),
    path.resolve(process.cwd(), 'apps', 'web', 'src', 'data', 'live-catalog.json'),
    'C:\\Users\\Raihan\\ECOBAZAR\\apps\\web\\src\\data\\live-catalog.json',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

function readCatalog() {
  const filePath = getLiveCatalogPath();
  if (!fs.existsSync(filePath)) {
    throw new Error(`Catalog file not found at ${filePath}`);
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function writeCatalog(data: any) {
  const filePath = getLiveCatalogPath();
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// GET: Fetch live catalog
export async function GET() {
  try {
    const data = readCatalog();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Add new product OR update banner/category
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = readCatalog();
    const { action } = body;

    if (action === 'add-product') {
      const product = body.product;
      if (!product.id) {
        const slugPrefix = product.categorySlug ? product.categorySlug.substring(0, 3) : 'prd';
        product.id = `${slugPrefix}-${Date.now().toString(36)}`;
      }
      product.price = Number(product.price) || 0;
      product.originalPrice = product.originalPrice ? Number(product.originalPrice) : undefined;
      product.stock = Number(product.stock) || 0;
      product.rating = product.rating || 5.0;
      product.reviews = product.reviews || 1;
      
      data.products.unshift(product);
      writeCatalog(data);
      return NextResponse.json({ success: true, product, total: data.products.length });
    }

    if (action === 'update-banner') {
      if (body.heroSlides) data.heroSlides = body.heroSlides;
      if (body.topBanner) data.topBanner = body.topBanner;
      if (body.promoBanners) data.promoBanners = body.promoBanners;
      writeCatalog(data);
      return NextResponse.json({ success: true, topBanner: data.topBanner, heroSlides: data.heroSlides });
    }

    if (action === 'update-category') {
      const { category } = body;
      const index = data.categories.findIndex((c: any) => c.id === category.id || c.slug === category.slug);
      if (index !== -1) {
        data.categories[index] = { ...data.categories[index], ...category };
      } else {
        data.categories.push(category);
      }
      writeCatalog(data);
      return NextResponse.json({ success: true, category });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Update existing product OR toggle product flags
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const data = readCatalog();
    const { action } = body;

    if (action === 'update-product') {
      const { product } = body;
      const index = data.products.findIndex((p: any) => p.id === product.id);
      if (index === -1) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      data.products[index] = { ...data.products[index], ...product };
      writeCatalog(data);
      return NextResponse.json({ success: true, product: data.products[index] });
    }

    if (action === 'toggle-flag') {
      const { id, field, value } = body;
      const index = data.products.findIndex((p: any) => p.id === id);
      if (index === -1) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      data.products[index][field] = value;
      writeCatalog(data);
      return NextResponse.json({ success: true, product: data.products[index] });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove product by id
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    const data = readCatalog();
    const prevCount = data.products.length;
    data.products = data.products.filter((p: any) => p.id !== id);

    if (data.products.length === prevCount) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    writeCatalog(data);
    return NextResponse.json({ success: true, deletedId: id, total: data.products.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
