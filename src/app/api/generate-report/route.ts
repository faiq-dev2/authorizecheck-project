import { NextRequest, NextResponse } from "next/server";
import { getOrder, updateOrderStatus } from "@/lib/db";
import { fetchVehicleData } from "@/lib/vehicleDataGlobal";
import { generatePdfReport } from "@/lib/pdf";
import { storePdfReport } from "@/lib/storage";
import { sendCustomerReportEmail } from "@/lib/emailReport";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // 60 seconds max duration on Vercel Serverless

export async function POST(request: NextRequest) {
  let targetOrderId = "";

  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId || typeof orderId !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid orderId parameter." },
        { status: 400 }
      );
    }

    targetOrderId = orderId.trim();
    const order = await getOrder(targetOrderId);

    if (!order) {
      return NextResponse.json(
        { success: false, error: `Order #${targetOrderId} was not found.` },
        { status: 404 }
      );
    }

    // If order already completed, return existing report URL immediately
    if (order.status === "completed" && order.pdfUrl) {
      return NextResponse.json({
        success: true,
        orderId: targetOrderId,
        status: "completed",
        pdfUrl: order.pdfUrl,
        message: "Report was already generated for this order.",
      });
    }

    // Step 1: Mark order processing
    await updateOrderStatus(targetOrderId, "processing");

    // Step 2: Fetch vehicle data from VehicleDataGlobal API
    console.log(`[GenerateReport] Fetching vehicle data for ${order.regNumber}...`);
    const vehicleData = await fetchVehicleData(order.regNumber);

    // Step 3: Render HTML template and generate PDF buffer via serverless Chromium
    console.log(`[GenerateReport] Rendering PDF report for order #${targetOrderId}...`);
    const pdfBuffer = await generatePdfReport(vehicleData);

    // Step 4: Upload PDF to storage (Vercel Blob / local fallback)
    console.log(`[GenerateReport] Storing PDF report buffer (${pdfBuffer.length} bytes)...`);
    const pdfUrl = await storePdfReport(targetOrderId, order.regNumber, pdfBuffer);

    // Step 5: Email PDF report to customer
    console.log(`[GenerateReport] Dispatching report email to ${order.customerEmail}...`);
    const emailResult = await sendCustomerReportEmail({
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      regNumber: order.regNumber,
      orderId: targetOrderId,
      pdfBuffer,
      downloadUrl: pdfUrl.startsWith("http") ? pdfUrl : undefined,
    });

    // Step 6: Mark order completed
    const completedAt = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Europe/London",
    }).format(new Date());

    const updatedOrder = await updateOrderStatus(targetOrderId, "completed", {
      reportGeneratedAt: completedAt,
      pdfUrl,
      emailSentAt: emailResult.success ? completedAt : undefined,
      errorMessage: emailResult.success ? undefined : `Email delivery note: ${emailResult.error}`,
    });

    console.log(`[GenerateReport] Order #${targetOrderId} successfully completed!`);

    return NextResponse.json({
      success: true,
      orderId: targetOrderId,
      status: "completed",
      pdfUrl,
      order: updatedOrder,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[GenerateReport Error for ${targetOrderId}]`, errorMsg);

    // Never leave an order stuck in "processing" state
    if (targetOrderId) {
      await updateOrderStatus(targetOrderId, "failed", {
        errorMessage: errorMsg,
      });
    }

    return NextResponse.json(
      {
        success: false,
        orderId: targetOrderId,
        status: "failed",
        error: errorMsg,
      },
      { status: 500 }
    );
  }
}
