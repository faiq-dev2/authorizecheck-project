export type OrderStatus = "pending" | "processing" | "completed" | "failed";

export interface Order {
  orderId: string;
  customerName: string;
  customerEmail: string;
  regNumber: string;
  planId: string;
  planName: string;
  price: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  reportGeneratedAt?: string;
  pdfUrl?: string;
  emailSentAt?: string;
  errorMessage?: string;
}

export interface MotHistoryItem {
  id?: string;
  motNumber?: string;
  testDate: string;
  expiryDate?: string;
  testResult: "Passed" | "Failed" | string;
  odometerReading?: string;
  advisories: string[];
  failures?: string[];
}

export interface MileageRecord {
  label: string;
  date: string;
  mileage: string;
}

export interface OwnerRecord {
  ownerNumber: number;
  vrm: string;
  keeperStartDate: string;
  disposalDate: string;
  previousKeepers: number | string;
}

export interface VehicleReportData {
  // Identification
  vrm: string;
  reportReference: string;
  generatedDate: string;

  // General
  make: string;
  model: string;
  colour: string;
  yearOfManufacture: string;
  gearbox: string;
  topSpeed: string;

  // Engine & Fuel
  power: string;
  maxTorque: string;
  engineCapacity: string;
  cylinders: string;
  fuelType: string;
  consumptionCombined: string;
  co2Emission: string;
  co2Label: string;

  // Tyres & Wheels
  tyreDataModel: string;
  enginePowerKw: string;
  frontTyreSize: string;
  rearTyreSize: string;
  frontPressure: string;
  rearPressure: string;
  wheelHub: string;
  standardFitment: string;

  // Mileage
  odometerUnit: string;
  mileageRegistrations: string;
  firstRegistration: string;
  lastRegistration: string;
  lastRecordedMileage: string;
  averageAnnualMileage: string;
  mileageHistory: MileageRecord[];

  // Dimensions & Weight
  width: string;
  height: string;
  length: string;
  wheelBase: string;
  kerbWeight: string;
  maxAllowedWeight: string;

  // Additional
  fuelTankCapacity: string;
  numberOfDoors: string;
  numberOfSeats: string;
  numberOfAxles: string;
  engineNumber: string;

  // Status Checks
  motStatus: string;
  motExpiryDate: string;
  daysOfMotRemaining: string;
  motPassRate: string;
  motTestsPassed: string;
  motTestsFailed: string;
  motTotalAdvisories: string;
  motHistorySpan: string;
  motTimeline: MotHistoryItem[];

  taxBand: string;
  taxAnnualAmount: string;

  financeStatus: string;
  financeActiveAgreements: string;
  financeHistoricAgreements: string;

  stolenStatus: string;
  stolenPncRegister: string;
  stolenInsurerRecord: string;
  stolenOpenReports: string;

  damageStatus: string;
  damageWriteOffCategory: string;

  previousKeepersCount: string;
  ownerHistory: OwnerRecord[];
  plateChanges: string[];

  // Valuations
  valuationDealerForecourt: string;
  valuationTradeRetail: string;
  valuationPrivateClean: string;
  valuationAvgPrivateTrade: string;
  valuationPartExchange: string;
  valuationAuctionValue: string;
  valuationTradeAverage: string;
  valuationTradePoor: string;
  onTheRoadNewPrice: string;
  valuationMileage: string;
  valuationBook: string;
  firstMotRegistrationDate: string;
}
