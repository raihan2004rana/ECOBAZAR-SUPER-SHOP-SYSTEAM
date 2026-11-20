import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getLiveCatalogPath(): string {
  const candidates = [
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

export async function GET() {
  try {
    const data = readCatalog();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
