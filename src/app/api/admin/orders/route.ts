import { NextRequest, NextResponse } from "next/server";
import { listAllOrders, getOrder } from "@/lib/db";
import { isAdminAuthorized } from "@/lib/adminAuth";
import { generateReportForOrder } from "@/lib/reportGenerator";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const orders = await listAllOrders();
  return NextResponse.json({ success: true, orders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, action, password } = body;

    if (!isAdminAuthorized(request, password)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!orderId) {
      return NextResponse.json({ success: false, error: "Missing orderId" }, { status: 400 });
    }

    const order = await getOrder(orderId.trim());
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    if (action === "send_payment_confirmation") {
      const { sendCustomerPaymentConfirmationEmail } = await import("@/lib/customerPaymentEmail");
      const { updateOrderStatus } = await import("@/lib/db");
      
      const emailResult = await sendCustomerPaymentConfirmationEmail({
        orderId: order.orderId,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        regNumber: order.regNumber,
        planName: order.planName,
        price: order.price,
      });

      if (!emailResult.success) {
        return NextResponse.json(
          { success: false, error: emailResult.error || "Failed to send email to client." },
          { status: 500 }
        );
      }

      const updated = await updateOrderStatus(order.orderId, order.status, {
        paymentEmailSentAt: new Date().toISOString(),
        paymentConfirmedAt: order.paymentConfirmedAt || new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: `Payment confirmation email (3–4 hours delivery) sent to ${order.customerEmail}.`,
        order: updated,
      });
    }

    if (action === "mark_paid_generate") {
      const result = await generateReportForOrder(order.orderId);
      return NextResponse.json({
        success: true,
        message: "Report generated and dispatched successfully.",
        result,
      });
    }

    return NextResponse.json({ success: false, error: "Unsupported action." }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Admin action error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
