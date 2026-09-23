import { NextRequest } from "next/server";

export function isAdminAuthorized(request: NextRequest, bodyPassword?: string): boolean {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredPassword) return true;

  const headerPassword = request.headers.get("x-admin-password");
  const queryPassword = new URL(request.url).searchParams.get("password");

  return (
    headerPassword === configuredPassword ||
    queryPassword === configuredPassword ||
    bodyPassword === configuredPassword
  );
}