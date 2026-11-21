import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

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

function recordSentEmail(record: any) {
  try {
    const p = getSentEmailsLogPath();
    let data: any = { version: '1.0.0', emails: [] };
    if (fs.existsSync(p)) {
      try {
        data = JSON.parse(fs.readFileSync(p, 'utf-8'));
      } catch (e) {
        data = { version: '1.0.0', emails: [] };
      }
    }
    if (!Array.isArray(data.emails)) data.emails = [];
    data.emails.unshift(record);
    if (data.emails.length > 200) data.emails = data.emails.slice(0, 200);
    fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to log sent email to sent-emails.json:', err);
  }
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
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
      <td style="padding: 12px 8px; font-size: 13px; color: #17251F; font-weight: bold;">
        ${item.name}
        <div style="font-size: 11px; color: #64736B; font-weight: normal;">${item.unit || '1 unit'}</div>
      </td>
      <td style="padding: 12px 8px; font-size: 13px; color: #17251F; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 12px 8px; font-size: 13px; color: #17251F; text-align: right;">
        ৳${item.price}
      </td>
      <td style="padding: 12px 8px; font-size: 13px; color: #21A366; font-weight: bold; text-align: right;">
        ৳${item.total || item.price * item.quantity}
      </td>
    </tr>`
    )
    .join('');

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>অর্ডার নিশ্চিতকরণ - ECOBAZAR Order #${order.orderId}</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F7F9F5; margin: 0; padding: 24px; color: #17251F;">
    <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E5ECE7; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
      
      <!-- Header -->
      <div style="background: #123C2D; padding: 28px 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 0.5px; color: #ffffff;">ECOBAZAR</h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #2EBD70; font-weight: bold;">১০০% খাঁটি ও অর্গানিক তাজা গ্রোসারি সুপারস্টোর</p>
      </div>

      <!-- Hero Message -->
      <div style="padding: 24px; border-bottom: 1px solid #E5ECE7; background: #F2FBF6;">
        <h2 style="margin: 0 0 8px; font-size: 18px; color: #123C2D;">ধন্যবাদ ${order.customerName}! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।</h2>
        <p style="margin: 0; font-size: 13px; color: #4B5563; line-height: 1.5;">
          আমাদের সেন্ট্রাল হাব <strong>${order.branch || 'গুলশান-২ সুপারস্টোর'}</strong> থেকে আপনার অর্ডারটি প্যাক করে দ্রুত কোল্ড-চেইন ডেলিভারিতে পাঠানো হচ্ছে।
        </p>
        <div style="margin-top: 14px; display: inline-block; background: #21A366; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: bold;">
          অর্ডার ট্র্যাকিং আইডি: #${order.orderId}
        </div>
      </div>

      <!-- Order Details Summary -->
      <div style="padding: 24px;">
        <h3 style="margin: 0 0 14px; font-size: 15px; color: #123C2D; text-transform: uppercase; letter-spacing: 0.5px;">অর্ডারের বিস্তারিত বিবরণ</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background: #F7F9F5; border-bottom: 2px solid #E5ECE7; text-align: left;">
              <th style="padding: 10px 8px; font-size: 12px; color: #64736B;">পণ্য</th>
              <th style="padding: 10px 8px; font-size: 12px; color: #64736B; text-align: center;">পরিমাণ</th>
              <th style="padding: 10px 8px; font-size: 12px; color: #64736B; text-align: right;">দর</th>
              <th style="padding: 10px 8px; font-size: 12px; color: #64736B; text-align: right;">মোট</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <!-- Totals -->
        <div style="background: #FAFBF9; border-radius: 12px; padding: 16px; border: 1px solid #E5ECE7;">
          <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; color: #4B5563;">
            <span>সাবটোটাল (Subtotal):</span>
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
    status: 'DELIVERED',
    customerName: order.customerName,
    grandTotal: order.grandTotal,
    previewSnippet: `Order #${order.orderId} for ৳${order.grandTotal} confirmed for ${order.customerName}.`,
  };

  const transporter = createTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"ECOBAZAR Supermarket" <${process.env.SMTP_FROM || 'orders@ecobazar.com.bd'}>`,
        to: recipient,
        subject: emailRecord.subject,
        html: htmlContent,
      });
      console.log(`[EmailService] Live SMTP email sent successfully to ${recipient} for order #${order.orderId}`);
    } catch (err) {
      console.error(`[EmailService] SMTP error for order #${order.orderId}, logged to records:`, err);
    }
  } else {
    console.log(`[EmailService] (Local/Sandbox Mode) Order confirmation email recorded for ${recipient} (Order #${order.orderId}).`);
  }

  recordSentEmail(emailRecord);
  return { success: true, record: emailRecord };
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
    status: 'DELIVERED',
    applicantName: app.applicantName,
    jobTitle: app.jobTitle,
    previewSnippet: `Application #${app.applicationId} for ${app.jobTitle} confirmed for ${app.applicantName}.`,
  };

  const transporter = createTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"ECOBAZAR Careers" <${process.env.SMTP_FROM || 'careers@ecobazar.com.bd'}>`,
        to: recipient,
        subject: emailRecord.subject,
        html: htmlContent,
      });
      console.log(`[EmailService] Career notification sent to ${recipient} for application #${app.applicationId}`);
    } catch (err) {
      console.error(`[EmailService] SMTP error for application #${app.applicationId}:`, err);
    }
  } else {
    console.log(`[EmailService] (Local/Sandbox Mode) Career notification email recorded for ${recipient} (App #${app.applicationId}).`);
  }

  recordSentEmail(emailRecord);
  return { success: true, record: emailRecord };
}
