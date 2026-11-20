import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const safeFilename = path.basename(filename);

  const searchPaths = [
    path.resolve(process.cwd(), 'public', 'uploads', safeFilename),
    path.resolve(process.cwd(), '..', 'web', 'public', 'uploads', safeFilename),
    path.resolve('C:\\Users\\Raihan\\ECOBAZAR\\apps\\web\\public\\uploads', safeFilename),
    path.resolve('C:\\Users\\Raihan\\ECOBAZAR\\apps\\admin\\public\\uploads', safeFilename),
  ];

  for (const filePath of searchPaths) {
    if (fs.existsSync(filePath)) {
      const ext = path.extname(safeFilename).toLowerCase();
      const mimeTypes: Record<string, string> = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.gif': 'image/gif',
        '.avif': 'image/avif',
      };
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      const fileBuffer = fs.readFileSync(filePath);

      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }
  }

  return NextResponse.json({ error: 'File not found' }, { status: 404 });
}
