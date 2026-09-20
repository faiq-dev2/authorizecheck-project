import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";

export async function storePdfReport(
  orderId: string,
  regNumber: string,
  pdfBuffer: Buffer
): Promise<string> {
  const cleanVrm = regNumber.replace(/[^A-Z0-9]/gi, "").toUpperCase();
  const filename = `vehicle-report-${cleanVrm}-${orderId}.pdf`;

  // 1. If Vercel Blob storage token is configured, upload to cloud Blob storage
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await put(`reports/${filename}`, pdfBuffer, {
        access: "public",
        contentType: "application/pdf",
      });
      console.log(`[Storage] Uploaded PDF to Vercel Blob: ${blob.url}`);
      return blob.url;
    } catch (err) {
      console.error("[Storage] Vercel Blob upload failed, falling back to local/tmp:", err);
    }
  }

  // 2. Local development fallback: write to public/reports directory
  try {
    const publicReportsDir = path.join(process.cwd(), "public", "reports");
    if (!fs.existsSync(publicReportsDir)) {
      fs.mkdirSync(publicReportsDir, { recursive: true });
    }
    const filePath = path.join(publicReportsDir, filename);
    fs.writeFileSync(filePath, pdfBuffer);
    console.log(`[Storage] Saved PDF locally to ${filePath}`);
    return `/reports/${filename}`;
  } catch (err) {
    console.warn("[Storage] Could not write to public/reports, trying /tmp:", err);
    try {
      const tmpPath = path.join("/tmp", filename);
      fs.writeFileSync(tmpPath, pdfBuffer);
      return `/api/download-report?orderId=${encodeURIComponent(orderId)}`;
    } catch {
      return `/api/download-report?orderId=${encodeURIComponent(orderId)}`;
    }
  }
}
