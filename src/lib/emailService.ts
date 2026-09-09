import { Resend } from 'resend';
import { EnquiryFormData } from './schema';

const fromEmail = process.env.RESEND_FROM_EMAIL || 'enquiry@salasaraluminium.shop';
const notificationEmail = process.env.NOTIFICATION_EMAIL || 'saraswatnandani26@gmail.com';

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[RESEND WARNING]: RESEND_API_KEY is not configured in environment variables.');
    return null;
  }
  return new Resend(apiKey);
}

export async function sendEnquiryEmail(data: EnquiryFormData, leadId: string) {
  const resend = getResendClient();
  if (!resend) {
    return { success: false, error: 'RESEND_API_KEY missing' };
  }

  const cleanPhone = (data.phone || '').replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/91${cleanPhone.length === 10 ? cleanPhone : cleanPhone.replace(/^91/, '')}?text=${encodeURIComponent(
    `Hello ${data.fullName}, thank you for contacting Salasar Aluminium & Hardware regarding your trade enquiry (${leadId}).`
  )}`;

  const subject = `New Trade Enquiry: ${data.fullName} | ${data.saProductCode || data.productCategory || 'General Quote'} [${leadId}]`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .header { background: #0B1F3A; padding: 28px 24px; border-bottom: 4px solid #C9A227; }
          .brand { color: #C9A227; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; }
          .title { color: #ffffff; font-size: 20px; font-weight: 700; margin: 6px 0 0 0; }
          .badge { display: inline-block; background: #1e293b; color: #e2e8f0; padding: 4px 10px; border-radius: 6px; font-size: 12px; margin-top: 8px; font-weight: 600; border: 1px solid #334155; }
          .content { padding: 24px; }
          .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin: 20px 0 10px 0; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
          .grid { width: 100%; border-collapse: collapse; }
          .grid td { padding: 8px 0; font-size: 14px; vertical-align: top; }
          .grid .label { width: 38%; color: #64748b; font-weight: 500; }
          .grid .value { width: 62%; color: #0f172a; font-weight: 600; }
          .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; font-size: 14px; line-height: 1.6; color: #334155; margin-top: 10px; white-space: pre-wrap; }
          .actions { margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0; display: flex; gap: 12px; }
          .btn-wa { display: inline-block; background: #25D366; color: #ffffff !important; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; }
          .btn-mail { display: inline-block; background: #0B1F3A; color: #ffffff !important; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; }
          .footer { background: #f1f5f9; padding: 16px 24px; font-size: 12px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="brand">Salasar Aluminium & Hardware • Raipur</div>
            <h1 class="title">New Wholesale / Trade Enquiry</h1>
            <span class="badge">Reference: ${leadId}</span>
          </div>

          <div class="content">
            <div class="section-title">Client Information</div>
            <table class="grid">
              <tr>
                <td class="label">Full Name:</td>
                <td class="value">${data.fullName}</td>
              </tr>
              <tr>
                <td class="label">Phone:</td>
                <td class="value"><a href="tel:${data.phone}" style="color: #0B1F3A; text-decoration: underline;">${data.phone}</a></td>
              </tr>
              <tr>
                <td class="label">Email:</td>
                <td class="value"><a href="mailto:${data.email}" style="color: #0B1F3A; text-decoration: underline;">${data.email}</a></td>
              </tr>
              ${data.companyName ? `
              <tr>
                <td class="label">Company / Firm:</td>
                <td class="value">${data.companyName}</td>
              </tr>` : ''}
              ${data.businessType ? `
              <tr>
                <td class="label">Business Type:</td>
                <td class="value" style="text-transform: capitalize;">${data.businessType.replace('_', ' ')}</td>
              </tr>` : ''}
            </table>

            <div class="section-title">Product & Order Specifications</div>
            <table class="grid">
              ${data.saProductCode ? `
              <tr>
                <td class="label">SA SKU / Code:</td>
                <td class="value" style="color: #b45309; font-weight: 700;">${data.saProductCode}</td>
              </tr>` : ''}
              ${data.productCategory ? `
              <tr>
                <td class="label">Category:</td>
                <td class="value">${data.productCategory}</td>
              </tr>` : ''}
              ${data.estimatedQuantity ? `
              <tr>
                <td class="label">Estimated Quantity:</td>
                <td class="value">${data.estimatedQuantity}</td>
              </tr>` : ''}
              ${data.preferredFinish ? `
              <tr>
                <td class="label">Preferred Finish:</td>
                <td class="value">${data.preferredFinish}</td>
              </tr>` : ''}
              ${data.deliveryLocation || data.state ? `
              <tr>
                <td class="label">Destination / State:</td>
                <td class="value">${[data.deliveryLocation, data.state].filter(Boolean).join(', ')}</td>
              </tr>` : ''}
            </table>

            <div class="section-title">Requirements & Project Message</div>
            <div class="message-box">${data.message}</div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
              <p style="font-size: 13px; font-weight: 600; margin-bottom: 10px;">Quick Sales Actions:</p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right: 10px;">
                    <a href="${whatsappUrl}" class="btn-wa" target="_blank">Chat on WhatsApp</a>
                  </td>
                  <td>
                    <a href="mailto:${data.email}?subject=Quote%20from%20Salasar%20Aluminium%20-%20Ref%20${leadId}" class="btn-mail">Reply by Email</a>
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div class="footer">
            Submitted via <strong>salasaraluminium.shop</strong> on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: notificationEmail,
      replyTo: data.email,
      subject,
      html,
    });
    return { success: true, result };
  } catch (error) {
    console.error('[RESEND EMAIL ERROR]:', error);
    return { success: false, error };
  }
}
