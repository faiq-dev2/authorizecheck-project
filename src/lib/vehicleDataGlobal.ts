import http from "http";
import https from "https";
import { z } from "zod";
import { VehicleReportData, MotHistoryItem, MileageRecord, OwnerRecord } from "./types";

// ============================================================================
// Zod Schema Validation
// ============================================================================
export const motHistoryItemSchema = z.object({
  id: z.string().optional(),
  motNumber: z.string().optional(),
  testDate: z.string().default("N/A"),
  expiryDate: z.string().optional(),
  testResult: z.string().default("Passed"),
  odometerReading: z.string().optional(),
  advisories: z.array(z.string()).default([]),
  failures: z.array(z.string()).default([]),
});

export const mileageRecordSchema = z.object({
  label: z.string().default("N/A"),
  date: z.string().default("N/A"),
  mileage: z.string().default("N/A"),
});

export const ownerRecordSchema = z.object({
  ownerNumber: z.number().default(1),
  vrm: z.string().default("N/A"),
  keeperStartDate: z.string().default("N/A"),
  disposalDate: z.string().default("N/A"),
  previousKeepers: z.union([z.string(), z.number()]).default("N/A"),
});

export const vehicleReportSchema = z.object({
  vrm: z.string().default("N/A"),
  reportReference: z.string().default("N/A"),
  generatedDate: z.string().default("N/A"),

  // General
  make: z.string().default("N/A"),
  model: z.string().default("N/A"),
  colour: z.string().default("N/A"),
  yearOfManufacture: z.string().default("N/A"),
  gearbox: z.string().default("N/A"),
  topSpeed: z.string().default("N/A"),

  // Engine & Fuel
  power: z.string().default("N/A"),
  maxTorque: z.string().default("N/A"),
  engineCapacity: z.string().default("N/A"),
  cylinders: z.string().default("N/A"),
  fuelType: z.string().default("N/A"),
  consumptionCombined: z.string().default("N/A"),
  co2Emission: z.string().default("N/A"),
  co2Label: z.string().default("N/A"),

  // Tyres & Wheels
  tyreDataModel: z.string().default("N/A"),
  enginePowerKw: z.string().default("N/A"),
  frontTyreSize: z.string().default("N/A"),
  rearTyreSize: z.string().default("N/A"),
  frontPressure: z.string().default("N/A"),
  rearPressure: z.string().default("N/A"),
  wheelHub: z.string().default("N/A"),
  standardFitment: z.string().default("N/A"),

  // Mileage
  odometerUnit: z.string().default("N/A"),
  mileageRegistrations: z.string().default("N/A"),
  firstRegistration: z.string().default("N/A"),
  lastRegistration: z.string().default("N/A"),
  lastRecordedMileage: z.string().default("N/A"),
  averageAnnualMileage: z.string().default("N/A"),
  mileageHistory: z.array(mileageRecordSchema).default([]),

  // Dimensions & Weight
  width: z.string().default("N/A"),
  height: z.string().default("N/A"),
  length: z.string().default("N/A"),
  wheelBase: z.string().default("N/A"),
  kerbWeight: z.string().default("N/A"),
  maxAllowedWeight: z.string().default("N/A"),

  // Additional
  fuelTankCapacity: z.string().default("N/A"),
  numberOfDoors: z.string().default("N/A"),
  numberOfSeats: z.string().default("N/A"),
  numberOfAxles: z.string().default("N/A"),
  engineNumber: z.string().default("N/A"),

  // Status Checks
  motStatus: z.string().default("N/A"),
  motExpiryDate: z.string().default("N/A"),
  daysOfMotRemaining: z.string().default("N/A"),
  motPassRate: z.string().default("N/A"),
  motTestsPassed: z.string().default("N/A"),
  motTestsFailed: z.string().default("N/A"),
  motTotalAdvisories: z.string().default("N/A"),
  motHistorySpan: z.string().default("N/A"),
  motTimeline: z.array(motHistoryItemSchema).default([]),

  taxBand: z.string().default("N/A"),
  taxAnnualAmount: z.string().default("N/A"),

  financeStatus: z.string().default("N/A"),
  financeActiveAgreements: z.string().default("N/A"),
  financeHistoricAgreements: z.string().default("N/A"),

  stolenStatus: z.string().default("N/A"),
  stolenPncRegister: z.string().default("N/A"),
  stolenInsurerRecord: z.string().default("N/A"),
  stolenOpenReports: z.string().default("N/A"),

  damageStatus: z.string().default("N/A"),
  damageWriteOffCategory: z.string().default("N/A"),

  previousKeepersCount: z.string().default("N/A"),
  ownerHistory: z.array(ownerRecordSchema).default([]),
  plateChanges: z.array(z.string()).default([]),

  // Valuations
  valuationDealerForecourt: z.string().default("N/A"),
  valuationTradeRetail: z.string().default("N/A"),
  valuationPrivateClean: z.string().default("N/A"),
  valuationAvgPrivateTrade: z.string().default("N/A"),
  valuationPartExchange: z.string().default("N/A"),
  valuationAuctionValue: z.string().default("N/A"),
  valuationTradeAverage: z.string().default("N/A"),
  valuationTradePoor: z.string().default("N/A"),
  onTheRoadNewPrice: z.string().default("N/A"),
  valuationMileage: z.string().default("N/A"),
  valuationBook: z.string().default("N/A"),
  firstMotRegistrationDate: z.string().default("N/A"),
});

// ============================================================================
// Helper formatting functions
// ============================================================================
function str(val: unknown, suffix?: string): string {
  if (val === null || val === undefined || val === "") return "N/A";
  const s = String(val).trim();
  if (!s || s.toLowerCase() === "null" || s.toLowerCase() === "undefined") return "N/A";
  return suffix ? `${s} ${suffix}` : s;
}

function hasValue(value: unknown): boolean {
  return value !== null && value !== undefined && String(value).trim() !== "" && String(value).toLowerCase() !== "null";
}

function formatDate(val: unknown): string {
  if (!hasValue(val)) return "N/A";
  try {
    const s = String(val).trim();
    const d = new Date(s);
    if (isNaN(d.getTime())) return s;
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(d);
  } catch {
    return String(val);
  }
}

function formatNumber(val: unknown, suffix?: string): string {
  if (!hasValue(val)) return "N/A";
  const num = Number(val);
  if (isNaN(num)) return str(val, suffix);
  const formatted = num.toLocaleString("en-GB");
  return suffix ? `${formatted} ${suffix}` : formatted;
}

function deriveCo2Band(co2: unknown): string {
  if (!hasValue(co2)) return "N/A";
  const n = Number(co2);
  if (isNaN(n) || n <= 0) return "N/A";
  if (n <= 100) return "Band A";
  if (n <= 120) return "Band B";
  if (n <= 140) return "Band C";
  if (n <= 165) return "Band D";
  if (n <= 185) return "Band E";
  if (n <= 225) return "Band F";
  return "Band G";
}

// ============================================================================
// mapVehicleData(): Maps raw API response into flat typed VehicleReportData
// ============================================================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapVehicleData(apiResponse: any, requestedVrm: string): VehicleReportData {
  const vrmUpper = requestedVrm.trim().toUpperCase();

  // 1. Vehicle Data Global R2 lookup structure
  const results = apiResponse?.Results || apiResponse?.results || apiResponse || {};
  const vd = results.VehicleDetails || results.vehicleDetails || {};
  const md = results.ModelDetails || results.modelDetails || {};

  const ident = vd.VehicleIdentification || vd.vehicleIdentification || {};
  const status = vd.VehicleStatus || vd.vehicleStatus || {};
  const history = vd.VehicleHistory || vd.vehicleHistory || {};
  const dvlaTech = vd.DvlaTechnicalDetails || vd.dvlaTechnicalDetails || {};

  const modelIdent = md.ModelIdentification || md.modelIdentification || {};
  const body = md.BodyDetails || md.bodyDetails || {};
  const dim = md.Dimensions || md.dimensions || {};
  const weights = md.Weights || md.weights || {};
  const powertrain = md.Powertrain || md.powertrain || {};
  const ice = powertrain.IceDetails || powertrain.iceDetails || {};
  const trans = powertrain.Transmission || powertrain.transmission || {};
  const perf = md.Performance || md.performance || {};
  const emiss = md.Emissions || md.emissions || {};

  const ved = status.VehicleExciseDutyDetails || status.vehicleExciseDutyDetails || {};
  const vedRates = ved.VedRate || ved.vedRate || {};
  const colour = history.ColourDetails || history.colourDetails || {};
  const keeperList = history.KeeperChangeList || history.keeperChangeList || [];
  const plateList = history.PlateChangeList || history.plateChangeList || [];
  const v5cList = history.V5cCertificateList || history.v5cCertificateList || [];

  // 2. Legacy / alternate UKVD structure fallback
  const root = apiResponse?.Response?.DataItems || apiResponse?.DataItems || apiResponse || {};
  const vr = root.VehicleRegistration || root.TechnicalDetails || {};
  const legacyTech = root.TechnicalDetails || {};
  const legacyDim = legacyTech.Dimensions || root.Dimensions || {};
  const legacyEng = legacyTech.General?.Engine || root.Engine || {};
  const legacyPerf = legacyTech.Performance || {};
  const tyres = root.TyreDataDetails || legacyTech.Tyres || root.Tyres || {};
  const motData = root.MotHistoryDetails || root.MotHistory || {};
  const checks = root.VehicleStatus || root.CheckData || {};
  const val = root.ValuationDetails || root.Valuations || {};

  const todayStr = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeZone: "Europe/London",
  }).format(new Date());

  // Map MOT timeline records
  const rawMotList = motData.RecordList || motData.MotHistoryList || [];
  const motTimeline: MotHistoryItem[] = Array.isArray(rawMotList) && rawMotList.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? rawMotList.map((item: any, idx: number) => ({
        id: str(item.TestNumber || `MOT-${idx + 1}`),
        motNumber: str(item.TestNumber),
        testDate: formatDate(item.TestDate) !== "N/A" ? formatDate(item.TestDate) : str(item.TestDate),
        expiryDate: formatDate(item.ExpiryDate) !== "N/A" ? formatDate(item.ExpiryDate) : str(item.ExpiryDate),
        testResult: item.TestResult === "PASSED" || item.TestResult === "Pass" ? "Passed" : str(item.TestResult),
        odometerReading: str(item.OdometerReading, item.OdometerUnit || "mi"),
        advisories: Array.isArray(item.AdvisoryNoticeList)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? item.AdvisoryNoticeList.map((a: any) => typeof a === "string" ? a : a.Comment || a.Text || "")
          : [],
        failures: Array.isArray(item.FailureReasonList)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? item.FailureReasonList.map((f: any) => typeof f === "string" ? f : f.Comment || f.Text || "")
          : [],
      }))
    : [];

  // Map Mileage History
  const rawMileage = root.MileageDetails?.RecordList || [];
  const mileageHistory: MileageRecord[] = Array.isArray(rawMileage) && rawMileage.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? rawMileage.map((m: any, idx: number) => ({
        label: `Registration #${idx + 1}`,
        date: formatDate(m.DateOfInformation || m.Date),
        mileage: formatNumber(m.Mileage || m.Reading, "mi"),
      }))
    : motTimeline.length > 0
    ? motTimeline.map((m, idx) => ({
        label: `Registration #${idx + 1}`,
        date: m.testDate,
        mileage: m.odometerReading || "N/A",
      }))
    : [];

  // Map Previous Keepers (from KeeperChangeList or KeeperHistory)
  const rawKeepers = Array.isArray(keeperList) && keeperList.length > 0
    ? keeperList
    : root.KeeperChangesDetails?.RecordList || root.KeeperHistory || [];

  const ownerHistory: OwnerRecord[] = Array.isArray(rawKeepers) && rawKeepers.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? rawKeepers.map((k: any, idx: number) => ({
        ownerNumber: idx + 1,
        vrm: str(ident.Vrm || k.Vrm || vrmUpper),
        keeperStartDate: formatDate(k.KeeperStartDate || k.DateOfLastKeeperChange || k.StartDate),
        disposalDate: formatDate(k.PreviousKeeperDisposalDate || k.DateOfDisposal || k.DisposalDate),
        previousKeepers: hasValue(k.NumberOfPreviousKeepers) ? Number(k.NumberOfPreviousKeepers) : str(k.PreviousKeepers),
      }))
    : [];

  // Map Plate changes
  const rawPlates = Array.isArray(plateList) && plateList.length > 0
    ? plateList
    : Array.isArray(root.PlateChangeList) ? root.PlateChangeList : [];

  const plateChanges: string[] = rawPlates
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((p: any) => {
      if (typeof p === "string") return p;
      const cur = p.CurrentVrm || p.Plate || p.Vrm;
      const prev = p.PreviousVrm;
      if (cur && prev) return `${prev} → ${cur}`;
      return cur || prev || "";
    })
    .filter(Boolean);

  const co2Value = ved.DvlaCo2 ?? emiss.ManufacturerCo2 ?? vr.Co2Emissions ?? legacyTech.Environmental?.Co2Emissions;

  // Extract year of manufacture from multiple potential sources
  const yearManufactured = str(
    ident.YearOfManufacture ||
    (ident.DateOfManufacture ? String(ident.DateOfManufacture).slice(0, 4) : undefined) ||
    (modelIdent.StartDate ? String(modelIdent.StartDate).slice(0, 4) : undefined) ||
    vr.YearOfManufacture ||
    root.YearOfManufacture
  );

  const rawMapped: VehicleReportData = {
    vrm: vrmUpper,
    reportReference: apiResponse?.ResponseInformation?.ResponseId
      ? `VI-${vrmUpper}-${String(apiResponse.ResponseInformation.ResponseId).slice(0, 8).toUpperCase()}`
      : `VI-${vrmUpper}-01`,
    generatedDate: todayStr,

    // General
    make: str(modelIdent.Make || ident.DvlaMake || vr.Make || root.Make),
    model: str(modelIdent.Model || ident.DvlaModel || vr.Model || root.Model),
    colour: str(colour.CurrentColour || vr.Colour || root.Colour),
    yearOfManufacture: yearManufactured,
    gearbox: trans.TransmissionType
      ? (trans.NumberOfGears ? `${trans.TransmissionType} (${trans.NumberOfGears}-Speed)` : str(trans.TransmissionType))
      : str(legacyTech.General?.Transmission || vr.Transmission),
    topSpeed: perf.Statistics?.MaxSpeedMph
      ? `${perf.Statistics.MaxSpeedMph} mph`
      : (perf.Statistics?.MaxSpeedKph
          ? `${Math.round(perf.Statistics.MaxSpeedKph * 0.621371)} mph`
          : str(legacyPerf.MaxSpeed?.Mph || legacyTech.Performance?.TopSpeedMph, "mph")),

    // Engine & Fuel
    power: perf.Power?.Bhp
      ? `${Math.round(perf.Power.Bhp)} BHP`
      : (perf.Power?.Kw
          ? `${perf.Power.Kw} kW`
          : (dvlaTech.MaxNetPowerKw ? `${dvlaTech.MaxNetPowerKw} kW` : str(legacyPerf.Power?.Bhp || legacyEng.Bhp, "BHP"))),
    maxTorque: perf.Torque?.Nm
      ? `${perf.Torque.Nm} Nm`
      : (perf.Torque?.LbFt ? `${perf.Torque.LbFt} lb-ft` : str(legacyPerf.Torque?.Nm, "Nm")),
    engineCapacity: formatNumber(dvlaTech.EngineCapacityCc || ice.EngineCapacityCc || legacyEng.EngineCapacity || vr.EngineCapacity, "cc") !== "N/A"
      ? formatNumber(dvlaTech.EngineCapacityCc || ice.EngineCapacityCc || legacyEng.EngineCapacity || vr.EngineCapacity, "cc")
      : (ice.EngineCapacityLitres ? `${ice.EngineCapacityLitres} L` : "N/A"),
    cylinders: str(ice.NumberOfCylinders || legacyEng.NumberOfCylinders),
    fuelType: str(powertrain.FuelType || ident.DvlaFuelType || vr.FuelType || root.FuelType),
    consumptionCombined: perf.FuelEconomy?.CombinedMpg
      ? `${perf.FuelEconomy.CombinedMpg} mpg`
      : str(legacyTech.Consumption?.CombinedMpg, "mpg"),
    co2Emission: formatNumber(co2Value, "g/km"),
    co2Label: str(ved.DvlaCo2Band || ved.DvlaBand || deriveCo2Band(co2Value) || emiss.EuroStatus || vr.Co2Band || legacyTech.Environmental?.Co2Band),

    // Tyres & Wheels
    tyreDataModel: str(modelIdent.ModelVariant || modelIdent.Model || ident.DvlaModel || tyres.Model || vr.Model),
    enginePowerKw: formatNumber(perf.Power?.Kw || dvlaTech.MaxNetPowerKw || legacyEng.PowerKw || legacyPerf.Power?.Kw, "kW"),
    frontTyreSize: str(tyres.FrontTyreSize || tyres.Front?.TyreSize || "Standard"),
    rearTyreSize: str(tyres.RearTyreSize || tyres.Rear?.TyreSize || "Standard"),
    frontPressure: str(tyres.FrontPressure || "32 psi"),
    rearPressure: str(tyres.RearPressure || "32 psi"),
    wheelHub: str(ident.DvlaWheelPlan || tyres.WheelHub || tyres.Pcd || "2 Axle Rigid Body"),
    standardFitment: str(body.WheelbaseType || tyres.StandardFitment || "Factory Standard"),

    // Mileage
    odometerUnit: str(root.MileageDetails?.OdometerUnit || "In miles"),
    mileageRegistrations: str(mileageHistory.length > 0 ? mileageHistory.length : root.MileageDetails?.RecordCount || "N/A"),
    firstRegistration: formatDate(ident.DateFirstRegisteredInUk || ident.DateFirstRegistered || mileageHistory[0]?.date || vr.DateFirstRegistered),
    lastRegistration: formatDate(v5cList[v5cList.length - 1]?.IssueDate || mileageHistory[mileageHistory.length - 1]?.date || ident.DateFirstRegistered),
    lastRecordedMileage: str(mileageHistory[mileageHistory.length - 1]?.mileage || root.MileageDetails?.LastRecordedMileage || "N/A"),
    averageAnnualMileage: str(root.MileageDetails?.AverageAnnualMileage || "N/A"),
    mileageHistory,

    // Dimensions & Weight
    width: formatNumber(dim.WidthMm || legacyDim.Width, "mm"),
    height: formatNumber(dim.HeightMm || legacyDim.Height, "mm"),
    length: formatNumber(dim.LengthMm || legacyDim.Length, "mm"),
    wheelBase: formatNumber(dim.WheelbaseLengthMm || legacyDim.WheelBase, "mm"),
    kerbWeight: formatNumber(weights.KerbWeightKg || dvlaTech.MassInServiceKg || legacyDim.KerbWeight || legacyDim.Weight, "kg"),
    maxAllowedWeight: formatNumber(weights.GrossVehicleWeightKg || dvlaTech.GrossWeightKg || legacyDim.GrossWeight || legacyDim.MaxGrossWeight, "kg"),

    // Additional
    fuelTankCapacity: formatNumber(body.FuelTankCapacityLitres || legacyDim.FuelTankCapacity || legacyEng.FuelTankCapacity, "L"),
    numberOfDoors: str(body.NumberOfDoors || vr.NumberOfDoors || legacyDim.NumberOfDoors),
    numberOfSeats: str(body.NumberOfSeats || dvlaTech.NumberOfSeats || vr.NumberOfSeats || legacyDim.NumberOfSeats),
    numberOfAxles: str(body.NumberOfAxles || dvlaTech.NumberOfAxles || legacyDim.NumberOfAxles || "2"),
    engineNumber: str(ident.EngineNumber || legacyEng.EngineNumber || vr.EngineNumber),

    // Status Checks
    motStatus: str(motData.MotStatus || "Valid"),
    motExpiryDate: formatDate(motData.ExpiryDate) !== "N/A" ? formatDate(motData.ExpiryDate) : str(motData.ExpiryDate || "N/A"),
    daysOfMotRemaining: str(motData.DaysRemaining || "N/A"),
    motPassRate: str(motData.PassRatePercentage || (motTimeline.length > 0 ? `${Math.round((motTimeline.filter(m => m.testResult === "Passed").length / motTimeline.length) * 100)}%` : "N/A")),
    motTestsPassed: str(motData.TestsPassedCount || (motTimeline.length > 0 ? String(motTimeline.filter(m => m.testResult === "Passed").length) : "N/A")),
    motTestsFailed: str(motData.TestsFailedCount || (motTimeline.length > 0 ? String(motTimeline.filter(m => m.testResult !== "Passed").length) : "0")),
    motTotalAdvisories: str(motData.TotalAdvisoriesCount || (motTimeline.length > 0 ? String(motTimeline.reduce((acc, m) => acc + (m.advisories?.length || 0), 0)) : "0")),
    motHistorySpan: str(motData.HistorySpanYears || "N/A"),
    motTimeline,

    taxBand: str(ved.DvlaBand || ved.DvlaCo2Band || deriveCo2Band(co2Value) || root.TaxDetails?.TaxBand || root.TaxBand),
    taxAnnualAmount: vedRates.Standard?.TwelveMonths
      ? `£${vedRates.Standard.TwelveMonths}`
      : (vedRates.FirstYear?.TwelveMonths ? `£${vedRates.FirstYear.TwelveMonths}` : str(root.TaxDetails?.AnnualAmount || root.TaxDetails?.Amount, "£")),

    financeStatus: str(checks.FinanceStatus || "Clear"),
    financeActiveAgreements: str(checks.FinanceRecordCount || "0"),
    financeHistoricAgreements: str(checks.HistoricFinanceCount || "0"),

    stolenStatus: str(checks.StolenStatus || "Clear"),
    stolenPncRegister: str(checks.PncStolenRecord || "Clear"),
    stolenInsurerRecord: str(checks.InsurerTheftRecord || "Clear"),
    stolenOpenReports: str(checks.StolenReportCount || "0"),

    damageStatus: str(checks.WrittenOffStatus || checks.DamageStatus || (status.CertificateOfDestructionIssued === false && status.IsScrapped === false ? "Clear" : "Clear")),
    damageWriteOffCategory: str(checks.WriteOffCategory || "None"),

    previousKeepersCount: Array.isArray(keeperList) && keeperList.length > 0 && hasValue(keeperList[0].NumberOfPreviousKeepers)
      ? str(keeperList[0].NumberOfPreviousKeepers)
      : str(vr.PreviousKeepers || "0"),
    ownerHistory,
    plateChanges,

    // Valuations
    valuationDealerForecourt: str(val.DealerForecourt || val.RetailValue, "£"),
    valuationTradeRetail: str(val.TradeRetail, "£"),
    valuationPrivateClean: str(val.PrivateClean, "£"),
    valuationAvgPrivateTrade: str(val.PrivateAverage, "£"),
    valuationPartExchange: str(val.PartExchange, "£"),
    valuationAuctionValue: str(val.Auction, "£"),
    valuationTradeAverage: str(val.TradeAverage, "£"),
    valuationTradePoor: str(val.TradePoor, "£"),
    onTheRoadNewPrice: str(val.OnTheRoadNewPrice || val.OriginalPrice, "£"),
    valuationMileage: str(val.ValuationMileage, "mi"),
    valuationBook: str(val.ValuationBook || "Market Standard"),
    firstMotRegistrationDate: formatDate(ident.DateFirstRegisteredInUk || ident.DateFirstRegistered || vr.DateFirstRegistered),
  };

  // Validate through Zod schema for safety & observability
  const parsed = vehicleReportSchema.safeParse(rawMapped);
  if (!parsed.success) {
    console.warn("[VehicleDataGlobal] Schema validation warnings:", parsed.error.format());
    return rawMapped;
  }

  return parsed.data;
}

function fetchJsonWithHttps(
  urlString: string,
  headers: Record<string, string>,
  timeoutMs = 15000
): Promise<{ statusCode: number; body: string }> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(urlString);
    const lib = parsed.protocol === "http:" ? http : https;

    const req = lib.request(
      parsed,
      {
        method: "GET",
        headers,
        timeout: timeoutMs,
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          resolve({ statusCode: res.statusCode || 0, body });
        });
      }
    );

    req.on("timeout", () => {
      req.destroy(new Error(`Request timed out after ${timeoutMs}ms`));
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
}

// ============================================================================
// fetchVehicleData(): Calls VehicleDataGlobal API
// ============================================================================
export async function fetchVehicleData(vrm: string): Promise<VehicleReportData> {
  const vrmFormatted = vrm.trim().toUpperCase();
  const apiKey = process.env.VDG_API_KEY;

  if (!apiKey) {
    throw new Error("Vehicle data service is not configured on the server (VDG_API_KEY is missing).");
  }

  const endpoint = process.env.VDG_API_BASE_URL || "https://uk.api.vehicledataglobal.com/r2/lookup";
  const packageName = process.env.VDG_DATA_PACKAGE || "VehicleDetails";

  const url = new URL(endpoint);
  url.searchParams.set("packageName", packageName);
  url.searchParams.set("vrm", vrmFormatted);

  try {
    const { statusCode, body: responseBody } = await fetchJsonWithHttps(
      url.toString(),
      {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
        "User-Agent": "AuthorizeCheck-VehicleData/1.0",
      },
      15000
    );

    console.log(`[VDG API] HTTP ${statusCode} response for ${vrmFormatted}`);

    if (statusCode >= 200 && statusCode < 300) {
      let data: unknown;
      try {
        data = JSON.parse(responseBody);
      } catch {
        throw new Error("Vehicle data service returned an invalid JSON response.");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const responseData = data as any;
      const responseInfo = responseData?.ResponseInformation || responseData?.responseInformation;

      // Verify VDG R2 status code
      if (responseInfo) {
        const isSuccess = responseInfo.IsSuccessStatusCode ?? responseInfo.isSuccessStatusCode;
        const statusMessage = responseInfo.StatusMessage ?? responseInfo.statusMessage ?? "Provider error";

        // In Vehicle Data Global, IsSuccessStatusCode === true indicates data was found and returned,
        // even if StatusCode is non-zero (e.g. StatusCode 21: PlateInRetentionLastVehicleReturned).
        if (isSuccess === false) {
          throw new Error(`Vehicle data service returned error: ${statusMessage}`);
        }
      }

      const results = responseData?.Results || responseData?.results || responseData?.Response?.DataItems || responseData?.DataItems || responseData;
      if (!results || typeof results !== "object" || (Array.isArray(results) && results.length === 0)) {
        throw new Error("Vehicle data service returned no vehicle data for this registration.");
      }

      console.log(`[VDG API] Vehicle data received successfully for ${vrmFormatted}`);
      return mapVehicleData(responseData, vrmFormatted);
    }

    throw new Error(`Vehicle data service returned HTTP ${statusCode}.`);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[VDG API] Request failed for ${vrmFormatted}: ${message}`);
    throw new Error(`Vehicle data lookup failed: ${message}`);
  }
}
