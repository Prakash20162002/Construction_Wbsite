import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'gourbhandari68@gmail.com';

    const envDetected = {
      SMTP_HOST: smtpHost,
      SMTP_PORT: smtpPort,
      SMTP_USER_present: !!smtpUser,
      SMTP_PASS_present: !!smtpPass,
      CONTACT_RECEIVER_EMAIL: receiverEmail,
    };

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({
        success: false,
        error: 'SMTP credentials (SMTP_USER or SMTP_PASS) are missing in Vercel environment variables.',
        envDetected,
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Verify connection configuration
    await transporter.verify();

    // Send a test mail
    const info = await transporter.sendMail({
      from: `"SMTP Test" <${smtpUser}>`,
      to: receiverEmail,
      subject: 'Website SMTP Diagnostics Test Mail',
      text: 'If you are reading this, SMTP configuration is working perfectly on Vercel!',
      html: '<p>If you are reading this, SMTP configuration is working perfectly on Vercel!</p>',
    });

    return NextResponse.json({
      success: true,
      message: 'SMTP is working perfectly on Vercel!',
      envDetected,
      info,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack,
    });
  }
}
