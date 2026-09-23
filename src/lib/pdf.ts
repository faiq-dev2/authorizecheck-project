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

  const tokens: Record<string, string> = {
    VRM: vrm,
    REPORT_REFERENCE: ref,
    GENERATED_DATE: genDate,
    FULL_NAME: fullName,
    MAKE: escapeHtml(data.make),
    MODEL: escapeHtml(data.model),
    COLOUR: escapeHtml(data.colour),
    YEAR: escapeHtml(data.yearOfManufacture),
    GEARBOX: escapeHtml(data.gearbox),
    TOP_SPEED: escapeHtml(data.topSpeed),
    POWER: escapeHtml(data.power),
    TORQUE: escapeHtml(data.maxTorque),
    ENGINE_CAPACITY: escapeHtml(data.engineCapacity),
    CYLINDERS: escapeHtml(data.cylinders),
    FUEL_TYPE: escapeHtml(data.fuelType),
    CONSUMPTION: escapeHtml(data.consumptionCombined),
    CO2_EMISSION: escapeHtml(data.co2Emission),
    CO2_LABEL: escapeHtml(data.co2Label),
    TYRE_MODEL: escapeHtml(data.tyreDataModel),
    ENGINE_POWER_KW: escapeHtml(data.enginePowerKw),
    FRONT_TYRE: escapeHtml(data.frontTyreSize),
    REAR_TYRE: escapeHtml(data.rearTyreSize),
    FRONT_PRESSURE: escapeHtml(data.frontPressure),
    REAR_PRESSURE: escapeHtml(data.rearPressure),
    WHEEL_HUB: escapeHtml(data.wheelHub),
    FITMENT: escapeHtml(data.standardFitment),
    MOT_STATUS: escapeHtml(data.motStatus),
    MOT_EXPIRY: escapeHtml(data.motExpiryDate),
    MOT_DAYS: escapeHtml(data.daysOfMotRemaining),
    MOT_PASS_RATE: escapeHtml(data.motPassRate),
    MOT_PASSED: escapeHtml(data.motTestsPassed),
    MOT_FAILED: escapeHtml(data.motTestsFailed),
    MOT_ADVISORIES: escapeHtml(data.motTotalAdvisories),
    MOT_HISTORY_SPAN: escapeHtml(data.motHistorySpan),
    FINANCE_STATUS: escapeHtml(data.financeStatus),
    FINANCE_ACTIVE: escapeHtml(data.financeActiveAgreements),
    FINANCE_HISTORIC: escapeHtml(data.financeHistoricAgreements),
    STOLEN_STATUS: escapeHtml(data.stolenStatus),
    STOLEN_PNC: escapeHtml(data.stolenPncRegister),
    STOLEN_INSURER: escapeHtml(data.stolenInsurerRecord),
    STOLEN_REPORTS: escapeHtml(data.stolenOpenReports),
    DAMAGE_STATUS: escapeHtml(data.damageStatus),
    WRITE_OFF_CATEGORY: escapeHtml(data.damageWriteOffCategory),
    KEEPERS: escapeHtml(data.previousKeepersCount),
    PLATE_CHANGE_STATUS: data.plateChanges.length ? "Records found" : "Clear",
    TAX_BAND: escapeHtml(data.taxBand),
    TAX_AMOUNT: escapeHtml(data.taxAnnualAmount),
    ODOMETER_UNIT: escapeHtml(data.odometerUnit),
    MILEAGE_REGISTRATIONS: escapeHtml(data.mileageRegistrations),
    FIRST_REGISTRATION: escapeHtml(data.firstRegistration),
    LAST_REGISTRATION: escapeHtml(data.lastRegistration),
    LAST_MILEAGE: escapeHtml(data.lastRecordedMileage),
    AVERAGE_MILEAGE: escapeHtml(data.averageAnnualMileage),
    WIDTH: escapeHtml(data.width),
    HEIGHT: escapeHtml(data.height),
    LENGTH: escapeHtml(data.length),
    WHEEL_BASE: escapeHtml(data.wheelBase),
    KERB_WEIGHT: escapeHtml(data.kerbWeight),
    MAX_WEIGHT: escapeHtml(data.maxAllowedWeight),
    FUEL_TANK: escapeHtml(data.fuelTankCapacity),
    DOORS: escapeHtml(data.numberOfDoors),
    SEATS: escapeHtml(data.numberOfSeats),
    AXLES: escapeHtml(data.numberOfAxles),
    ENGINE_NUMBER: escapeHtml(data.engineNumber),
    DEALER_FORECOURT: escapeHtml(data.valuationDealerForecourt),
    TRADE_RETAIL: escapeHtml(data.valuationTradeRetail),
    PRIVATE_CLEAN: escapeHtml(data.valuationPrivateClean),
    PRIVATE_TRADE: escapeHtml(data.valuationAvgPrivateTrade),
    PART_EXCHANGE: escapeHtml(data.valuationPartExchange),
    AUCTION_VALUE: escapeHtml(data.valuationAuctionValue),
    TRADE_AVERAGE: escapeHtml(data.valuationTradeAverage),
    TRADE_POOR: escapeHtml(data.valuationTradePoor),
    NEW_PRICE: escapeHtml(data.onTheRoadNewPrice),
    VALUATION_MILEAGE: escapeHtml(data.valuationMileage),
    VALUATION_BOOK: escapeHtml(data.valuationBook),
    FIRST_MOT_DATE: escapeHtml(data.firstMotRegistrationDate),
  };

  for (const [token, value] of Object.entries(tokens)) {
    html = html.replaceAll(`{{${token}}}`, value);
  }

  const motTimelineHtml = data.motTimeline.length
    ? data.motTimeline.map((item, index) => `<div class="mot-item"><div class="mot-item-head"><b>${escapeHtml(item.motNumber || item.id || `MOT #${index + 1}`)}</b><span class="mot-result-pass">${escapeHtml(item.testResult)}</span></div><div class="mot-date">Tested ${escapeHtml(item.testDate)} &middot; next expiry ${escapeHtml(item.expiryDate || "N/A")}</div>${(item.advisories || []).map((advisory) => `<div class="mot-advice"><b>Advisory</b>${escapeHtml(advisory)}</div>`).join("")}${(item.failures || []).map((failure) => `<div class="mot-advice"><b>Failure</b>${escapeHtml(failure)}</div>`).join("")}</div>`).join("")
    : `<div class="card" style="text-align:center;color:#7a869c;font-size:11px;">No MOT records available.</div>`;
  html = html.replace("{{MOT_TIMELINE}}", motTimelineHtml);

  const mileageRows = data.mileageHistory.length
    ? data.mileageHistory.map((item) => `<tr><td>${escapeHtml(item.label)}</td><td>${escapeHtml(item.date)}</td><td>${escapeHtml(item.mileage)}</td></tr>`).join("")
    : `<tr><td colspan="3" style="text-align:center;color:#7a869c;">N/A</td></tr>`;
  html = html.replace("{{MILEAGE_ROWS}}", mileageRows);

  const ownerCards = data.ownerHistory.length
    ? data.ownerHistory.map((owner) => `<div class="owner-card"><h4>Owner #${escapeHtml(String(owner.ownerNumber))}</h4><table class="info-table cols-1"><tbody><tr><th>VRM</th><td>${escapeHtml(owner.vrm)}</td></tr><tr><th>Keeper Start Date</th><td>${escapeHtml(owner.keeperStartDate)}</td></tr><tr><th>Disposal Date</th><td>${escapeHtml(owner.disposalDate)}</td></tr><tr><th>Previous Keepers</th><td>${escapeHtml(String(owner.previousKeepers))}</td></tr></tbody></table></div>`).join("")
    : `<div class="card" style="text-align:center;color:#7a869c;font-size:11px;">No keeper records available.</div>`;
  html = html.replace("{{OWNER_CARDS}}", ownerCards);

  const plateChanges = data.plateChanges.length
    ? data.plateChanges.map((plate) => `<div class="card" style="text-align:center;color:#55617a;font-size:11px;">${escapeHtml(plate)}</div>`).join("")
    : `<div class="card" style="text-align:center;color:#7a869c;font-size:11px;">No plate records available.</div>`;
  html = html.replace("{{PLATE_CHANGES}}", plateChanges);

  // Replace any legacy sample literals that remain in untouched chart or chrome markup.
  const legacyValues: Record<string, string> = {
    MF18OBG: vrm,
    "01 May 2026": genDate,
    "BMW i8": fullName,
    "BMW": escapeHtml(data.make),
    "i8 Coupe": escapeHtml(data.tyreDataModel),
    "i8 coupe": escapeHtml(data.tyreDataModel),
    "i8": escapeHtml(data.model),
    "Grey": escapeHtml(data.colour),
    "2018": escapeHtml(data.yearOfManufacture),
    "65,371 mi": escapeHtml(data.lastRecordedMileage),
    "195/50R20": escapeHtml(data.frontTyreSize),
    "215/45R20": escapeHtml(data.rearTyreSize),
    "13 Aug 2026": escapeHtml(data.motExpiryDate),
    "£103,810": escapeHtml(data.onTheRoadNewPrice),
    "73,731 mi": escapeHtml(data.valuationMileage),
    "A031P619": escapeHtml(data.engineNumber),
    "£33,239": escapeHtml(data.valuationDealerForecourt),
    "£31,304": escapeHtml(data.valuationTradeRetail),
    "£28,778": escapeHtml(data.valuationPrivateClean),
    "£27,864": escapeHtml(data.valuationAvgPrivateTrade),
    "£27,615": escapeHtml(data.valuationPartExchange),
    "£26,990": escapeHtml(data.valuationAuctionValue),
    "£26,059": escapeHtml(data.valuationTradeAverage),
    "£23,068": escapeHtml(data.valuationTradePoor),
  };
  for (const [legacyValue, dynamicValue] of Object.entries(legacyValues)) {
    if (dynamicValue && dynamicValue !== "N/A") {
      html = html.replaceAll(legacyValue, dynamicValue);
    }
  }

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
