import { NextRequest, NextResponse } from "next/server";
import { generateReportForOrder } from "@/lib/reportGenerator";

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
    const result = await generateReportForOrder(targetOrderId);

    if (result.alreadyProcessing) {
      return NextResponse.json(
        { success: false, orderId: targetOrderId, status: "processing", error: "Report generation is already in progress." },
        { status: 409 },
      );
    }

    console.log(`[GenerateReport] Order #${targetOrderId} successfully completed!`);

    return NextResponse.json({
      success: true,
      orderId: targetOrderId,
      status: "completed",
      pdfUrl: result.pdfUrl,
      order: result.order,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[GenerateReport Error for ${targetOrderId}]`, errorMsg);

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
