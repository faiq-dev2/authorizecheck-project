import fs from "fs";
import path from "path";
import { Order, OrderStatus } from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

// In-memory cache for fast access and serverless persistence within execution context
let ordersMemory: Record<string, Order> = {};

function ensureFileStore(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify({}, null, 2), "utf-8");
    } else {
      const raw = fs.readFileSync(ORDERS_FILE, "utf-8");
      if (raw.trim()) {
        ordersMemory = JSON.parse(raw);
      }
    }
  } catch (err) {
    console.warn("[DB] Note: Using memory store (local filesystem unavailable in read-only environment):", err);
  }
}

// Initial load
ensureFileStore();

function persistToFile(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(ordersMemory, null, 2), "utf-8");
  } catch {
    // In serverless read-only environment /tmp can be used or fallback silently
    try {
      const tmpFile = path.join("/tmp", "orders.json");
      fs.writeFileSync(tmpFile, JSON.stringify(ordersMemory, null, 2), "utf-8");
    } catch {
      // Memory store remains active for lifecycle
    }
  }
}

export async function createOrder(data: {
  customerName: string;
  customerEmail: string;
  regNumber: string;
  planId?: string;
  planName?: string;
  price?: string;
}): Promise<Order> {
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const orderId = `AC-ORD-${randomSuffix}`;
  const now = new Date().toISOString();

  const order: Order = {
    orderId,
    customerName: data.customerName.trim(),
    customerEmail: data.customerEmail.trim(),
    regNumber: data.regNumber.trim().toUpperCase(),
    planId: data.planId || "full",
    planName: data.planName || "Full Comprehensive",
    price: data.price || "£54.99",
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  ordersMemory[orderId] = order;
  persistToFile();
  return order;
}

export async function getOrder(orderId: string): Promise<Order | null> {
  ensureFileStore();
  return ordersMemory[orderId] || null;
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  extra: Partial<Order> = {}
): Promise<Order | null> {
  ensureFileStore();
  const order = ordersMemory[orderId];
  if (!order) return null;

  order.status = status;
  order.updatedAt = new Date().toISOString();

  if (extra.reportGeneratedAt) order.reportGeneratedAt = extra.reportGeneratedAt;
  if (extra.pdfUrl) order.pdfUrl = extra.pdfUrl;
  if (extra.emailSentAt) order.emailSentAt = extra.emailSentAt;
  if (extra.errorMessage !== undefined) order.errorMessage = extra.errorMessage;

  ordersMemory[orderId] = order;
  persistToFile();
  return order;
}

export async function listAllOrders(): Promise<Order[]> {
  ensureFileStore();
  return Object.values(ordersMemory).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
