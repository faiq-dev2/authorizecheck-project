"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Order } from "@/lib/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState<string>("");

  const fetchOrders = useCallback(async (pwd: string) => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/orders", {
        headers: { "x-admin-password": pwd },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        if (res.status === 401) {
          setAuthenticated(false);
          setAuthError("Invalid admin credentials.");
        }
        return;
      }

      setAuthenticated(true);
      setOrders(data.orders || []);
      setAuthError("");
    } catch (err: unknown) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Attempt initial fetch without password (works if no ADMIN_PASSWORD set in env)
    const timer = setTimeout(() => {
      void fetchOrders("");
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchOrders]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await fetchOrders(password);
  }

  async function handleMarkPaidAndGenerate(orderId: string) {
    setActionLoading((prev) => ({ ...prev, [orderId]: true }));
    setMessage("");

    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          orderId,
          action: "mark_paid_generate",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage(`Order #${orderId} report generated & emailed successfully!`);
        await fetchOrders(password);
      } else {
        setMessage(`Failed: ${data.error || "Unknown error generating report"}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error";
      setMessage(`Action failed: ${msg}`);
    } finally {
      setActionLoading((prev) => ({ ...prev, [orderId]: false }));
    }
  }

  const filteredOrders = orders.filter((o) => {
    if (filter !== "all" && o.status !== filter) return false;
    if (search.trim()) {
      const term = search.toLowerCase();
      return (
        o.orderId.toLowerCase().includes(term) ||
        o.regNumber.toLowerCase().includes(term) ||
        o.customerEmail.toLowerCase().includes(term) ||
        o.customerName.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <main className="w-full min-h-screen pt-24 pb-20 bg-background text-on-surface">
      <div className="max-w-[1240px] mx-auto px-gutter-desktop">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-space-lg border-b border-surface-container">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-secondary uppercase font-bold tracking-widest">
                AuthorizeCheck Control Center
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-white">
                ADMIN
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
              Order Management &amp; Report Recovery
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              onClick={() => fetchOrders(password)}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              <span>Refresh Orders</span>
            </button>
            <Link
              className="px-4 py-2 rounded-lg bg-secondary text-white hover:bg-secondary-container font-label-md text-label-md font-semibold transition-colors inline-flex items-center gap-1"
              href="/admin/generate"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Generate Report
            </Link>
            <Link
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-container font-label-md text-label-md font-semibold transition-colors"
              href="/"
            >
              Back to Site
            </Link>
          </div>
        </div>

        {/* Auth Challenge if required */}
        {!authenticated && (
          <div className="max-w-md mx-auto mt-16 bg-surface-container-lowest p-space-xl rounded-2xl shadow-xl border border-surface-container">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
              <span className="material-symbols-outlined text-[26px]">admin_panel_settings</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Admin Access Required</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-6">
              Enter your admin password to view and manage customer orders.
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="admin-password">
                  Password
                </label>
                <input
                  className="h-11 px-space-sm rounded-lg bg-surface-container-low border border-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-body-md"
                  id="admin-password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password…"
                  required
                  type="password"
                  value={password}
                />
              </div>

              {authError && (
                <div className="p-3 rounded-lg bg-error/10 text-error font-body-sm text-body-sm">
                  {authError}
                </div>
              )}

              <button
                className="w-full h-11 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-bold shadow hover:bg-secondary-container transition-all cursor-pointer"
                type="submit"
              >
                Authenticate
              </button>
            </form>
          </div>
        )}

        {/* Dashboard Content (when authenticated) */}
        {authenticated && (
          <div className="mt-8 flex flex-col gap-6">
            
            {/* Status notice */}
            {message && (
              <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 text-on-surface flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">info</span>
                  <span className="font-body-sm text-body-sm font-semibold">{message}</span>
                </div>
                <button className="text-secondary font-bold text-sm cursor-pointer" onClick={() => setMessage("")} type="button">
                  ✕
                </button>
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-xl border border-surface-container">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "All Orders" },
                  { id: "pending", label: "Pending Payment" },
                  { id: "processing", label: "Processing" },
                  { id: "completed", label: "Completed" },
                  { id: "failed", label: "Failed" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-3 py-1.5 rounded-lg font-label-md text-label-md font-semibold transition-colors cursor-pointer ${
                      filter === tab.id
                        ? "bg-secondary text-white"
                        : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                    }`}
                    onClick={() => setFilter(tab.id)}
                    type="button"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[20px]">
                  search
                </span>
                <input
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-container-low border border-surface-container text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary font-body-sm text-body-sm"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search order, VRM, email…"
                  type="text"
                  value={search}
                />
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-surface-container-lowest rounded-xl border border-surface-container overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
                      <th className="py-3 px-4">Order Ref</th>
                      <th className="py-3 px-4">Vehicle Reg</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Package</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container font-body-sm text-body-sm">
                    {loading && orders.length === 0 ? (
                      <tr>
                        <td className="py-12 text-center text-on-surface-variant" colSpan={7}>
                          Loading orders…
                        </td>
                      </tr>
                    ) : filteredOrders.length === 0 ? (
                      <tr>
                        <td className="py-12 text-center text-on-surface-variant" colSpan={7}>
                          No orders found matching this filter.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => {
                        const isLoadingThis = actionLoading[order.orderId];
                        return (
                          <tr key={order.orderId} className="hover:bg-surface-container-low/50 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-on-surface">
                              #{order.orderId}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded bg-[#ffd200] text-black font-mono font-extrabold uppercase tracking-wider text-[12px] border border-black/10">
                                {order.regNumber}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-on-surface">{order.customerName}</div>
                              <div className="text-on-surface-variant text-[11px]">{order.customerEmail}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold">{order.planName}</div>
                              <div className="text-on-surface-variant text-[11px]">{order.price}</div>
                            </td>
                            <td className="py-3.5 px-4 text-on-surface-variant text-[11px]">
                              {new Date(order.createdAt).toLocaleString("en-GB", {
                                dateStyle: "short",
                                timeStyle: "short",
                              })}
                            </td>
                            <td className="py-3.5 px-4">
                              {order.status === "completed" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-label-md text-[11px] font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                  Completed
                                </span>
                              )}
                              {order.status === "processing" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-label-md text-[11px] font-bold animate-pulse">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                  Processing
                                </span>
                              )}
                              {order.status === "pending" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-label-md text-[11px] font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                  Pending Payment
                                </span>
                              )}
                              {order.status === "failed" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 font-label-md text-[11px] font-bold" title={order.errorMessage}>
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                                  Failed
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {order.pdfUrl && (
                                  <a
                                    className="px-2.5 py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface text-[12px] font-semibold inline-flex items-center gap-1 transition-colors"
                                    href={order.pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="View PDF"
                                  >
                                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                                    <span>PDF</span>
                                  </a>
                                )}

                                <button
                                  className="px-3 py-1.5 rounded bg-secondary hover:bg-secondary-container text-white text-[12px] font-bold inline-flex items-center gap-1 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                                  disabled={isLoadingThis || order.status === "processing"}
                                  onClick={() => handleMarkPaidAndGenerate(order.orderId)}
                                  type="button"
                                >
                                  {isLoadingThis ? (
                                    <>
                                      <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                                      <span>Generating…</span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="material-symbols-outlined text-[16px]">bolt</span>
                                      <span>Mark Paid &amp; Generate</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Note */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container text-on-surface-variant font-body-sm text-body-sm leading-relaxed">
              <strong className="text-on-surface">Payment Flow &amp; Manual Recovery Note:</strong> Since standard external payment links do not dispatch a server-to-server webhook, order completion is triggered when customers land on the <code>/thank-you</code> return page. If a customer closes their browser tab before returning, their order remains in <strong>&ldquo;Pending Payment&rdquo;</strong> status. Use the <strong>&ldquo;Mark Paid &amp; Generate&rdquo;</strong> button above to instantly run the VehicleDataGlobal lookup, compile the report PDF, and email it directly to the customer.
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
