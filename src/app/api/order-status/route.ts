import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Missing orderId query parameter." },
        { status: 400 }
      );
    }

    const order = await getOrder(orderId.trim());
    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      status: order.status,
      regNumber: order.regNumber,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      planName: order.planName,
      price: order.price,
      reportGeneratedAt: order.reportGeneratedAt,
      pdfUrl: order.pdfUrl,
      emailSentAt: order.emailSentAt,
      errorMessage: order.errorMessage,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error retrieving order status";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
