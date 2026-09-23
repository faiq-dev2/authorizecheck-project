import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/db";
import { isAdminAuthorized } from "@/lib/adminAuth";
import { generateReportForOrder } from "@/lib/reportGenerator";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { regNumber, password } = body;

    if (!isAdminAuthorized(request, password)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!regNumber || typeof regNumber !== "string" || !regNumber.trim()) {
      return NextResponse.json(
        { success: false, error: "Vehicle registration number is required." },
        { status: 400 },
      );
    }

    const cleanRegNumber = regNumber.trim().toUpperCase().replace(/[^A-Z0-9 ]/g, "");
    if (cleanRegNumber.length < 2 || cleanRegNumber.length > 8) {
      return NextResponse.json(
        { success: false, error: "Enter a valid vehicle registration number." },
        { status: 400 },
      );
    }

    const order = await createOrder({
      customerName: "Admin Generated Report",
      customerEmail: "admin-generated@authorizecheck.local",
      regNumber: cleanRegNumber,
      planId: "full",
      planName: "Full Comprehensive",
      price: "£54.99",
    });

    const result = await generateReportForOrder(order.orderId, { sendEmail: false });
    if (result.alreadyProcessing) {
      return NextResponse.json(
        { success: false, orderId: order.orderId, status: "processing", error: "Report generation is already in progress." },
        { status: 409 },
      );
    }

    const filename = `AuthorizeCheck-Report-${cleanRegNumber}.pdf`;
    const pdfBase64 = result.pdfBuffer ? result.pdfBuffer.toString("base64") : undefined;

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      status: "completed",
      filename,
      pdfBase64,
      pdfUrl: result.pdfUrl,
      downloadUrl: `/api/download-report?orderId=${encodeURIComponent(order.orderId)}`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to generate report.";
    console.error("[Admin Generate Report Error]", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}