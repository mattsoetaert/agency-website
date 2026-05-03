import crypto from "node:crypto";

export const staffSessionCookieName = "webpro_staff_checkout";
export const staffSessionMaxAge = 60 * 60 * 8;

const staffSessionMessage = "webpro-staff-checkout-v1";

function getStaffPassword() {
  return process.env.STAFF_CHECKOUT_PASSWORD?.trim() ?? "";
}

function secureCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function isStaffCheckoutConfigured() {
  return getStaffPassword().length > 0;
}

export function createStaffSessionValue(password = getStaffPassword()) {
  if (!password) return "";

  return crypto.createHmac("sha256", password).update(staffSessionMessage).digest("hex");
}

export function isStaffPasswordValid(password: string) {
  const configuredPassword = getStaffPassword();

  return Boolean(configuredPassword && password && secureCompare(password, configuredPassword));
}

export function isStaffSessionValueValid(value: string | undefined | null) {
  const configuredPassword = getStaffPassword();

  if (!configuredPassword || !value) return false;

  return secureCompare(value, createStaffSessionValue(configuredPassword));
}
