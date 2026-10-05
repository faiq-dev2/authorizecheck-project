import { NextRequest, NextResponse } from "next/server";
import { getOrder, updateOrderStatus, createOrder } from "@/lib/db";
import { sendCustomerPaymentConfirmationEmail } from "@/lib/customerPaymentEmail";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, name, email, vrm, regNumber, planName, price, paymentMethod } = body;

    if (!orderId || typeof orderId !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid orderId parameter." },
        { status: 400 }
      );
    }

    const cleanOrderId = orderId.trim();
    let order = await getOrder(cleanOrderId);

    // If order not found in file store/memory, restore from provided fallback data
    if (!order && email && (vrm || regNumber)) {
      order = await createOrder({
        customerName: (name || "Customer").trim(),
        customerEmail: email.trim(),
        regNumber: (vrm || regNumber).trim().toUpperCase(),
        planName: planName || "Full Comprehensive",
        price: price || "£54.99",
      });
      // Synchronize orderId
      order.orderId = cleanOrderId;
    }

    if (!order) {
      return NextResponse.json(
        { success: false, error: `Order #${cleanOrderId} not found.` },
        { status: 404 }
      );
    }

    const now = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Europe/London",
    }).format(new Date());

    // Deduplication: Avoid duplicate emails if customer refreshes /thank-you
    if (order.paymentEmailSentAt) {
      return NextResponse.json({
        success: true,
        alreadySent: true,
        orderId: cleanOrderId,
        emailSentAt: order.paymentEmailSentAt,
        message: "Payment confirmation email was already dispatched to the client.",
        order,
      });
    }

    // Dispatch the customer payment confirmation email (with 3-4 hours notice)
    const emailResult = await sendCustomerPaymentConfirmationEmail({
      orderId: cleanOrderId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      regNumber: order.regNumber,
      planName: order.planName,
      price: order.price,
      paymentDate: now,
      paymentMethod: paymentMethod || order.paymentMethod || "Online Checkout",
    });

    const emailSentTimestamp = emailResult.success ? new Date().toISOString() : undefined;

    // Update order status to processing and save payment confirmation
    const updatedOrder = await updateOrderStatus(cleanOrderId, "processing", {
      paymentConfirmedAt: new Date().toISOString(),
      paymentEmailSentAt: emailSentTimestamp,
      paymentMethod: paymentMethod || "Online Checkout",
      errorMessage: emailResult.success
        ? undefined
        : `Email delivery issue: ${emailResult.error}`,
    });

    if (!emailResult.success) {
      console.warn(`[PaymentSuccess] Email delivery failed for #${cleanOrderId}: ${emailResult.error}`);
      return NextResponse.json({
        success: false,
        orderId: cleanOrderId,
        error: emailResult.error || "Failed to dispatch email to client.",
        order: updatedOrder,
      }, { status: 500 });
    }

    console.log(`[PaymentSuccess] Confirmation email successfully sent to ${order.customerEmail} for order #${cleanOrderId}`);

    return NextResponse.json({
      success: true,
      orderId: cleanOrderId,
      message: "Payment confirmed. Email dispatched to client stating 3–4 hour delivery timeline.",
      order: updatedOrder,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error confirming payment";
    console.error("[PaymentSuccess Error]", msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId") || searchParams.get("order") || searchParams.get("ref");

  if (!orderId) {
    return NextResponse.json(
      { success: false, error: "Missing orderId query parameter." },
      { status: 400 }
    );
  }

  const cleanOrderId = orderId.trim();
  const order = await getOrder(cleanOrderId);

  if (!order) {
    return NextResponse.json(
      { success: false, error: `Order #${cleanOrderId} not found.` },
      { status: 404 }
    );
  }

  // Deduplication check
  if (order.paymentEmailSentAt) {
    return NextResponse.json({
      success: true,
      alreadySent: true,
      orderId: cleanOrderId,
      emailSentAt: order.paymentEmailSentAt,
      message: "Payment confirmation email was already dispatched to client.",
      order,
    });
  }

  const now = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/London",
  }).format(new Date());

  const emailResult = await sendCustomerPaymentConfirmationEmail({
    orderId: cleanOrderId,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    regNumber: order.regNumber,
    planName: order.planName,
    price: order.price,
    paymentDate: now,
    paymentMethod: order.paymentMethod || "Online Checkout",
  });

  const emailSentTimestamp = emailResult.success ? new Date().toISOString() : undefined;

  const updatedOrder = await updateOrderStatus(cleanOrderId, "processing", {
    paymentConfirmedAt: new Date().toISOString(),
    paymentEmailSentAt: emailSentTimestamp,
    errorMessage: emailResult.success ? undefined : `Email delivery issue: ${emailResult.error}`,
  });

  return NextResponse.json({
    success: emailResult.success,
    orderId: cleanOrderId,
    message: emailResult.success
      ? "Payment confirmed. Email dispatched to client stating 3–4 hour delivery timeline."
      : `Email dispatch failed: ${emailResult.error}`,
    order: updatedOrder,
  });
}
