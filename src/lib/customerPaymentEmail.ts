import nodemailer from "nodemailer";
import { Resend } from "resend";

export interface CustomerPaymentEmailParams {
  orderId: string;
  customerName: string;
  customerEmail: string;
  regNumber: string;
  planName: string;
  price: string;
  paymentDate?: string;
  paymentMethod?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function generateCustomerPaymentEmailHtml(params: CustomerPaymentEmailParams): string {
  const safeName = escapeHtml(params.customerName || "Valued Customer");
  const safeEmail = escapeHtml(params.customerEmail);
  const safeVrm = escapeHtml((params.regNumber || "").toUpperCase());
  const safePlanName = escapeHtml(params.planName || "Full Comprehensive Vehicle Check");
  const safePrice = escapeHtml(params.price || "£54.99");
  const safeOrderId = escapeHtml(params.orderId);
  const safeDate = escapeHtml(
    params.paymentDate ||
      new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Europe/London",
      }).format(new Date())
  );
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmed — AuthorizeCheck Report for ${safeVrm}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f4f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0b1c30; -webkit-font-smoothing: antialiased; line-height: 1.5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0f4f9; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 36px rgba(0, 10, 30, 0.08); border: 1px solid #dbe3f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #000615 0%, #0b1f3a 100%); padding: 36px 32px 28px; text-align: left; border-bottom: 3px solid #2d5bff;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <div style="display: inline-block; padding: 5px 14px; background-color: rgba(45, 91, 255, 0.2); border: 1px solid rgba(45, 91, 255, 0.4); border-radius: 20px; margin-bottom: 12px;">
                      <span style="font-size: 11px; font-weight: 700; color: #b8c3ff; text-transform: uppercase; letter-spacing: 1.5px;">Payment Received &bull; Order Confirmed</span>
                    </div>
                    <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      Authorize<span style="color: #2d5bff;">Check</span>
                    </h1>
                    <p style="margin: 6px 0 0; font-size: 13px; color: #b5c7ea;">
                      Official UK Vehicle Provenance &amp; Intelligence Bureau
                    </p>
                  </td>
                  <td align="right" valign="top">
                    <div style="background-color: rgba(255, 255, 255, 0.08); padding: 8px 14px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.15); text-align: right;">
                      <span style="display: block; font-size: 10px; color: #b5c7ea; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Order Ref</span>
                      <strong style="font-size: 13px; color: #ffffff; font-family: monospace;">#${safeOrderId}</strong>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- UK Vehicle Plate Section -->
          <tr>
            <td style="padding: 24px 32px 20px; background-color: #f8faff; border-bottom: 1px solid #e7edf6; text-align: center;">
              <span style="display: block; font-size: 11px; text-transform: uppercase; font-weight: 700; color: #5a6272; letter-spacing: 1.2px; margin-bottom: 10px;">
                Vehicle Under Official Investigation
              </span>
              
              <!-- Authentic UK Yellow Number Plate -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto; background-color: #ffd200; border: 2px solid #000000; border-radius: 8px; box-shadow: 0 4px 14px rgba(0,0,0,0.14); overflow: hidden;">
                <tr>
                  <td style="background-color: #003399; width: 36px; padding: 10px 4px; text-align: center; vertical-align: middle;">
                    <div style="color: #ffffff; font-size: 9px; font-weight: 800; letter-spacing: 1px; line-height: 1;">UK</div>
                    <div style="font-size: 10px; margin-top: 3px;">🇬🇧</div>
                  </td>
                  <td style="padding: 10px 28px; vertical-align: middle;">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 26px; font-weight: 900; color: #000000; letter-spacing: 4px; text-transform: uppercase; white-space: nowrap;">
                      ${safeVrm}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary Body Content -->
          <tr>
            <td style="padding: 32px 32px 20px;">
              <h2 style="margin: 0 0 10px; font-size: 20px; font-weight: 700; color: #000615;">
                Hello ${safeName},
              </h2>
              <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #364152;">
                Thank you for your order. We have successfully processed your payment of <strong>${safePrice}</strong> for the <strong>${safePlanName}</strong>. Our vehicle intelligence team and automated audit engines have initiated the full provenance audit for registration <strong>${safeVrm}</strong>.
              </p>

              <!-- CRITICAL DELIVERY TIMELINE CALLOUT (3-4 Hours) -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: linear-gradient(135deg, #eff4ff 0%, #e6efff 100%); border-radius: 14px; border: 2px solid #2d5bff; margin-bottom: 28px; overflow: hidden;">
                <tr>
                  <td style="padding: 22px 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="44" valign="top" style="padding-right: 14px;">
                          <div style="width: 40px; height: 40px; border-radius: 10px; background-color: #2d5bff; text-align: center; line-height: 40px; color: #ffffff; font-size: 20px;">
                            ⏱️
                          </div>
                        </td>
                        <td>
                          <span style="display: block; font-size: 11px; font-weight: 800; color: #2d5bff; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 2px;">
                            Report Delivery Notice
                          </span>
                          <strong style="display: block; font-size: 18px; color: #001233; font-weight: 800; margin-bottom: 6px;">
                            Your report will be delivered within 3–4 hours
                          </strong>
                          <p style="margin: 0; font-size: 13px; line-height: 1.55; color: #223450;">
                            Our data analysts and institutional verification systems are currently cross-referencing over <strong>80+ national vehicle databases</strong>. As soon as all audit markers are certified, your full 20-page vehicle dossier will be delivered directly to your email address: <strong style="color: #00256e;">${safeEmail}</strong>.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Order & Payment Receipt Table -->
              <div style="margin-bottom: 28px;">
                <span style="display: block; font-size: 12px; font-weight: 700; color: #5a6272; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                  Order &amp; Payment Summary
                </span>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border: 1px solid #e1e8f2; border-radius: 12px; overflow: hidden; background-color: #fafcff;">
                  <tr>
                    <td style="padding: 12px 18px; border-bottom: 1px solid #e7edf6; font-size: 13px; color: #5a6272; width: 40%;">Order Reference</td>
                    <td style="padding: 12px 18px; border-bottom: 1px solid #e7edf6; font-size: 13px; font-weight: 700; color: #000615; font-family: monospace;">#${safeOrderId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 18px; border-bottom: 1px solid #e7edf6; font-size: 13px; color: #5a6272;">Vehicle Registration</td>
                    <td style="padding: 12px 18px; border-bottom: 1px solid #e7edf6; font-size: 13px; font-weight: 800; color: #000615; text-transform: uppercase;">${safeVrm}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 18px; border-bottom: 1px solid #e7edf6; font-size: 13px; color: #5a6272;">Selected Package</td>
                    <td style="padding: 12px 18px; border-bottom: 1px solid #e7edf6; font-size: 13px; font-weight: 600; color: #000615;">${safePlanName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 18px; border-bottom: 1px solid #e7edf6; font-size: 13px; color: #5a6272;">Amount Paid</td>
                    <td style="padding: 12px 18px; border-bottom: 1px solid #e7edf6; font-size: 15px; font-weight: 800; color: #003399;">${safePrice}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 18px; border-bottom: 1px solid #e7edf6; font-size: 13px; color: #5a6272;">Payment Status</td>
                    <td style="padding: 12px 18px; border-bottom: 1px solid #e7edf6; font-size: 13px; font-weight: 700; color: #047857;">
                      <span style="display: inline-block; width: 8px; height: 8px; background-color: #10b981; border-radius: 50%; margin-right: 6px;"></span>
                      PAID (Successfully Authorized)
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 18px; font-size: 13px; color: #5a6272;">Delivery Address</td>
                    <td style="padding: 12px 18px; font-size: 13px; font-weight: 600; color: #000615;">${safeEmail}</td>
                  </tr>
                </table>
              </div>

              <!-- 3-Step Visual Progress Tracker -->
              <div style="margin-bottom: 28px; background-color: #f8faff; border-radius: 12px; padding: 20px 22px; border: 1px solid #e7edf6;">
                <span style="display: block; font-size: 11px; font-weight: 700; color: #5a6272; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px;">
                  Live Order Progression
                </span>
                
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <!-- Step 1 -->
                  <tr>
                    <td width="30" valign="top" style="padding-bottom: 12px;">
                      <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #10b981; color: #ffffff; text-align: center; line-height: 22px; font-size: 12px; font-weight: 800;">
                        &#10003;
                      </div>
                    </td>
                    <td style="padding-bottom: 12px; padding-left: 8px;">
                      <strong style="display: block; font-size: 13px; color: #000615;">Step 1: Payment Successfully Processed</strong>
                      <span style="font-size: 12px; color: #5a6272;">Confirmed on ${safeDate}</span>
                    </td>
                  </tr>

                  <!-- Step 2 -->
                  <tr>
                    <td width="30" valign="top" style="padding-bottom: 12px;">
                      <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #2d5bff; color: #ffffff; text-align: center; line-height: 22px; font-size: 12px; font-weight: 800;">
                        &bull;
                      </div>
                    </td>
                    <td style="padding-bottom: 12px; padding-left: 8px;">
                      <strong style="display: block; font-size: 13px; color: #2d5bff;">Step 2: 80+ Point Institutional Audit (In Progress)</strong>
                      <span style="font-size: 12px; color: #5a6272;">Scanning DVLA, PNC Stolen register, MIAFTR insurance write-offs &amp; finance records</span>
                    </td>
                  </tr>

                  <!-- Step 3 -->
                  <tr>
                    <td width="30" valign="top">
                      <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #d1d5db; color: #4b5563; text-align: center; line-height: 22px; font-size: 11px; font-weight: 800;">
                        3
                      </div>
                    </td>
                    <td style="padding-left: 8px;">
                      <strong style="display: block; font-size: 13px; color: #5a6272;">Step 3: Complete Report Delivery (Within 3–4 Hours)</strong>
                      <span style="font-size: 12px; color: #5a6272;">Full 20-page certified PDF dossier dispatched directly to ${safeEmail}</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- What is included in your check -->
              <div style="margin-bottom: 26px;">
                <span style="display: block; font-size: 12px; font-weight: 700; color: #5a6272; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                  What&apos;s Included In Your Report
                </span>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 13px; color: #364152; line-height: 1.6;">
                  <tr>
                    <td width="50%" valign="top" style="padding-right: 10px; padding-bottom: 8px;">
                      <span style="color: #2d5bff; font-weight: bold; margin-right: 6px;">&#10003;</span> Police Stolen Vehicle Register (PNC)
                    </td>
                    <td width="50%" valign="top" style="padding-bottom: 8px;">
                      <span style="color: #2d5bff; font-weight: bold; margin-right: 6px;">&#10003;</span> Insurance Write-Off (Cat S / N / C / D)
                    </td>
                  </tr>
                  <tr>
                    <td width="50%" valign="top" style="padding-right: 10px; padding-bottom: 8px;">
                      <span style="color: #2d5bff; font-weight: bold; margin-right: 6px;">&#10003;</span> Outstanding Finance Agreements
                    </td>
                    <td width="50%" valign="top" style="padding-bottom: 8px;">
                      <span style="color: #2d5bff; font-weight: bold; margin-right: 6px;">&#10003;</span> Full MOT History &amp; Test Advisories
                    </td>
                  </tr>
                  <tr>
                    <td width="50%" valign="top" style="padding-right: 10px; padding-bottom: 8px;">
                      <span style="color: #2d5bff; font-weight: bold; margin-right: 6px;">&#10003;</span> Mileage Discrepancy &amp; Rollback Audit
                    </td>
                    <td width="50%" valign="top" style="padding-bottom: 8px;">
                      <span style="color: #2d5bff; font-weight: bold; margin-right: 6px;">&#10003;</span> Keeper History &amp; Plate Changes
                    </td>
                  </tr>
                  <tr>
                    <td width="50%" valign="top" style="padding-right: 10px; padding-bottom: 8px;">
                      <span style="color: #2d5bff; font-weight: bold; margin-right: 6px;">&#10003;</span> Live Market Valuation (Forecourt/Trade)
                    </td>
                    <td width="50%" valign="top" style="padding-bottom: 8px;">
                      <span style="color: #2d5bff; font-weight: bold; margin-right: 6px;">&#10003;</span> Technical Specs, VED Tax &amp; Recalls
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Reassurance / Next Steps Note -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f5f8ff; border-radius: 10px; padding: 14px 18px; border: 1px solid #d9e5fc; font-size: 12px; color: #364764; line-height: 1.55;">
                <tr>
                  <td>
                    <strong>Need assistance or have questions?</strong><br>
                    Our customer support team is on standby. Simply reply directly to this email or write to <a href="mailto:checkauthorize@gmail.com" style="color: #2d5bff; text-decoration: underline;">checkauthorize@gmail.com</a> quoting order reference <strong>#${safeOrderId}</strong>.<br>
                    <span style="display: block; margin-top: 6px; color: #5a6b88;">
                      <em>Tip: To ensure your report arrives safely, please check your Spam/Junk folder or add <strong>checkauthorize@gmail.com</strong> to your safe sender list.</em>
                    </span>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8faff; padding: 24px 32px; border-top: 1px solid #e1e8f2; text-align: center; font-size: 11px; color: #7a8292; line-height: 1.6;">
              <p style="margin: 0 0 6px; font-weight: 600; color: #4a5262;">
                AuthorizeCheck &bull; Leading UK Vehicle History &amp; Intelligence Platform
              </p>
              <p style="margin: 0 0 6px;">
                &copy; ${currentYear} AuthorizeCheck. All rights reserved. Registered in the United Kingdom.
              </p>
              <p style="margin: 0; color: #9aa1b0;">
                You received this email because you completed a vehicle history check order on authorizecheck.co.uk.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function generateCustomerPaymentEmailPlainText(params: CustomerPaymentEmailParams): string {
  const vrm = (params.regNumber || "").toUpperCase();
  const dateStr =
    params.paymentDate ||
    new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Europe/London",
    }).format(new Date());

  return `===============================================================
AUTHORIZECHECK — PAYMENT CONFIRMED & ORDER RECEIVED
===============================================================

Hello ${params.customerName || "Valued Customer"},

Thank you for your purchase with AuthorizeCheck!
Your payment of ${params.price} for the ${params.planName} has been successfully processed.

---------------------------------------------------------------
*** IMPORTANT: REPORT DELIVERY WITHIN 3–4 HOURS ***
---------------------------------------------------------------
Our vehicle intelligence team and automated audit engines are currently
cross-referencing over 80+ national vehicle databases for registration: ${vrm}.

Your finalized, 20-page comprehensive vehicle report will be delivered
directly to your email address (${params.customerEmail}) within 3–4 hours.

---------------------------------------------------------------
ORDER & PAYMENT SUMMARY:
---------------------------------------------------------------
Order Reference:     #${params.orderId}
Vehicle Plate (VRM): ${vrm}
Package:             ${params.planName}
Amount Paid:         ${params.price}
Payment Status:      PAID (Successfully Authorized)
Payment Date:        ${dateStr}
Recipient Email:     ${params.customerEmail}

---------------------------------------------------------------
WHAT IS INCLUDED IN YOUR REPORT:
---------------------------------------------------------------
[X] Police Stolen Vehicle Register (PNC)
[X] Insurance Write-Off Marker (Cat S, N, C, D)
[X] Outstanding Finance & Agreement Audit
[X] Full MOT History, Failure Logs & Active Advisories
[X] Mileage Inconsistency & Odometer Rollback Detection
[X] V5C Logbook & Keeper Provenance Timeline
[X] Current Market Valuation (Trade, Forecourt & Private)
[X] Technical Specifications, Road Tax (VED) & Safety Recalls

---------------------------------------------------------------
QUESTIONS OR ASSISTANCE?
---------------------------------------------------------------
If you have any questions or require assistance, reply directly to this email
or contact support at checkauthorize@gmail.com quoting Order #${params.orderId}.

(Tip: Please check your Spam/Junk folder if your report has not arrived within 4 hours.)

===============================================================
(c) ${new Date().getFullYear()} AuthorizeCheck. All rights reserved.
Official UK Vehicle Provenance & Intelligence Bureau
`;
}

export async function sendCustomerPaymentConfirmationEmail(
  params: CustomerPaymentEmailParams
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const { customerEmail, customerName, regNumber, orderId } = params;
  const cleanVrm = (regNumber || "").trim().toUpperCase();
  const subject = `Payment Confirmed: Your Vehicle Report for [${cleanVrm}] — Delivery Within 3–4 Hours (Order #${orderId})`;

  const html = generateCustomerPaymentEmailHtml(params);
  const text = generateCustomerPaymentEmailPlainText(params);

  // 1. Try Resend if configured
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail =
        process.env.RESEND_FROM_EMAIL || "AuthorizeCheck <orders@authorizecheck.co.uk>";

      const result = await resend.emails.send({
        from: fromEmail,
        to: customerEmail,
        replyTo: process.env.ORDER_NOTIFICATION_EMAIL || "checkauthorize@gmail.com",
        subject,
        html,
        text,
      });

      console.log(
        `[CustomerPaymentEmail] Payment confirmation successfully dispatched via Resend to ${customerEmail}. ID: ${result.data?.id}`
      );
      return { success: true, messageId: result.data?.id };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(
        `[CustomerPaymentEmail] Resend delivery notice: ${msg}. Attempting Google SMTP fallback...`
      );
    }
  }

  // 2. Google SMTP (Nodemailer) Fallback
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
        from: `"AuthorizeCheck" <${gmailUser}>`,
        to: customerEmail,
        replyTo: process.env.ORDER_NOTIFICATION_EMAIL || "checkauthorize@gmail.com",
        subject,
        html,
        text,
      });

      console.log(
        `[CustomerPaymentEmail] Payment confirmation successfully dispatched via Google SMTP to ${customerEmail}. Message ID: ${info.messageId}`
      );
      return { success: true, messageId: info.messageId };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[CustomerPaymentEmail] Google SMTP delivery failed: ${msg}`);
      return { success: false, error: msg };
    }
  }

  console.warn(
    "[CustomerPaymentEmail] Neither RESEND_API_KEY nor GMAIL_APP_PASSWORD configured. Email could not be dispatched."
  );
  return {
    success: false,
    error: "No email provider configured. Please verify GMAIL_APP_PASSWORD or RESEND_API_KEY.",
  };
}
