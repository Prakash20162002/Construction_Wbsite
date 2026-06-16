import { NextResponse, after } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, service, projectSize, location, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // SMTP configuration from environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'gourbhandari68@gmail.com';

    // If no credentials are set up, log the details to the server console and mock success
    if (!smtpUser || !smtpPass) {
      console.warn('⚠️ SMTP credentials (SMTP_USER/SMTP_PASS) are missing in environment variables. Logging form data instead:');
      console.log(body);
      return NextResponse.json({
        success: true,
        message: 'SMTP credentials missing. Form details logged to server console.',
        mocked: true,
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      pool: true, // Enable connection pooling to reuse the SMTP connection
      maxConnections: 3,
      maxMessages: 10,
    });

    // 1. Notification Email to the Company (gourbhandari68@gmail.com)
    const companyMailOptions = {
      from: `"${name}" <${smtpUser}>`, // Must match SMTP user to prevent authentication errors, replyTo is the client
      replyTo: email,
      to: receiverEmail,
      subject: `New Website Enquiry: ${service || 'General'} from ${name}`,
      text: `
New Project Enquiry Received

Details:
------------------------------------------
Name: ${name}
Company: ${company || 'N/A'}
Email: ${email}
Phone: ${phone || 'N/A'}
Service: ${service || 'General Enquiry'}
Project Size/Value: ${projectSize || 'N/A'}
Location: ${location || 'N/A'}
Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Message/Scope:
${message}
------------------------------------------
This email was generated from the website contact form.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a2438; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e8f5; border-radius: 8px;">
          <h2 style="color: #e85000; border-bottom: 2px solid #e85000; padding-bottom: 10px; margin-top: 0;">New Project Enquiry</h2>
          <p>You have received a new enquiry from the website contact form.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: #f7fafc;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e1e8f5; width: 180px;">Name</td>
              <td style="padding: 10px; border: 1px solid #e1e8f5;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e1e8f5;">Company</td>
              <td style="padding: 10px; border: 1px solid #e1e8f5;">${company || 'N/A'}</td>
            </tr>
            <tr style="background: #f7fafc;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e1e8f5;">Email</td>
              <td style="padding: 10px; border: 1px solid #e1e8f5;"><a href="mailto:${email}" style="color: #e85000;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e1e8f5;">Phone</td>
              <td style="padding: 10px; border: 1px solid #e1e8f5;"><a href="tel:${phone}" style="color: #1a2438; text-decoration: none;">${phone || 'N/A'}</a></td>
            </tr>
            <tr style="background: #f7fafc;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e1e8f5;">Service Required</td>
              <td style="padding: 10px; border: 1px solid #e1e8f5;">${service || 'General Enquiry'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e1e8f5;">Project Value</td>
              <td style="padding: 10px; border: 1px solid #e1e8f5;">${projectSize || 'N/A'}</td>
            </tr>
            <tr style="background: #f7fafc;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e1e8f5;">Location</td>
              <td style="padding: 10px; border: 1px solid #e1e8f5;">${location || 'N/A'}</td>
            </tr>
          </table>
          
          <h3 style="color: #1a2438; margin-top: 20px;">Project Details / Message:</h3>
          <div style="background: #f7fafc; padding: 15px; border-left: 4px solid #e85000; margin: 10px 0; white-space: pre-wrap;">${message}</div>
          
          <div style="margin-top: 30px; font-size: 12px; color: #718096; text-align: center; border-top: 1px solid #e1e8f5; padding-top: 15px;">
            Sent from Bhandari Enterprise Website Contact Form.
          </div>
        </div>
      `,
    };

    // 2. Auto-Reply Confirmation (ARC) to the User
    const userMailOptions = {
      from: `"Bhandari Enterprise" <${smtpUser}>`,
      to: email,
      subject: `We have received your enquiry — Bhandari Enterprise`,
      text: `
Dear ${name},

Thank you for reaching out to Bhandari Enterprise. We have successfully received your project enquiry and our engineering team is reviewing the details.

Here is a copy of the details you submitted:
------------------------------------------
Company: ${company || 'N/A'}
Service Required: ${service || 'General Enquiry'}
Project Value: ${projectSize || 'N/A'}
Location: ${location || 'N/A'}
Message/Description:
${message}
------------------------------------------

We will get back to you within 24 business hours. If you have immediate questions, feel free to call us directly at +91 99032 56479.

Best Regards,
Project Sales & Estimations Team
Bhandari Enterprise
Konnagar, West Bengal — 712235
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a2438; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e8f5; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #e85000; margin: 0; font-weight: 800; letter-spacing: 1px;">BHANDARI ENTERPRISE</h2>
            <p style="color: #718096; font-size: 12px; text-transform: uppercase; margin: 5px 0 0 0; letter-spacing: 2px;">Industrial Execution & Construction</p>
          </div>
          
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for contacting <strong>Bhandari Enterprise</strong>. We have successfully received your project enquiry and our engineering department is reviewing your requirements.</p>
          
          <div style="background: #f7fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e1e8f5;">
            <h3 style="color: #e85000; margin-top: 0; font-size: 15px; border-bottom: 1px solid #e1e8f5; padding-bottom: 8px;">Submitted Enquiry Details</h3>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #718096; width: 140px;">Company</td>
                <td style="padding: 6px 0; color: #1a2438;">${company || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #718096;">Service</td>
                <td style="padding: 6px 0; color: #1a2438;">${service || 'General Enquiry'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #718096;">Project Value</td>
                <td style="padding: 6px 0; color: #1a2438;">${projectSize || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #718096;">Location</td>
                <td style="padding: 6px 0; color: #1a2438;">${location || 'N/A'}</td>
              </tr>
            </table>
            
            <div style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed #e1e8f5;">
              <strong style="font-size: 14px; color: #718096; display: block; margin-bottom: 5px;">Description:</strong>
              <div style="color: #4a5568; font-size: 14px; white-space: pre-wrap; font-style: italic;">${message}</div>
            </div>
          </div>
          
          <p>One of our project managers will get in touch with you within <strong>24 business hours</strong> to discuss the scope and provide a formal proposal.</p>
          
          <div style="background: #fff8f5; border: 1px solid #ffe8cc; padding: 15px; border-radius: 6px; margin-top: 20px; font-size: 14px;">
            <strong>Need urgent pricing or consultation?</strong><br />
            Call our Kolkata head office directly at <a href="tel:+919903256479" style="color: #e85000; font-weight: bold; text-decoration: none;">+91 99032 56479</a>.
          </div>
          
          <div style="margin-top: 30px; font-size: 12px; color: #718096; text-align: center; border-top: 1px solid #e1e8f5; padding-top: 15px;">
            © ${new Date().getFullYear()} Bhandari Enterprise. All rights reserved.<br />
            11/A, Criper Road Bye Lane South, Konnagar, Hooghly, West Bengal — 712235
          </div>
        </div>
      `,
    };

    // Send emails in the background after the response is sent to the client
    after(async () => {
      try {
        await Promise.all([
          transporter.sendMail(companyMailOptions),
          transporter.sendMail(userMailOptions),
        ]);
        console.log('✅ Background emails sent successfully.');
      } catch (mailError: any) {
        console.error('❌ Error sending emails in background:', mailError);
      }
    });

    return NextResponse.json({ success: true, message: 'Enquiry received successfully.' });
  } catch (error: any) {
    console.error('Error in contact API route:', error);
    return NextResponse.json(
      { error: 'Failed to process enquiry. Please try again later.', details: error.message },
      { status: 500 }
    );
  }
}
