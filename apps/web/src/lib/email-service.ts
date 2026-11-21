import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export interface SmtpConfig {
  smtpHost: string;
  smtpPort: number;
  secure?: boolean;
  smtpUser: string;
  smtpPass: string;
  senderName: string;
  senderEmail: string;
  isActive: boolean;
  lastUpdated?: string;
}

export interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  deliveryAddress: string;
  deliveryTimeSlot?: string;
  branch?: string;
  paymentMethod?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    unit?: string;
    total: number;
    image?: string;
  }>;
  subtotal: number;
  deliveryFee: number;
  discountAmount?: number;
  grandTotal: number;
  placedAt?: string;
}

export interface CareerEmailData {
  applicationId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  jobTitle: string;
  branchPreference?: string;
  expectedSalary?: string;
  appliedAt?: string;
}

function getEmailConfigPath(): string {
  const candidates = [
    path.resolve(process.cwd(), 'src', 'data', 'email-config.json'),
    path.resolve(process.cwd(), 'apps', 'web', 'src', 'data', 'email-config.json'),
    path.resolve(process.cwd(), '..', 'web', 'src', 'data', 'email-config.json'),
    'C:\\Users\\Raihan\\ECOBAZAR\\apps\\web\\src\\data\\email-config.json',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

function getSentEmailsLogPath(): string {
  const candidates = [
    path.resolve(process.cwd(), 'src', 'data', 'sent-emails.json'),
    path.resolve(process.cwd(), 'apps', 'web', 'src', 'data', 'sent-emails.json'),
    path.resolve(process.cwd(), '..', 'web', 'src', 'data', 'sent-emails.json'),
    'C:\\Users\\Raihan\\ECOBAZAR\\apps\\web\\src\\data\\sent-emails.json',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

export function getEmailConfig(): SmtpConfig {
  const p = getEmailConfigPath();
  let fileConfig: Partial<SmtpConfig> = {};
  if (fs.existsSync(p)) {
    try {
      fileConfig = JSON.parse(fs.readFileSync(p, 'utf-8'));
    } catch {
      fileConfig = {};
    }
  }

  const host = fileConfig.smtpHost || process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(fileConfig.smtpPort || process.env.SMTP_PORT || 465);
  const user = fileConfig.smtpUser || process.env.SMTP_USER || '';
  const pass = fileConfig.smtpPass || process.env.SMTP_PASS || '';
  const senderEmail = fileConfig.senderEmail || user || 'orders@ecobazar.com.bd';
  const senderName = fileConfig.senderName || 'ECOBAZAR Supermarket';
  const isActive = Boolean(fileConfig.isActive !== undefined ? fileConfig.isActive : (user && pass));

  return {
    smtpHost: host,
    smtpPort: port,
    secure: port === 465,
    smtpUser: user,
    smtpPass: pass,
    senderName,
    senderEmail,
    isActive,
    lastUpdated: fileConfig.lastUpdated || new Date().toISOString(),
  };
}

export function saveEmailConfig(cfg: Partial<SmtpConfig>): SmtpConfig {
  const current = getEmailConfig();
  const updated: SmtpConfig = {
    ...current,
    ...cfg,
    lastUpdated: new Date().toISOString(),
  };
  const p = getEmailConfigPath();
  fs.writeFileSync(p, JSON.stringify(updated, null, 2), 'utf-8');
  return updated;
}

export function getSentEmails(): any[] {
  const p = getSentEmailsLogPath();
  if (!fs.existsSync(p)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
    return Array.isArray(data.emails) ? data.emails : [];
  } catch {
    return [];
  }
}

function recordSentEmail(record: any) {
  try {
    const p = getSentEmailsLogPath();
    let data: any = { version: '1.0.0', emails: [] };
    if (fs.existsSync(p)) {
      try {
        data = JSON.parse(fs.readFileSync(p, 'utf-8'));
      } catch {
        data = { version: '1.0.0', emails: [] };
      }
    }
    if (!Array.isArray(data.emails)) data.emails = [];
    
    // Check if record exists, update or unshift
    const idx = data.emails.findIndex((e: any) => e.id === record.id);
    if (idx >= 0) {
      data.emails[idx] = record;
    } else {
      data.emails.unshift(record);
    }

    if (data.emails.length > 200) data.emails = data.emails.slice(0, 200);
    fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to log sent email to sent-emails.json:', err);
  }
}

function createTransporter() {
  const config = getEmailConfig();
  if (config.isActive && config.smtpUser && config.smtpPass) {
    return nodemailer.createTransport({
      host: config.smtpHost || 'smtp.gmail.com',
      port: Number(config.smtpPort) || 465,
      secure: Number(config.smtpPort) === 465,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  return null;
}

/**
 * 1. ORDER CONFIRMATION EMAIL TO CUSTOMER
 */
export async function sendOrderConfirmationEmail(order: OrderEmailData) {
  const recipient = order.customerEmail?.trim();
  if (!recipient || !recipient.includes('@')) {
    console.warn(`[EmailService] No valid recipient email provided for order #${order.orderId}. Skipping.`);
    return { success: false, reason: 'Invalid or missing customer email' };
  }

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #E5ECE7;">
        <td style="padding: 12px 8px; vertical-align: middle;">
          <div style="font-weight: 700; color: #17251F; font-size: 14px;">${item.name}</div>
          <div style="font-size: 11px; color: #64736B;">${item.unit || 'Standard Pack'}</div>
        </td>
        <td style="padding: 12px 8px; text-align: center; color: #17251F; font-size: 13px; font-weight: 600;">
          ${item.quantity}x
        </td>
        <td style="padding: 12px 8px; text-align: right; color: #17251F; font-size: 13px; font-weight: 700;">
          ৳${item.price}
        </td>
        <td style="padding: 12px 8px; text-align: right; color: #123C2D; font-size: 14px; font-weight: 800;">
          ৳${item.total || item.price * item.quantity}
        </td>
      </tr>
    `
    )
    .join('');

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Order Confirmation #${order.orderId} - ECOBAZAR</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F7F9F5; margin: 0; padding: 24px; color: #17251F;">
    <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E5ECE7; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
      
      <!-- Brand Header -->
      <div style="background: #123C2D; padding: 28px 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff;">
          🌿 ECOBAZAR SUPERMARKET
        </h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #2EBD70; font-weight: 600;">
          Freshness in Every Choice • ১০০% প্রিমিয়াম ও ফ্রেশ গ্রোসারি
        </p>
      </div>

      <!-- Hero Message -->
      <div style="padding: 24px; background: #FAFDFB; border-bottom: 1px solid #E5ECE7;">
        <div style="display: inline-block; background: #E8F8F0; color: #123C2D; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 12px;">
          ✓ অর্ডার নিশ্চিত হয়েছে (Order Confirmed)
        </div>
        <h2 style="margin: 0 0 8px; font-size: 18px; color: #123C2D;">
          ধন্যবাদ, ${order.customerName || 'সম্মানিত গ্রাহক'}!
        </h2>
        <p style="margin: 0; font-size: 13px; color: #4B5563; line-height: 1.5;">
          আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমাদের কোল্ড-চেইন এক্সপ্রেস টিম পণ্যগুলো সর্বোচ্চ ফ্রেশনেস নিশ্চিত করে দ্রুত ডেলিভারি করার জন্য প্রস্তুত করছে।
        </p>
      </div>

      <!-- Order Metadata Bar -->
      <div style="padding: 16px 24px; background: #F2FBF6; border-bottom: 1px solid #E5ECE7; font-size: 12px; color: #2C3E35; line-height: 1.6;">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
          <div><strong>অর্ডার নং:</strong> #${order.orderId}</div>
          <div><strong>তারিখ:</strong> ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
        </div>
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; margin-top: 4px;">
          <div><strong>ফুলফিলমেন্ট ব্রাঞ্চ:</strong> ${order.branch || 'Gulshan-2 Superstore'}</div>
          <div><strong>পেমেন্ট মেথড:</strong> ${order.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'অনলাইন / বিকাশ'}</div>
        </div>
      </div>

      <!-- Items Table -->
      <div style="padding: 24px;">
        <h3 style="margin: 0 0 16px; font-size: 15px; color: #123C2D; border-bottom: 2px solid #2EBD70; padding-bottom: 8px;">
          অর্ডারের পণ্যের তালিকা (Purchased Items)
        </h3>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="background: #F8FAF7; font-size: 11px; text-transform: uppercase; color: #64736B; border-bottom: 1px solid #E5ECE7;">
              <th style="padding: 8px;">পণ্য</th>
              <th style="padding: 8px; text-align: center;">পরিমাণ</th>
              <th style="padding: 8px; text-align: right;">মূল্য</th>
              <th style="padding: 8px; text-align: right;">মোট</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <!-- Pricing Breakdown -->
        <div style="margin-top: 20px; padding: 16px; background: #F8FAF7; border-radius: 12px; border: 1px solid #E5ECE7;">
          <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; color: #4B5563;">
            <span>পণ্যের সাবটোটাল:</span>
            <span style="font-weight: bold; color: #17251F;">৳${order.subtotal}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; color: #4B5563;">
            <span>এক্সপ্রেস ডেলিভারি চার্জ:</span>
            <span style="font-weight: bold; color: #17251F;">৳${order.deliveryFee}</span>
          </div>
          ${
            order.discountAmount && order.discountAmount > 0
              ? `<div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; color: #21A366;">
                  <span>কুপন ছাড় (Discount):</span>
                  <span style="font-weight: bold;">-৳${order.discountAmount}</span>
                </div>`
              : ''
          }
          <div style="border-top: 2px dashed #E5ECE7; margin-top: 8px; padding-top: 10px; display: flex; justify-content: space-between; font-size: 16px; font-weight: 900; color: #123C2D;">
            <span>সর্বমোট পরিশোধযোগ্য (Grand Total):</span>
            <span style="color: #D9531E;">৳${order.grandTotal}</span>
          </div>
        </div>

        <!-- Delivery & Payment Info -->
        <div style="margin-top: 20px; padding: 14px; background: #F8FAF7; border-radius: 12px; border: 1px solid #E5ECE7; font-size: 12px; line-height: 1.6;">
          <div><strong>ডেলিভারি ঠিকানা:</strong> ${order.deliveryAddress}</div>
          <div><strong>আনুমানিক ডেলিভারি সময়:</strong> ${order.deliveryTimeSlot || '২৫-৩০ মিনিট (এক্সপ্রেস কোল্ড-চেইন)'}</div>
          <div><strong>পেমেন্ট মাধ্যম:</strong> ${order.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি (Cash on Delivery)' : 'বিকাশ / অনলাইন পেমেন্ট'}</div>
        </div>
      </div>

      <!-- Footer & Helpdesk -->
      <div style="background: #123C2D; color: #ffffff; padding: 20px 24px; text-align: center; font-size: 12px;">
        <p style="margin: 0 0 6px;">যেকোনো প্রয়োজনে আমাদের ডেডিকেটেড হেল্পলাইনে যোগাযোগ করুন: <strong>+880 9612-000000</strong></p>
        <p style="margin: 0; color: #A7D7C5;">© 2026 ECOBAZAR Supermarket Ltd. House 42, Road 27, Dhanmondi, Dhaka.</p>
      </div>

    </div>
  </body>
  </html>`;

  const emailRecord = {
    id: `email-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    type: 'ORDER_CONFIRMATION',
    to: recipient,
    orderId: order.orderId,
    subject: `অর্ডার নিশ্চিতকরণ - ECOBAZAR Order #${order.orderId}`,
    sentAt: new Date().toISOString(),
    status: 'RECORDED',
    customerName: order.customerName,
    grandTotal: order.grandTotal,
    previewSnippet: `Order #${order.orderId} for ৳${order.grandTotal} confirmed for ${order.customerName}.`,
    htmlContent,
  };

  const transporter = createTransporter();
  const config = getEmailConfig();

  if (transporter && config.isActive) {
    try {
      await transporter.sendMail({
        from: `"${config.senderName}" <${config.senderEmail || config.smtpUser}>`,
        to: recipient,
        subject: emailRecord.subject,
        html: htmlContent,
      });
      emailRecord.status = 'DELIVERED';
      console.log(`[EmailService] Live SMTP email sent successfully to ${recipient} for order #${order.orderId}`);
    } catch (err: any) {
      emailRecord.status = 'FAILED';
      (emailRecord as any).error = err.message;
      console.error(`[EmailService] SMTP error for order #${order.orderId}:`, err);
    }
  } else {
    emailRecord.status = 'PENDING_SMTP';
    console.log(`[EmailService] (Pending SMTP Configuration) Order confirmation email recorded for ${recipient} (Order #${order.orderId}).`);
  }

  recordSentEmail(emailRecord);
  return { success: emailRecord.status === 'DELIVERED', record: emailRecord };
}

/**
 * 2. CAREER APPLICATION CONFIRMATION EMAIL TO APPLICANT
 */
export async function sendCareerApplicationNotification(app: CareerEmailData) {
  const recipient = app.applicantEmail?.trim();
  if (!recipient || !recipient.includes('@')) {
    console.warn(`[EmailService] No valid recipient email provided for application #${app.applicationId}. Skipping.`);
    return { success: false, reason: 'Invalid or missing applicant email' };
  }

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Application Received: ${app.jobTitle} - ECOBAZAR Careers</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F7F9F5; margin: 0; padding: 24px; color: #17251F;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E5ECE7; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
      
      <!-- Header -->
      <div style="background: #123C2D; padding: 26px 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 22px; font-weight: 900; color: #ffffff;">ECOBAZAR CAREERS</h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #2EBD70; font-weight: bold;">গড়ে তুলুন আপনার উজ্জ্বল ভবিষ্যৎ আমাদের সাথে</p>
      </div>

      <!-- Content -->
      <div style="padding: 28px 24px;">
        <h2 style="margin: 0 0 12px; font-size: 18px; color: #123C2D;">প্রিয় ${app.applicantName},</h2>
        <p style="font-size: 14px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
          ECOBAZAR-এ <strong>${app.jobTitle}</strong> পদের জন্য আপনার আবেদনটি সফলভাবে গৃহীত হয়েছে। আমাদের ট্যালেন্ট অ্যাকুইজিশন ও এইচআর টিম আপনার প্রোফাইলটি অত্যন্ত সতর্কতার সাথে মূল্যায়ন করছে।
        </p>

        <!-- Application Box -->
        <div style="background: #F2FBF6; border: 1px solid #C4EED6; border-radius: 12px; padding: 18px; margin: 20px 0;">
          <div style="font-size: 12px; color: #21A366; font-weight: bold; text-transform: uppercase;">আবেদন রেফারেন্স আইডি</div>
          <div style="font-size: 18px; font-weight: 900; color: #123C2D; margin: 4px 0 10px;">${app.applicationId}</div>
          
          <div style="font-size: 13px; color: #4B5563; line-height: 1.6;">
            <div><strong>পদের নাম:</strong> ${app.jobTitle}</div>
            <div><strong>আবেদনের তারিখ:</strong> ${app.appliedAt || 'আজ'}</div>
            <div><strong>পছন্দের ব্রাঞ্চ:</strong> ${app.branchPreference || 'Any Branch (Dhaka)'}</div>
            <div><strong>প্রত্যাশিত বেতন:</strong> ${app.expectedSalary || 'Negotiable'}</div>
          </div>
        </div>

        <h3 style="margin: 20px 0 8px; font-size: 15px; color: #123C2D;">পরবর্তী পদক্ষেপ (Next Steps):</h3>
        <ol style="font-size: 13px; color: #4B5563; padding-left: 20px; line-height: 1.7; margin: 0 0 20px;">
          <li>আমাদের এইচআর টিম আগামী ৩-৫ কার্যদিবসের মধ্যে প্রাথমিক শর্টলিস্ট প্রস্তুত করবে।</li>
          <li>আপনি শর্টলিস্টেড হলে সরাসরি মোবাইল বা এই ইমেইলে ফোন-ইন্টারভিউ ও লিখিত মূল্যায়নের শিডিউল পাঠানো হবে।</li>
          <li>আপনার আবেদনের বর্তমান স্ট্যাটাস আমাদের সিস্টেমে রিয়েল-টাইমে ট্র্যাক করা হচ্ছে।</li>
        </ol>

        <p style="font-size: 13px; color: #64736B; margin: 0;">
          ECOBAZAR-এ ক্যারিয়ার গড়তে আগ্রহ প্রকাশের জন্য আপনাকে আন্তরিক ধন্যবাদ।
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #F8FAF7; border-top: 1px solid #E5ECE7; padding: 16px 24px; text-align: center; font-size: 11px; color: #64736B;">
        <p style="margin: 0;">ECOBAZAR Talent Acquisition Team • hr@ecobazar.com.bd • +880 9612-000000</p>
      </div>

    </div>
  </body>
  </html>`;

  const emailRecord = {
    id: `email-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    type: 'CAREER_APPLICATION_CONFIRMATION',
    to: recipient,
    applicationId: app.applicationId,
    subject: `Application Received: ${app.jobTitle} - ECOBAZAR Careers`,
    sentAt: new Date().toISOString(),
    status: 'RECORDED',
    applicantName: app.applicantName,
    jobTitle: app.jobTitle,
    previewSnippet: `Application #${app.applicationId} for ${app.jobTitle} confirmed for ${app.applicantName}.`,
    htmlContent,
  };

  const transporter = createTransporter();
  const config = getEmailConfig();

  if (transporter && config.isActive) {
    try {
      await transporter.sendMail({
        from: `"${config.senderName}" <${config.senderEmail || config.smtpUser}>`,
        to: recipient,
        subject: emailRecord.subject,
        html: htmlContent,
      });
      emailRecord.status = 'DELIVERED';
      console.log(`[EmailService] Career notification sent to ${recipient} for application #${app.applicationId}`);
    } catch (err: any) {
      emailRecord.status = 'FAILED';
      (emailRecord as any).error = err.message;
      console.error(`[EmailService] SMTP error for application #${app.applicationId}:`, err);
    }
  } else {
    emailRecord.status = 'PENDING_SMTP';
    console.log(`[EmailService] (Pending SMTP Configuration) Career notification email recorded for ${recipient} (App #${app.applicationId}).`);
  }

  recordSentEmail(emailRecord);
  return { success: emailRecord.status === 'DELIVERED', record: emailRecord };
}

/**
 * 3. SEND TEST EMAIL TO VERIFY SMTP CREDENTIALS
 */
export async function sendTestEmail(toEmail: string) {
  const config = getEmailConfig();
  if (!config.smtpUser || !config.smtpPass) {
    throw new Error('SMTP Username and App Password are required to test.');
  }

  const transporter = createTransporter();
  if (!transporter) {
    throw new Error('Could not create SMTP transporter. Please enable SMTP and check credentials.');
  }

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <body style="font-family: sans-serif; background: #F7F9F5; padding: 24px;">
    <div style="max-width: 500px; margin: 0 auto; background: #fff; padding: 24px; border-radius: 16px; border: 1px solid #C4EED6;">
      <h2 style="color: #123C2D; margin-top: 0;">🎉 ECOBAZAR SMTP Connection Test Successful!</h2>
      <p style="font-size: 14px; color: #374151; line-height: 1.5;">
        Congratulations! Your ECOBAZAR Supermarket email dispatch system is now live and working seamlessly.
      </p>
      <div style="padding: 12px; background: #F2FBF6; border-radius: 8px; font-size: 12px; color: #21A366; margin: 16px 0;">
        <strong>Host:</strong> ${config.smtpHost}<br/>
        <strong>Port:</strong> ${config.smtpPort}<br/>
        <strong>Sender:</strong> ${config.senderName} (${config.senderEmail || config.smtpUser})<br/>
        <strong>Recipient:</strong> ${toEmail}
      </div>
      <p style="font-size: 12px; color: #6B7280; margin-bottom: 0;">
        From now on, all customer orders and career applicant confirmations will automatically be delivered directly to inboxes.
      </p>
    </div>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: `"${config.senderName}" <${config.senderEmail || config.smtpUser}>`,
    to: toEmail,
    subject: '🎉 ECOBAZAR SMTP Test Email - Connection Verified',
    html: htmlContent,
  });

  return { success: true, message: `Test email delivered successfully to ${toEmail}` };
}

/**
 * 4. RESEND A LOGGED EMAIL DIRECTLY TO LIVE INBOX
 */
export async function resendLoggedEmail(emailId: string) {
  const emails = getSentEmails();
  const target = emails.find((e: any) => e.id === emailId);
  if (!target) {
    throw new Error(`Email with ID "${emailId}" not found in outbox records.`);
  }

  const config = getEmailConfig();
  if (!config.isActive || !config.smtpUser || !config.smtpPass) {
    throw new Error('SMTP is not configured or disabled. Please enter your Gmail/SMTP credentials in Email Settings first.');
  }

  const transporter = createTransporter();
  if (!transporter) {
    throw new Error('Could not initialize mail transporter.');
  }

  await transporter.sendMail({
    from: `"${config.senderName}" <${config.senderEmail || config.smtpUser}>`,
    to: target.to,
    subject: target.subject,
    html: target.htmlContent || `<p>${target.previewSnippet}</p>`,
  });

  target.status = 'DELIVERED';
  target.lastResentAt = new Date().toISOString();
  recordSentEmail(target);

  return { success: true, message: `Email #${emailId} successfully delivered to ${target.to}` };
}
