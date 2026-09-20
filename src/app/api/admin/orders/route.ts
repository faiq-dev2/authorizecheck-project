import { NextRequest, NextResponse } from "next/server";
import { listAllOrders, getOrder } from "@/lib/db";

export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest, bodyPassword?: string): boolean {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredPassword) return true; // Default to open in dev if not set

  const headerPassword = request.headers.get("x-admin-password");
  const queryPassword = new URL(request.url).searchParams.get("password");

  return (
    headerPassword === configuredPassword ||
    queryPassword === configuredPassword ||
    bodyPassword === configuredPassword
  );
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const orders = await listAllOrders();
  return NextResponse.json({ success: true, orders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, action, password } = body;

    if (!isAuthorized(request, password)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!orderId) {
      return NextResponse.json({ success: false, error: "Missing orderId" }, { status: 400 });
    }

    const order = await getOrder(orderId.trim());
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    if (action === "mark_paid_generate") {
      // Trigger internal generate-report call
      const origin = request.nextUrl.origin;
      const genRes = await fetch(`${origin}/api/generate-report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.orderId }),
      });

      const genData = await genRes.json();
      return NextResponse.json({
        success: genRes.ok,
        message: genRes.ok ? "Report generated and dispatched successfully." : genData.error,
        result: genData,
      });
    }

    return NextResponse.json({ success: false, error: "Unsupported action." }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Admin action error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
