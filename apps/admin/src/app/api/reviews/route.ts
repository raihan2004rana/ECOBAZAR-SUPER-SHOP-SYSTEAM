import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getReviewsPath(): string {
  const candidates = [
    path.resolve(process.cwd(), '..', 'web', 'src', 'data', 'live-reviews.json'),
    path.resolve(process.cwd(), 'src', 'data', 'live-reviews.json'),
    path.resolve(process.cwd(), 'apps', 'web', 'src', 'data', 'live-reviews.json'),
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

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { reviewId, status } = body;
    const data = readReviews();
    const review = data.reviews.find((r: any) => r.id === reviewId);
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }
    review.status = status || 'RESOLVED';
    writeReviews(data);
    return NextResponse.json({ success: true, review });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
