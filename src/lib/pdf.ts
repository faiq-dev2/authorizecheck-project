import fs from "fs";
import path from "path";
import puppeteer, { Browser } from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { VehicleReportData } from "./types";

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function renderReportHtml(data: VehicleReportData): string {
  const templatePath = path.join(process.cwd(), "reports", "vehicle-report-template.html");
  let html = fs.readFileSync(templatePath, "utf-8");

  const vrm = escapeHtml(data.vrm);
  const fullName = escapeHtml(`${data.make} ${data.model}`.trim());
  const ref = escapeHtml(data.reportReference);
  const genDate = escapeHtml(data.generatedDate);

  // 1. Replace Global Header / Footer VRM & Plate mentions
  html = html.replace(/<div class="pg-reg">MF18OBG<\/div>/g, `<div class="pg-reg">${vrm}</div>`);
  html = html.replace(/<span>Vehicle Intelligence Report &middot; MF18OBG<\/span>/g, `<span>Vehicle Intelligence Report &middot; ${vrm}</span>`);
  html = html.replace(/<title>Vehicle Intelligence Report &mdash; MF18OBG<\/title>/g, `<title>Vehicle Intelligence Report &mdash; ${vrm}</title>`);
  html = html.replace(/Generated 01 May 2026/g, `Generated ${genDate}`);
  html = html.replace(/VI-MF18OBG-01/g, ref);

  // 2. Cover Page Replacements
  html = html.replace(
    /<div class="cover-title">Everything on record for <span>BMW i8<\/span><\/div>/g,
    `<div class="cover-title">Everything on record for <span>${fullName}</span></div>`
  );
  html = html.replace(
    /<div class="cover-plate">MF18OBG<\/div>/g,
    `<div class="cover-plate">${vrm}</div>`
  );
  html = html.replace(
    /<div class="cover-vehicle-name">BMW i8 &middot; 2018 &middot; Grey<\/div>/g,
    `<div class="cover-vehicle-name">${fullName} &middot; ${escapeHtml(data.yearOfManufacture)} &middot; ${escapeHtml(data.colour)}</div>`
  );
  html = html.replace(
    /<div class="cover-vehicle-sub">Report generated 01 May 2026<\/div>/g,
    `<div class="cover-vehicle-sub">Report generated ${genDate}</div>`
  );
  html = html.replace(
    /<div class="cover-bottom-item">Registration<b>MF18OBG<\/b><\/div>/g,
    `<div class="cover-bottom-item">Registration<b>${vrm}</b></div>`
  );

  // 3. Executive Summary
  html = html.replace(
    /<p class="sec-sub">Headline results across every check we ran on MF18OBG<\/p>/g,
    `<p class="sec-sub">Headline results across every check we ran on ${vrm}</p>`
  );
  html = html.replace(
    /<div class="stat-tile-value">BMW i8<\/div>\s*<div class="stat-tile-label">Make & Model<\/div>/g,
    `<div class="stat-tile-value">${fullName}</div><div class="stat-tile-label">Make & Model</div>`
  );
  html = html.replace(
    /<div class="stat-tile-value">2018<\/div>\s*<div class="stat-tile-label">Year of Manufacture<\/div>/g,
    `<div class="stat-tile-value">${escapeHtml(data.yearOfManufacture)}</div><div class="stat-tile-label">Year of Manufacture</div>`
  );
  html = html.replace(
    /<div class="stat-tile-value">65,371 mi<\/div>\s*<div class="stat-tile-label">Last Recorded Mileage<\/div>/g,
    `<div class="stat-tile-value">${escapeHtml(data.lastRecordedMileage)}</div><div class="stat-tile-label">Last Recorded Mileage</div>`
  );
  html = html.replace(
    /<div class="stat-tile-value">2<\/div>\s*<div class="stat-tile-label">Previous Keepers<\/div>/g,
    `<div class="stat-tile-value">${escapeHtml(data.previousKeepersCount)}</div><div class="stat-tile-label">Previous Keepers</div>`
  );

  // 4. General Information Table
  html = html.replace(
    /<tr><th>Make<\/th><td>BMW<\/td><\/tr><tr><th>Model<\/th><td>i8<\/td><\/tr><tr><th>Colour<\/th><td>Grey<\/td><\/tr><tr><th>Year of Manufacture<\/th><td>2018<\/td><\/tr><tr><th>Gearbox<\/th><td>6 speed Automatic<\/td><\/tr><tr><th>Top Speed<\/th><td>155 mph<\/td><\/tr>/g,
    `<tr><th>Make</th><td>${escapeHtml(data.make)}</td></tr><tr><th>Model</th><td>${escapeHtml(data.model)}</td></tr><tr><th>Colour</th><td>${escapeHtml(data.colour)}</td></tr><tr><th>Year of Manufacture</th><td>${escapeHtml(data.yearOfManufacture)}</td></tr><tr><th>Gearbox</th><td>${escapeHtml(data.gearbox)}</td></tr><tr><th>Top Speed</th><td>${escapeHtml(data.topSpeed)}</td></tr>`
  );

  // 5. Engine & Fuel Consumption
  html = html.replace(
    /<tr><th>Power<\/th><td>357 BHP<\/td><\/tr><tr><th>Max\. Torque<\/th><td>570 Nm at 3,700 rpm<\/td><\/tr><tr><th>Engine Capacity<\/th><td>1499 cc<\/td><\/tr><tr><th>Cylinders<\/th><td>3<\/td><\/tr><tr><th>Fuel Type<\/th><td>Petrol \/ Electric<\/td><\/tr><tr><th>Consumption Combined<\/th><td>134\.5 mpg<\/td><\/tr><tr><th>CO2 Emission<\/th><td>49 g\/km<\/td><\/tr><tr><th>CO2 Label<\/th><td>A<\/td><\/tr>/g,
    `<tr><th>Power</th><td>${escapeHtml(data.power)}</td></tr><tr><th>Max. Torque</th><td>${escapeHtml(data.maxTorque)}</td></tr><tr><th>Engine Capacity</th><td>${escapeHtml(data.engineCapacity)}</td></tr><tr><th>Cylinders</th><td>${escapeHtml(data.cylinders)}</td></tr><tr><th>Fuel Type</th><td>${escapeHtml(data.fuelType)}</td></tr><tr><th>Consumption Combined</th><td>${escapeHtml(data.consumptionCombined)}</td></tr><tr><th>CO2 Emission</th><td>${escapeHtml(data.co2Emission)}</td></tr><tr><th>CO2 Label</th><td>${escapeHtml(data.co2Label)}</td></tr>`
  );

  // 6. Tyres & Wheels
  html = html.replace(
    /<tr><th>Tyre Data Model<\/th><td>i8 Coupe<\/td><\/tr><tr><th>Engine Power \(kW\)<\/th><td>266 kW<\/td><\/tr><tr><th>Standard Fitment<\/th><td>Yes<\/td><\/tr>/g,
    `<tr><th>Tyre Data Model</th><td>${escapeHtml(data.tyreDataModel)}</td></tr><tr><th>Engine Power (kW)</th><td>${escapeHtml(data.enginePowerKw)}</td></tr><tr><th>Standard Fitment</th><td>${escapeHtml(data.standardFitment)}</td></tr>`
  );
  html = html.replace(
    /<tr><th>Front Tyre Size<\/th><td>195\/50R20<\/td><\/tr><tr><th>Rear Tyre Size<\/th><td>215\/45R20<\/td><\/tr><tr><th>Front Pressure<\/th><td>2\.20 bar \/ 32\.00 psi<\/td><\/tr><tr><th>Rear Pressure<\/th><td>2\.20 bar \/ 32\.00 psi<\/td><\/tr><tr><th>Wheel \/ Hub<\/th><td>PCD 5x112 \| Centre bore 66\.70 mm<\/td><\/tr>/g,
    `<tr><th>Front Tyre Size</th><td>${escapeHtml(data.frontTyreSize)}</td></tr><tr><th>Rear Tyre Size</th><td>${escapeHtml(data.rearTyreSize)}</td></tr><tr><th>Front Pressure</th><td>${escapeHtml(data.frontPressure)}</td></tr><tr><th>Rear Pressure</th><td>${escapeHtml(data.rearPressure)}</td></tr><tr><th>Wheel / Hub</th><td>${escapeHtml(data.wheelHub)}</td></tr>`
  );

  // 7. Dimensions & Weight
  html = html.replace(
    /<tr><th>Width<\/th><td>1,942 mm<\/td><\/tr><tr><th>Height<\/th><td>1,297 mm<\/td><\/tr><tr><th>Length<\/th><td>4,689 mm<\/td><\/tr><tr><th>Wheel Base<\/th><td>2,800 mm<\/td><\/tr><tr><th>Kerb Weight<\/th><td>1,485 kg<\/td><\/tr><tr><th>Max\. Allowed Weight<\/th><td>1,870 kg<\/td><\/tr>/g,
    `<tr><th>Width</th><td>${escapeHtml(data.width)}</td></tr><tr><th>Height</th><td>${escapeHtml(data.height)}</td></tr><tr><th>Length</th><td>${escapeHtml(data.length)}</td></tr><tr><th>Wheel Base</th><td>${escapeHtml(data.wheelBase)}</td></tr><tr><th>Kerb Weight</th><td>${escapeHtml(data.kerbWeight)}</td></tr><tr><th>Max. Allowed Weight</th><td>${escapeHtml(data.maxAllowedWeight)}</td></tr>`
  );

  // 8. Additional Information
  html = html.replace(
    /<tr><th>Fuel Tank Capacity<\/th><td>42 L<\/td><\/tr><tr><th>Number of Doors<\/th><td>3<\/td><\/tr><tr><th>Number of Seats<\/th><td>4<\/td><\/tr><tr><th>Number of Axles<\/th><td>2<\/td><\/tr><tr><th>Engine Number<\/th><td>A031P619<\/td><\/tr>/g,
    `<tr><th>Fuel Tank Capacity</th><td>${escapeHtml(data.fuelTankCapacity)}</td></tr><tr><th>Number of Doors</th><td>${escapeHtml(data.numberOfDoors)}</td></tr><tr><th>Number of Seats</th><td>${escapeHtml(data.numberOfSeats)}</td></tr><tr><th>Number of Axles</th><td>${escapeHtml(data.numberOfAxles)}</td></tr><tr><th>Engine Number</th><td>${escapeHtml(data.engineNumber)}</td></tr>`
  );

  // 9. Mileage Check
  html = html.replace(
    /<tr><th>Odometer Unit<\/th><td>In miles<\/td><\/tr><tr><th>Mileage Registrations<\/th><td>5<\/td><\/tr><tr><th>First Registration<\/th><td>18 Jun 2021<\/td><\/tr><tr><th>Last Registration<\/th><td>13 Aug 2025<\/td><\/tr>/g,
    `<tr><th>Odometer Unit</th><td>${escapeHtml(data.odometerUnit)}</td></tr><tr><th>Mileage Registrations</th><td>${escapeHtml(data.mileageRegistrations)}</td></tr><tr><th>First Registration</th><td>${escapeHtml(data.firstRegistration)}</td></tr><tr><th>Last Registration</th><td>${escapeHtml(data.lastRegistration)}</td></tr>`
  );

  // 10. Valuation
  html = html.replace(
    /<tr><th>On The Road \(new\)<\/th><td>£103,810<\/td><\/tr><tr><th>Valuation Mileage<\/th><td>73,731 mi<\/td><\/tr>/g,
    `<tr><th>On The Road (new)</th><td>${escapeHtml(data.onTheRoadNewPrice)}</td></tr><tr><th>Valuation Mileage</th><td>${escapeHtml(data.valuationMileage)}</td></tr>`
  );

  return html;
}

export async function generatePdfReport(data: VehicleReportData): Promise<Buffer> {
  const htmlContent = renderReportHtml(data);

  let browser: Browser;

  // Resolve executable path: Windows Chrome in local dev, @sparticuz/chromium on Vercel/Linux
  if (process.platform === "win32") {
    const localChromeCandidates = [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    ];
    const executablePath = localChromeCandidates.find((p) => fs.existsSync(p));
    if (!executablePath) {
      throw new Error("No Chrome or Edge browser executable found on Windows host for local PDF generation.");
    }
    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
  } else {
    // Vercel Serverless / AWS Lambda Linux environment
    const executablePath = await chromium.executablePath();
    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
      defaultViewport: { width: 1200, height: 800 },
    });
  }

  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, {
      waitUntil: "load",
      timeout: 30000,
    });

    const pdfUint8Array = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
    });

    return Buffer.from(pdfUint8Array);
  } finally {
    await browser.close();
  }
}
