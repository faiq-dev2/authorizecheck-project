import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/db";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId parameter" }, { status: 400 });
    }

    const order = await getOrder(orderId.trim());
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (!order.pdfUrl) {
      return NextResponse.json({ error: "Report has not yet been generated for this order" }, { status: 404 });
    }

    // If external Blob storage URL, redirect directly
    if (order.pdfUrl.startsWith("http")) {
      return NextResponse.redirect(order.pdfUrl);
    }

    // If local file path
    const candidatePaths = [
      path.join(process.cwd(), "public", order.pdfUrl.replace(/^\//, "")),
      path.join(process.cwd(), "public", "reports", `vehicle-report-${order.regNumber}-${order.orderId}.pdf`),
      path.join("/tmp", `vehicle-report-${order.regNumber}-${order.orderId}.pdf`),
    ];

    const foundPath = candidatePaths.find((p) => fs.existsSync(p));
    if (!foundPath) {
      return NextResponse.json({ error: "PDF report file not found on server." }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(foundPath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="AuthorizeCheck-Report-${order.regNumber}.pdf"`,
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error downloading report";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
