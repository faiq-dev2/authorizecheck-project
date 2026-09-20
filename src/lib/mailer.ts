import nodemailer from "nodemailer";

export interface OrderNotificationPayload {
  orderId: string;
  name: string;
  email: string;
  vrm: string;
  planId: string;
  planName: string;
  price: string;
  paymentUrl: string;
  submittedAt: string;
  terms: {
    volition: boolean;
    delivery: boolean;
    policy: boolean;
  };
  clientIp?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function generateOrderEmailHtml(order: OrderNotificationPayload): string {
  const safeName = escapeHtml(order.name);
  const safeEmail = escapeHtml(order.email);
  const safeVrm = escapeHtml(order.vrm.toUpperCase());
  const safePlanName = escapeHtml(order.planName);
  const safePrice = escapeHtml(order.price);
  const safeOrderId = escapeHtml(order.orderId);
  const safeDate = escapeHtml(order.submittedAt);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order: ${safeOrderId} — ${safeVrm}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0b1c30; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f7fc; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 6, 21, 0.08); border: 1px solid #e1e8f5;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #000615 0%, #0b1f3a 100%); padding: 36px 32px 28px; text-align: left; border-bottom: 3px solid #2d5bff;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <div style="display: inline-block; padding: 4px 12px; background-color: rgba(45, 91, 255, 0.2); border: 1px solid rgba(45, 91, 255, 0.4); border-radius: 20px; margin-bottom: 12px;">
                      <span style="font-size: 11px; font-weight: 700; color: #b8c3ff; text-transform: uppercase; letter-spacing: 1.5px;">Official Order Dispatch</span>
                    </div>
                    <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      Authorize<span style="color: #2d5bff;">Check</span>
                    </h1>
                    <p style="margin: 6px 0 0; font-size: 13px; color: #b5c7ea;">
                      New customer checkout order received from website
                    </p>
                  </td>
                  <td align="right" valign="top">
                    <div style="background-color: rgba(255, 255, 255, 0.08); padding: 8px 14px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); text-align: right;">
                      <span style="display: block; font-size: 10px; color: #b5c7ea; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Order ID</span>
                      <strong style="font-size: 13px; color: #ffffff; font-family: monospace;">#${safeOrderId}</strong>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- UK Vehicle Plate Section -->
          <tr>
            <td style="padding: 28px 32px 16px; background-color: #f8faff; border-bottom: 1px solid #edf2f9;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <span style="display: block; font-size: 11px; text-transform: uppercase; font-weight: 700; color: #44474d; letter-spacing: 1px; margin-bottom: 8px;">Vehicle Under Inspection</span>
                    
                    <!-- Authentic UK Number Plate -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="display: inline-block; background-color: #ffd200; border: 2px solid #000000; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); overflow: hidden;">
                      <tr>
                        <!-- UK Blue Identifier Strip -->
                        <td style="background-color: #003399; width: 34px; padding: 8px 4px; text-align: center; vertical-align: middle;">
                          <div style="color: #ffffff; font-size: 9px; font-weight: 800; letter-spacing: 1px; line-height: 1;">UK</div>
                          <div style="font-size: 8px; color: #ffd200; margin-top: 3px;">🇬🇧</div>
                        </td>
                        <!-- Registration Mark -->
                        <td style="padding: 8px 24px; vertical-align: middle;">
                          <span style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 26px; font-weight: 900; color: #000000; letter-spacing: 4px; text-transform: uppercase; white-space: nowrap;">
                            ${safeVrm}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order & Customer Details Table -->
          <tr>
            <td style="padding: 28px 32px 20px;">
              <h2 style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #000615; text-transform: uppercase; letter-spacing: 0.5px;">
                Customer &amp; Package Summary
              </h2>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse: collapse;">
                <!-- Full Name -->
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #44474d; background-color: #f8faff; border-bottom: 1px solid #edf2f9; border-top-left-radius: 8px; width: 38%;">
                    Customer Name
                  </td>
                  <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #000615; background-color: #f8faff; border-bottom: 1px solid #edf2f9; border-top-right-radius: 8px;">
                    ${safeName}
                  </td>
                </tr>
                <!-- Email Address -->
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #44474d; background-color: #ffffff; border-bottom: 1px solid #edf2f9;">
                    Email Address
                  </td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #0040df; font-weight: 600; background-color: #ffffff; border-bottom: 1px solid #edf2f9;">
                    <a href="mailto:${safeEmail}" style="color: #0040df; text-decoration: none; font-weight: 700;">
                      ${safeEmail}
                    </a>
                  </td>
                </tr>
                <!-- Selected Plan -->
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #44474d; background-color: #f8faff; border-bottom: 1px solid #edf2f9;">
                    Package Ordered
                  </td>
                  <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #000615; background-color: #f8faff; border-bottom: 1px solid #edf2f9;">
                    <span style="display: inline-block; padding: 3px 8px; border-radius: 4px; background-color: #eff4ff; color: #0040df; font-weight: 700;">
                      ${safePlanName}
                    </span>
                  </td>
                </tr>
                <!-- Price / Amount -->
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #44474d; background-color: #ffffff; border-bottom: 1px solid #edf2f9;">
                    Order Amount
                  </td>
                  <td style="padding: 12px 16px; font-size: 18px; font-weight: 800; color: #000615; background-color: #ffffff; border-bottom: 1px solid #edf2f9;">
                    ${safePrice}
                  </td>
                </tr>
                <!-- Submission Timestamp -->
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #44474d; background-color: #f8faff; border-bottom-left-radius: 8px;">
                    Order Received At
                  </td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #0b1c30; background-color: #f8faff; border-bottom-right-radius: 8px;">
                    ${safeDate}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Terms & Compliance Card -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #eff4ff; border-radius: 12px; padding: 16px; border: 1px solid #d3e4fe;">
                <tr>
                  <td>
                    <span style="display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #0040df; margin-bottom: 10px;">
                      Customer Acknowledgments &amp; Consents
                    </span>
                    <ul style="margin: 0; padding-left: 20px; font-size: 12px; line-height: 1.6; color: #364764;">
                      <li><strong>Customer Volition:</strong> Confirmed purchase of own volition without pressure.</li>
                      <li><strong>Delivery Notice:</strong> Acknowledged report is delivered within 3–4 hours and is non-refundable once sent.</li>
                      <li><strong>Legal Acceptance:</strong> Accepted AuthorizeCheck Terms &amp; Conditions and Privacy Statement.</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9ff; padding: 24px 32px; border-top: 1px solid #e1e8f5; text-align: center;">
              <p style="margin: 0 0 6px; font-size: 12px; font-weight: 700; color: #000615;">
                AuthorizeCheck Automated Dispatch System
              </p>
              <p style="margin: 0 0 10px; font-size: 11px; color: #75777e; line-height: 1.5;">
                Official DVLA, National Computer &amp; MIAFTR vehicle intelligence auditing.
              </p>
              <p style="margin: 0; font-size: 10px; color: #a1a5af;">
                &copy; ${new Date().getFullYear()} AuthorizeCheck. All rights reserved.
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

export function generateOrderEmailPlainText(order: OrderNotificationPayload): string {
  return `===============================================================
AUTHORIZECHECK — NEW VEHICLE CHECK ORDER RECEIVED
===============================================================

Order Reference: #${order.orderId}
Received At:     ${order.submittedAt}

---------------------------------------------------------------
VEHICLE REGISTRATION:
  Plate (VRM):   ${order.vrm.toUpperCase()}

---------------------------------------------------------------
CUSTOMER DETAILS:
  Name:          ${order.name}
  Email:         ${order.email}

---------------------------------------------------------------
PACKAGE & PAYMENT:
  Package:       ${order.planName} (${order.planId})
  Amount:        ${order.price}

---------------------------------------------------------------
ACKNOWLEDGEMENTS & LEGAL CONSENTS:
  [X] Purchased on own volition
  [X] Acknowledged 3–4 hour email delivery & non-refundable policy
  [X] Accepted Terms & Conditions and Privacy Statement

===============================================================
AuthorizeCheck Automated Order System
Recipient: checkauthorize@gmail.com
`;
}

export async function sendOrderEmail(payload: OrderNotificationPayload): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  const gmailUser = process.env.GMAIL_USER || "checkauthorize@gmail.com";
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const recipientEmail =
    process.env.ORDER_NOTIFICATION_EMAIL || "checkauthorize@gmail.com";

  if (!gmailPass || gmailPass.trim() === "" || gmailPass.includes("your-16-character")) {
    console.error(
      "[AuthorizeCheck Mailer Error] GMAIL_APP_PASSWORD is not configured in environment variables."
    );
    return {
      success: false,
      error:
        "Google SMTP credentials are not yet configured. Please set GMAIL_APP_PASSWORD in .env.local to enable email sending.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass.replace(/\s+/g, ""), // handle any spaces in app password
      },
    });

    const vrmFormatted = payload.vrm.trim().toUpperCase();
    const subject = `🚗 [New Order #${payload.orderId}] ${payload.planName} — Reg: ${vrmFormatted} (${payload.name})`;

    const mailOptions = {
      from: `"AuthorizeCheck Orders" <${gmailUser}>`,
      to: recipientEmail,
      replyTo: `"${payload.name}" <${payload.email}>`,
      subject,
      text: generateOrderEmailPlainText(payload),
      html: generateOrderEmailHtml(payload),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(
      `[AuthorizeCheck Mailer] Order notification email successfully dispatched to ${recipientEmail}. Message ID: ${info.messageId}`
    );

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("[AuthorizeCheck Mailer Error]", errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
}
