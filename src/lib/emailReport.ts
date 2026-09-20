import { Resend } from "resend";
import nodemailer from "nodemailer";

export interface SendReportEmailParams {
  customerEmail: string;
  customerName: string;
  regNumber: string;
  orderId: string;
  pdfBuffer: Buffer;
  downloadUrl?: string;
}

export async function sendCustomerReportEmail(
  params: SendReportEmailParams
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const { customerEmail, customerName, regNumber, orderId, pdfBuffer, downloadUrl } = params;
  const cleanVrm = regNumber.trim().toUpperCase();
  const subject = `Your Vehicle Report for [${cleanVrm}] is ready`;

  const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color: #0b1c30;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e1e8f5;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #000615 0%, #0b1f3a 100%); padding: 36px 32px; border-bottom: 3px solid #2d5bff;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff;">
                Authorize<span style="color: #2d5bff;">Check</span>
              </h1>
              <p style="margin: 6px 0 0; font-size: 13px; color: #b5c7ea;">
                Official Vehicle Due Diligence &amp; Intelligence Report
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 12px; font-size: 18px; color: #000615;">
                Hello ${customerName},
              </h2>
              <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #44474d;">
                Thank you for your purchase. Your comprehensive vehicle history report for registration <strong>${cleanVrm}</strong> (Order Ref: <code>#${orderId}</code>) has been generated and verified against 80+ UK national databases.
              </p>

              <!-- VRM Plate Box -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 24px;">
                <tr>
                  <td style="background-color: #ffd200; border: 2px solid #000000; border-radius: 6px; padding: 8px 24px; font-weight: 900; font-size: 22px; color: #000000; letter-spacing: 3px; font-family: monospace;">
                    ${cleanVrm}
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.6; color: #44474d;">
                Your full 20-page A4 vehicle report is attached to this email as a PDF document.
              </p>

              ${downloadUrl ? `
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${downloadUrl}" style="display: inline-block; background-color: #2d5bff; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 14px;">
                  Download Backup Copy &rarr;
                </a>
              </div>
              ` : ""}

              <div style="background-color: #eff4ff; border-radius: 8px; padding: 14px 16px; border: 1px solid #d3e4fe; font-size: 12px; color: #364764; line-height: 1.5;">
                <strong>Included in your check:</strong> MOT History &amp; Timeline, Police Stolen Register, Insurance Write-off Markers (Cat S/N/C/D), Outstanding Finance Check, Mileage Inconsistencies, and Market Valuation.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9ff; padding: 20px 32px; border-top: 1px solid #e1e8f5; text-align: center; font-size: 11px; color: #75777e;">
              <p style="margin: 0 0 6px;">&copy; ${new Date().getFullYear()} AuthorizeCheck. All rights reserved.</p>
              <p style="margin: 0;">If you have any questions about your report, reply directly to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const textBody = `Hello ${customerName},

Your vehicle check report for ${cleanVrm} (Order #${orderId}) has been generated.
Your full PDF report is attached to this email.

${downloadUrl ? `Direct download link: ${downloadUrl}\n` : ""}
Thank you for using AuthorizeCheck.
`;

  // 1. Try Resend if RESEND_API_KEY is set
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM_EMAIL || "AuthorizeCheck <reports@authorizecheck.co.uk>";

      const result = await resend.emails.send({
        from: fromEmail,
        to: customerEmail,
        subject,
        html: htmlBody,
        text: textBody,
        attachments: [
          {
            filename: `Vehicle-Report-${cleanVrm}.pdf`,
            content: pdfBuffer,
          },
        ],
      });

      console.log(`[EmailReport] Successfully sent report via Resend. ID: ${result.data?.id}`);
      return { success: true, messageId: result.data?.id };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[EmailReport] Resend delivery failed: ${msg}. Trying Google SMTP fallback...`);
    }
  }

  // 2. Google SMTP Nodemailer Fallback
  const gmailUser = process.env.GMAIL_USER || "checkauthorize@gmail.com";
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (gmailPass && gmailPass.trim() !== "" && !gmailPass.includes("your-16-character")) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass.replace(/\s+/g, ""),
        },
      });

      const info = await transporter.sendMail({
        from: `"AuthorizeCheck Reports" <${gmailUser}>`,
        to: customerEmail,
        subject,
        html: htmlBody,
        text: textBody,
        attachments: [
          {
            filename: `Vehicle-Report-${cleanVrm}.pdf`,
            content: pdfBuffer,
          },
        ],
      });

      console.log(`[EmailReport] Successfully sent report via Google SMTP. ID: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[EmailReport] Google SMTP delivery failed: ${msg}`);
      return { success: false, error: msg };
    }
  }

  console.warn("[EmailReport] Neither RESEND_API_KEY nor GMAIL_APP_PASSWORD configured. Email could not be sent.");
  return {
    success: false,
    error: "No email provider configured. Please set RESEND_API_KEY or GMAIL_APP_PASSWORD.",
  };
}
