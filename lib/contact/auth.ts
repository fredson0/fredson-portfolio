import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "portfolio_admin_session";

function getAdminSecret() {
  return process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD ?? "";
}

export function createAdminSessionToken() {
  const secret = getAdminSecret();

  if (!secret) {
    throw new Error("ADMIN_SECRET ou ADMIN_PASSWORD não configurado.");
  }

  return createHmac("sha256", secret).update("portfolio-admin").digest("hex");
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected || password.length !== expected.length) {
    return false;
  }

  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token || !getAdminSecret()) {
    return false;
  }

  const expected = createAdminSessionToken();

  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}
