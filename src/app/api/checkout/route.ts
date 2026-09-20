import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmail, OrderNotificationPayload } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, vrm, planId, planName, price, paymentUrl, terms } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Full name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!vrm || typeof vrm !== "string" || vrm.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Vehicle Registration Mark (VRM) is required." },
        { status: 400 }
      );
    }

    if (!terms?.volition || !terms?.delivery || !terms?.policy) {
      return NextResponse.json(
        {
          success: false,
          error: "All terms and conditions must be acknowledged before proceeding.",
        },
        { status: 400 }
      );
    }

    // Generate readable Order Reference ID (e.g. AC-ORD-84920)
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `AC-ORD-${randomSuffix}`;

    // Format current date in UK time
    const submittedAt = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "medium",
      timeZone: "Europe/London",
    }).format(new Date());

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "Unknown";

    const payload: OrderNotificationPayload = {
      orderId,
      name: name.trim(),
      email: email.trim(),
      vrm: vrm.trim().toUpperCase(),
      planId: planId || "full",
      planName: planName || (planId === "basic" ? "Basic Check" : "Full Comprehensive"),
      price: price || (planId === "basic" ? "£49.99" : "£54.99"),
      paymentUrl:
        paymentUrl ||
        (planId === "basic"
          ? "https://pay.sumup.com/b2c/Q391KWPF"
          : "https://pay.sumup.com/b2c/QM0IAQ2Z"),
      submittedAt,
      terms: {
        volition: Boolean(terms.volition),
        delivery: Boolean(terms.delivery),
        policy: Boolean(terms.policy),
      },
      clientIp,
    };

    const mailResult = await sendOrderEmail(payload);

    if (!mailResult.success) {
      return NextResponse.json(
        {
          success: false,
          orderId,
          error: mailResult.error || "Failed to dispatch email via Google SMTP.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        orderId,
        message: "Order details sent successfully to checkauthorize@gmail.com",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("[Checkout API Error]", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
