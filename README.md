# AuthorizeCheck — Automated Vehicle Intelligence Platform

AuthorizeCheck is a production-grade UK vehicle history checking web platform built with **Next.js 16 (Turbopack)**, **React 19**, **Tailwind CSS**, and **Puppeteer Core + Sparticuz Chromium**.

It delivers an end-to-end automated flow from vehicle registration lookup, checkout initialization, payment redirection, live database fetching (via VehicleDataGlobal API), branded 20-page A4 PDF report generation, and instant customer email delivery with a downloadable backup.

---

## Architecture & Automated Flow

```
[1. Home Page] ──► User enters UK VRM (persisted to localStorage)
        │
        ▼
[2. Checkout]   ──► Pre-fills VRM, collects customer Name & Email
        │           Calls /api/create-order (Order stored with status: "pending")
        │           Redirects customer to external payment link with ?ref=<orderId>
        ▼
[3. Payment]    ──► External payment provider (e.g. SumUp / Stripe)
        │           On completion, redirects customer to /thank-you?order=<orderId>
        ▼
[4. Thank You]  ──► Calls /api/generate-report
        │           Polls /api/order-status every 2.5 seconds
        │           Displays real-time multi-stage progress indicator
        │
        ├──► Fetches vehicle intelligence data from VehicleDataGlobal API
        ├──► Substitutes dynamic vehicle data into branded 20-page HTML template
        ├──► Compiles pixel-perfect A4 PDF using Puppeteer Core + @sparticuz/chromium
        ├──► Stores PDF in Vercel Blob cloud storage (or local fallback)
        ├──► Dispatches branded email with PDF attached to customer (Resend / Google SMTP)
        │
        ▼
[5. Completed]  ──► Live UI flips to green success confirmation
                    Instant "Download Report PDF" button with fallback access
```

---

## Features

- **Automated Flow**: No manual intervention required under standard payment redirects.
- **20-Page Institutional PDF Dossier**: Matches the existing high-end AuthorizeCheck HTML design, formatted for A4 print with background graphics and cover page.
- **Strict Data Mapping & Safety**: Any missing upstream data point automatically defaults to `"N/A"` or `"No records found"`, preventing broken layouts or crashes.
- **Dual Email Engine**: Delivers customer PDF reports via Resend or Google SMTP (Nodemailer), plus dispatches order notifications to `checkauthorize@gmail.com`.
- **Vercel Serverless Ready**: Engineered specifically for Vercel's serverless environment with `@sparticuz/chromium`, `maxDuration = 60` configuration, and `@vercel/blob` integration.
- **Admin Recovery Portal (`/admin/orders`)**: Searchable, filterable dashboard with an instant **"Mark Paid & Generate"** action to recover any orders where the customer closed the browser tab before returning.

---

## Important Architectural Notes

### 1. Payment Provider Webhooks vs Return-Page Flow
Because external payment links without webhook support rely on redirecting the customer back to `/thank-you?order=<orderId>`:
- **Normal Flow**: The customer finishes paying on the payment provider page and clicks return (or is auto-redirected). The `/thank-you` page immediately triggers `/api/generate-report`, compiles the PDF, emails it, and displays the download link.
- **If the Customer Closes the Tab**: If a buyer completes payment on SumUp/external gateway and closes their mobile browser before redirecting back, the order remains in `pending` status.
- **Manual Admin Recovery**: The admin simply opens `/admin/orders`, locates the customer's order, and clicks **"Mark Paid & Generate"**. The system immediately runs the vehicle check, compiles the PDF, emails it directly to the customer's inbox, and marks the order `completed`.

### 2. PDF Generation in Local Development vs Vercel
- **On Vercel (Linux Serverless)**: The app automatically detects the Linux environment and initializes `@sparticuz/chromium` headless binary. `vercel.json` configures `maxDuration: 60` to allow sufficient headroom for 20-page PDF rendering.
- **On Windows Local Development**: `@sparticuz/chromium` contains Linux-only ELF binaries. The PDF engine in `src/lib/pdf.ts` detects `process.platform === 'win32'` and seamlessly routes to the local Google Chrome or Microsoft Edge browser executable on your computer (`C:\Program Files\Google\Chrome\Application\chrome.exe`).

---

## Environment Configuration

Create a `.env.local` file based on `.env.example`:

```bash
# 1. Google SMTP Configuration (Gmail)
GMAIL_USER=faiq.dev2@gmail.com
GMAIL_APP_PASSWORD=jsak grbu ugzn umoh
ORDER_NOTIFICATION_EMAIL=checkauthorize@gmail.com

# 2. VehicleDataGlobal UK Vehicle API
VDG_API_KEY=0E034E63-E224-4F07-9AFF-B083E9FAB611
VDG_API_BASE_URL=https://uk1.ukvehicledata.co.uk
VDG_DATA_PACKAGE=VehicleData

# 3. Resend Email Delivery (Optional)
# RESEND_API_KEY=re_xxxxxxxxxxxx
# RESEND_FROM_EMAIL=AuthorizeCheck <reports@authorizecheck.co.uk>

# 4. Vercel Blob Storage (Recommended for Vercel deployment)
# BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxx

# 5. Admin Dashboard Password
ADMIN_PASSWORD=your_secure_admin_password
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run production build
npm run build

# Run linting checks
npm run lint
```

---

## Key Routes & Endpoints

| Route | Method | Description |
| :--- | :--- | :--- |
| `/` | `GET` | Landing page with UK registration plate lookup |
| `/checkout` | `GET` | Order form with pre-filled registration and plan selection |
| `/thank-you` | `GET` | Dynamic post-payment status polling & PDF download page |
| `/admin/orders` | `GET` | Admin management dashboard |
| `/api/create-order` | `POST` | Creates order record with `pending` status |
| `/api/generate-report` | `POST` | Fetches vehicle data, renders PDF, uploads to Blob, and emails customer |
| `/api/order-status` | `GET` | Polling endpoint for order state and PDF download URL |
| `/api/download-report` | `GET` | Direct stream / redirect to the generated PDF report |
| `/api/admin/orders` | `GET/POST` | Admin orders list and `mark_paid_generate` action |
| `/api/checkout` | `POST` | Checkout form submission email dispatcher to admin |
