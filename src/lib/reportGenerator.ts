import { getOrder, updateOrderStatus } from "@/lib/db";
import { sendCustomerReportEmail } from "@/lib/emailReport";
import { generatePdfReport } from "@/lib/pdf";
import { storePdfReport } from "@/lib/storage";
import { fetchVehicleData } from "@/lib/vehicleDataGlobal";

export async function generateReportForOrder(
  orderId: string,
  options: { sendEmail?: boolean } = {},
) {
  const order = await getOrder(orderId);
  if (!order) {
    throw new Error(`Order #${orderId} was not found.`);
  }

  if (order.status === "completed" && order.pdfUrl) {
    return { order, pdfUrl: order.pdfUrl, alreadyCompleted: true };
  }

  if (order.status === "processing") {
    return { order, pdfUrl: order.pdfUrl, alreadyProcessing: true };
  }

  await updateOrderStatus(orderId, "processing");

  try {
    console.log(`[GenerateReport] Fetching vehicle data for ${order.regNumber}...`);
    const vehicleData = await fetchVehicleData(order.regNumber);

    console.log(`[GenerateReport] Rendering PDF report for order #${orderId}...`);
    const pdfBuffer = await generatePdfReport(vehicleData);

    console.log(`[GenerateReport] Storing PDF report buffer (${pdfBuffer.length} bytes)...`);
    const pdfUrl = await storePdfReport(orderId, order.regNumber, pdfBuffer);
    const shouldSendEmail = options.sendEmail ?? true;
    let emailSentAt: string | undefined;
    let emailError: string | undefined;

    if (shouldSendEmail) {
      console.log(`[GenerateReport] Dispatching report email to ${order.customerEmail}...`);
      const emailResult = await sendCustomerReportEmail({
        customerEmail: order.customerEmail,
        customerName: order.customerName,
        regNumber: order.regNumber,
        orderId,
        pdfBuffer,
        downloadUrl: pdfUrl.startsWith("http") ? pdfUrl : undefined,
      });

      const emailCompletedAt = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/London",
      }).format(new Date());
      emailSentAt = emailResult.success ? emailCompletedAt : undefined;
      emailError = emailResult.success ? undefined : `Email delivery note: ${emailResult.error}`;
    }

    const completedAt = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Europe/London",
    }).format(new Date());

    const updatedOrder = await updateOrderStatus(orderId, "completed", {
      reportGeneratedAt: completedAt,
      pdfUrl,
      emailSentAt,
      errorMessage: emailError,
    });

    return { order: updatedOrder, pdfUrl, pdfBuffer, alreadyCompleted: false };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    await updateOrderStatus(orderId, "failed", { errorMessage });
    throw error;
  }
}