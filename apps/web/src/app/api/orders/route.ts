import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendOrderConfirmationEmail } from '../../../lib/email-service';

function getOrdersPath(): string {
  const candidates = [
    path.resolve(process.cwd(), 'src', 'data', 'live-orders.json'),
    path.resolve(process.cwd(), 'apps', 'web', 'src', 'data', 'live-orders.json'),
    path.resolve(process.cwd(), '..', 'web', 'src', 'data', 'live-orders.json'),
    'C:\\Users\\Raihan\\ECOBAZAR\\apps\\web\\src\\data\\live-orders.json',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

function getCatalogPath(): string {
  const candidates = [
    path.resolve(process.cwd(), 'src', 'data', 'live-catalog.json'),
    path.resolve(process.cwd(), 'apps', 'web', 'src', 'data', 'live-catalog.json'),
    path.resolve(process.cwd(), '..', 'web', 'src', 'data', 'live-catalog.json'),
    'C:\\Users\\Raihan\\ECOBAZAR\\apps\\web\\src\\data\\live-catalog.json',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

function readOrders() {
  const p = getOrdersPath();
  if (!fs.existsSync(p)) {
    return { version: '1.0.0', lastUpdated: new Date().toISOString(), orders: [] };
  }
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function writeOrders(data: any) {
  const p = getOrdersPath();
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
}

function readCatalog() {
  const p = getCatalogPath();
  if (!fs.existsSync(p)) return { products: [] };
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function writeCatalog(data: any) {
  const p = getCatalogPath();
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
}

// GET: Returns orders and computed live product sales statistics
export async function GET() {
  try {
    const ordersData = readOrders();
    const catalogData = readCatalog();
    const orders = ordersData.orders || [];
    const products = catalogData.products || [];

    // Calculate aggregated sales per product from all orders
    const salesMap: Record<string, { totalSold: number; totalRevenue: number; orderCount: number }> = {};
    let grandRevenue = 0;
    let grandUnits = 0;

    for (const order of orders) {
      if (!Array.isArray(order.items)) continue;
      grandRevenue += Number(order.grandTotal) || 0;
      for (const item of order.items) {
        const pid = item.productId || item.id;
        if (!pid) continue;
        const qty = Number(item.quantity) || 1;
        const total = Number(item.total) || (Number(item.price) || 0) * qty;
        grandUnits += qty;

        if (!salesMap[pid]) {
          salesMap[pid] = { totalSold: 0, totalRevenue: 0, orderCount: 0 };
        }
        salesMap[pid].totalSold += qty;
        salesMap[pid].totalRevenue += total;
        salesMap[pid].orderCount += 1;
      }
    }

    // Merge product catalog items with their live sales
    const enrichedProducts = products.map((prod: any) => {
      const stats = salesMap[prod.id] || { totalSold: 0, totalRevenue: 0, orderCount: 0 };
      const explicitSold = Number(prod.totalSold) || 0;
      const explicitRev = Number(prod.totalRevenue) || 0;
      const combinedSold = Math.max(stats.totalSold, explicitSold);
      const combinedRev = Math.max(stats.totalRevenue, explicitRev || (combinedSold * (prod.price || 0)));

      return {
        ...prod,
        totalSold: combinedSold,
        totalRevenue: combinedRev,
        orderCount: stats.orderCount,
      };
    });

    // Determine top selling product of today
    const sortedBySales = [...enrichedProducts].sort((a, b) => (b.totalSold || 0) - (a.totalSold || 0));
    const topSellingProduct = sortedBySales[0] || null;

    return NextResponse.json({
      success: true,
      lastUpdated: ordersData.lastUpdated,
      orders,
      totalOrders: orders.length,
      grandRevenue,
      grandUnits,
      topSellingProduct,
      productsWithSales: enrichedProducts,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Place new order from storefront
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ordersData = readOrders();
    const catalogData = readCatalog();

    const orderId = body.orderId || `ECO-DH-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();

    const newOrder = {
      id: orderId,
      placedAt: now.toISOString(),
      formattedTime: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      formattedDate: `Today, ${now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`,
      customerName: body.customerName || 'Anonymous Customer',
      customerEmail: body.customerEmail || '',
      customerPhone: body.customerPhone || '',
      deliveryAddress: body.deliveryAddress || '',
      deliveryTimeSlot: body.deliveryTimeSlot || 'Express Delivery (25-30 Mins)',
      paymentMethod: body.paymentMethod || 'cod',
      branch: body.branch || 'Gulshan-2 Superstore #02',
      status: 'PROCESSING',
      subtotal: Number(body.subtotal) || 0,
      deliveryFee: Number(body.deliveryFee) || 0,
      discountAmount: Number(body.discountAmount) || 0,
      grandTotal: Number(body.grandTotal) || 0,
      trackingId: orderId,
      items: Array.isArray(body.items) ? body.items : [],
    };

    // 1. Prepend order to live-orders.json
    ordersData.orders.unshift(newOrder);
    writeOrders(ordersData);

    // 2. Decrement stock and increment totalSold & totalRevenue in live-catalog.json
    let catalogModified = false;
    for (const item of newOrder.items) {
      const pid = item.productId || item.id;
      if (!pid) continue;
      const qty = Number(item.quantity) || 1;
      const lineTotal = Number(item.total) || (Number(item.price) || 0) * qty;

      const prod = catalogData.products?.find((p: any) => p.id === pid);
      if (prod) {
        prod.stock = Math.max(0, (Number(prod.stock) || 0) - qty);
        prod.totalSold = (Number(prod.totalSold) || 0) + qty;
        prod.totalRevenue = (Number(prod.totalRevenue) || 0) + lineTotal;
        catalogModified = true;
      }
    }

    if (catalogModified) {
      writeCatalog(catalogData);
    }

    // 3. Dispatch detailed invoice & confirmation email to customer
    if (newOrder.customerEmail) {
      try {
        await sendOrderConfirmationEmail({
          orderId: newOrder.id,
          customerName: newOrder.customerName,
          customerEmail: newOrder.customerEmail,
          customerPhone: newOrder.customerPhone,
          deliveryAddress: newOrder.deliveryAddress,
          deliveryTimeSlot: newOrder.deliveryTimeSlot,
          branch: newOrder.branch,
          paymentMethod: newOrder.paymentMethod,
          items: newOrder.items,
          subtotal: newOrder.subtotal,
          deliveryFee: newOrder.deliveryFee,
          discountAmount: newOrder.discountAmount,
          grandTotal: newOrder.grandTotal,
          placedAt: newOrder.formattedTime,
        });
      } catch (emailErr) {
        console.error('[OrdersAPI] Error sending order confirmation email:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      order: newOrder,
      trackingId: orderId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT / PATCH: Update order status (from Admin Dashboard, e.g. mark as DELIVERED or RIDER_ASSIGNED)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, status } = body;
    if (!orderId || !status) {
      return NextResponse.json({ error: 'orderId and status required' }, { status: 400 });
    }

    const ordersData = readOrders();
    const order = ordersData.orders.find((o: any) => o.id === orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    order.status = status;
    writeOrders(ordersData);

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
