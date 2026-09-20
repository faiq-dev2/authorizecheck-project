import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, regNumber, planId, planName, price } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Customer name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!regNumber || typeof regNumber !== "string" || !regNumber.trim()) {
      return NextResponse.json(
        { success: false, error: "Vehicle registration number is required." },
        { status: 400 }
      );
    }

    const order = await createOrder({
      customerName: name.trim(),
      customerEmail: email.trim(),
      regNumber: regNumber.trim().toUpperCase(),
      planId: planId || "full",
      planName: planName || "Full Comprehensive",
      price: price || "£54.99",
    });

    return NextResponse.json(
      {
        success: true,
        orderId: order.orderId,
        order,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error creating order";
    console.error("[Create Order Error]", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
