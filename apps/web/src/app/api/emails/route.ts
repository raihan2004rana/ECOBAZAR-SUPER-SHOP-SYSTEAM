import { NextRequest, NextResponse } from 'next/server';
import {
  getEmailConfig,
  saveEmailConfig,
  getSentEmails,
  sendTestEmail,
  resendLoggedEmail,
} from '../../../lib/email-service';

// GET: Returns SMTP status and sent emails outbox
export async function GET() {
  try {
    const config = getEmailConfig();
    const emails = getSentEmails();

    // Mask password before returning to client
    const safeConfig = {
      ...config,
      smtpPass: config.smtpPass ? '••••••••••••••••' : '',
      hasPassword: Boolean(config.smtpPass),
    };

    return NextResponse.json({
      success: true,
      config: safeConfig,
      emails,
      totalSent: emails.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Actions: save-config, test-smtp, resend
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'save-config') {
      const { config } = body;
      const current = getEmailConfig();
      // If client didn't supply a new password (masked), preserve the old one
      if (config.smtpPass === '••••••••••••••••' || !config.smtpPass) {
        config.smtpPass = current.smtpPass;
      }
      const saved = saveEmailConfig(config);
      return NextResponse.json({
        success: true,
        message: 'SMTP settings saved successfully.',
        config: {
          ...saved,
          smtpPass: saved.smtpPass ? '••••••••••••••••' : '',
          hasPassword: Boolean(saved.smtpPass),
        },
      });
    }

    if (action === 'test-smtp') {
      const { testEmail } = body;
      if (!testEmail || !testEmail.includes('@')) {
        return NextResponse.json({ error: 'Please enter a valid recipient email.' }, { status: 400 });
      }
      const result = await sendTestEmail(testEmail);
      return NextResponse.json(result);
    }

    if (action === 'resend') {
      const { emailId } = body;
      if (!emailId) {
        return NextResponse.json({ error: 'emailId is required.' }, { status: 400 });
      }
      const result = await resendLoggedEmail(emailId);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
