import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Security: Whitelist allowed file extensions & enforce maximum upload size
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB limit

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    // 1. Handle multipart/form-data file upload
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }

      const ext = path.extname(file.name).toLowerCase() || '.jpg';
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        return NextResponse.json(
          { error: 'Security violation: Only image files (.jpg, .png, .webp, .svg, .gif) are allowed' },
          { status: 403 }
        );
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: 'Security violation: File exceeds 5MB maximum limit' },
          { status: 413 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
      const filename = `${cleanBase}-${Date.now().toString(36)}${ext}`;

      // Save to both web and admin public/uploads directories
      const uploadDirs = [
        path.resolve(process.cwd(), '..', 'web', 'public', 'uploads'),
        path.resolve(process.cwd(), 'public', 'uploads'),
        'C:\\Users\\Raihan\\ECOBAZAR\\apps\\web\\public\\uploads',
        'C:\\Users\\Raihan\\ECOBAZAR\\apps\\admin\\public\\uploads',
      ];

      for (const dir of uploadDirs) {
        try {
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          fs.writeFileSync(path.join(dir, filename), buffer);
        } catch (e) {
          // ignore directory errors if some paths don't match
        }
      }

      const publicUrl = `/uploads/${filename}`;
      return NextResponse.json({ success: true, url: publicUrl, filename });
    }

    // 2. Handle base64 JSON payload
    const body = await req.json();
    if (body.base64 && body.filename) {
      const ext = path.extname(body.filename).toLowerCase() || '.jpg';
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        return NextResponse.json(
          { error: 'Security violation: Only image files (.jpg, .png, .webp, .svg, .gif) are allowed' },
          { status: 403 }
        );
      }

      const base64Data = body.base64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      if (buffer.length > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: 'Security violation: File exceeds 5MB maximum limit' },
          { status: 413 }
        );
      }

      const cleanBase = path.basename(body.filename, ext).replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
      const filename = `${cleanBase}-${Date.now().toString(36)}${ext}`;

      const uploadDirs = [
        path.resolve(process.cwd(), '..', 'web', 'public', 'uploads'),
        path.resolve(process.cwd(), 'public', 'uploads'),
        'C:\\Users\\Raihan\\ECOBAZAR\\apps\\web\\public\\uploads',
        'C:\\Users\\Raihan\\ECOBAZAR\\apps\\admin\\public\\uploads',
      ];

      for (const dir of uploadDirs) {
        try {
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          fs.writeFileSync(path.join(dir, filename), buffer);
        } catch (e) {
          // continue
        }
      }

      const publicUrl = `/uploads/${filename}`;
      return NextResponse.json({ success: true, url: publicUrl, filename });
    }

    return NextResponse.json({ error: 'Unsupported upload format' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
