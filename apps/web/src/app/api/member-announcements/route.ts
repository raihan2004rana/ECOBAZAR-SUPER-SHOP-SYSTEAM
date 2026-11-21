import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getAnnouncementsPath(): string {
  const candidates = [
    path.resolve(process.cwd(), 'src', 'data', 'member-announcements.json'),
    path.resolve(process.cwd(), 'apps', 'web', 'src', 'data', 'member-announcements.json'),
    path.resolve(process.cwd(), '..', 'web', 'src', 'data', 'member-announcements.json'),
    'C:\\Users\\Raihan\\ECOBAZAR\\apps\\web\\src\\data\\member-announcements.json',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

function readData() {
  const p = getAnnouncementsPath();
  if (!fs.existsSync(p)) {
    return { version: '1.0.0', lastUpdated: new Date().toISOString(), announcements: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
  } catch {
    return { version: '1.0.0', lastUpdated: new Date().toISOString(), announcements: [] };
  }
}

function writeData(data: any) {
  const p = getAnnouncementsPath();
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(req: NextRequest) {
  try {
    const data = readData();
    const url = new URL(req.url);
    const tier = url.searchParams.get('tier');
    const customerId = url.searchParams.get('customerId');

    let list = data.announcements || [];

    if (tier || customerId) {
      list = list.filter((item: any) => {
        // Universal announcements for everyone
        if (item.targetTier === 'ALL') return true;
        // Targeted tier match
        if (tier && item.targetTier === tier) return true;
        // Targeted specific customer match
        if (customerId && item.targetCustomerId === customerId) return true;
        return false;
      });
    }

    return NextResponse.json({
      success: true,
      announcements: list,
      totalCount: list.length,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = readData();
    data.announcements = data.announcements || [];

    const newAnnouncement = {
      id: body.id || `ann-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      targetTier: body.targetTier || 'ALL',
      targetCustomerId: body.targetCustomerId || null,
      targetCustomerName: body.targetCustomerName || (body.targetTier ? `${body.targetTier} Members` : 'All Customers'),
      type: body.type || 'PROMO_COUPON',
      title: body.title || 'Special Member Offer',
      titleBn: body.titleBn || body.title || 'বিশেষ মেম্বার অফার',
      message: body.message || '',
      couponCode: body.couponCode ? body.couponCode.trim().toUpperCase() : undefined,
      discountPercent: body.discountPercent ? Number(body.discountPercent) : undefined,
      discountFlat: body.discountFlat ? Number(body.discountFlat) : undefined,
      minSpend: body.minSpend ? Number(body.minSpend) : 0,
      validUntil: body.validUntil || '7 Days',
      relatedProductId: body.relatedProductId || undefined,
      relatedProductName: body.relatedProductName || undefined,
      relatedProductPrice: body.relatedProductPrice ? Number(body.relatedProductPrice) : undefined,
      relatedProductImage: body.relatedProductImage || undefined,
      branch: body.branch || 'All Branches',
      priority: body.priority || 'MEDIUM',
      createdAt: new Date().toISOString(),
    };

    data.announcements.unshift(newAnnouncement);
    writeData(data);

    return NextResponse.json({
      success: true,
      message: 'Announcement broadcasted successfully to targeted member profiles.',
      announcement: newAnnouncement,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing announcement id' }, { status: 400 });
    }

    const data = readData();
    data.announcements = (data.announcements || []).filter((a: any) => a.id !== id);
    writeData(data);

    return NextResponse.json({
      success: true,
      message: 'Announcement deleted successfully.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
