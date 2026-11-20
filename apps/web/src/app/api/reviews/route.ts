import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getReviewsPath(): string {
  const candidates = [
    path.resolve(process.cwd(), 'src', 'data', 'live-reviews.json'),
    path.resolve(process.cwd(), 'apps', 'web', 'src', 'data', 'live-reviews.json'),
    path.resolve(process.cwd(), '..', 'web', 'src', 'data', 'live-reviews.json'),
    'C:\\Users\\Raihan\\ECOBAZAR\\apps\\web\\src\\data\\live-reviews.json',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

function readReviews() {
  const p = getReviewsPath();
  if (!fs.existsSync(p)) return { version: '1.0.0', lastUpdated: new Date().toISOString(), reviews: [] };
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function writeReviews(data: any) {
  const p = getReviewsPath();
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const data = readReviews();
    const reviews = data.reviews || [];
    const badReviews = reviews.filter((r: any) => Number(r.rating) <= 3);
    const goodReviews = reviews.filter((r: any) => Number(r.rating) >= 4);

    return NextResponse.json({
      success: true,
      lastUpdated: data.lastUpdated,
      reviews,
      badReviews,
      badReviewsCount: badReviews.length,
      goodReviewsCount: goodReviews.length,
      totalReviews: reviews.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = readReviews();
    const now = new Date();

    const rating = Number(body.rating) || 5;
    const isBad = rating <= 3;

    const newRev = {
      id: `rev-${Date.now()}`,
      productId: body.productId || '',
      productName: body.productName || 'General Product',
      productImage: body.productImage || '',
      author: body.author || 'Verified Customer',
      phone: body.phone || '',
      location: body.location || 'Dhaka',
      rating,
      date: `Today, ${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`,
      comment: body.comment || '',
      category: body.category || '',
      severity: rating <= 2 ? 'CRITICAL' : rating === 3 ? 'WARNING' : 'POSITIVE',
      status: isBad ? 'UNRESOLVED' : 'RESOLVED',
    };

    data.reviews.unshift(newRev);
    writeReviews(data);

    return NextResponse.json({ success: true, review: newRev });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
