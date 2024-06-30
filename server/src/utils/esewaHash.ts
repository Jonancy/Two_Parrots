import crypto from "crypto";

export const createSignature = (message: string) => {
  const secret = "8gBm/:&EnhH.1/q"; //different in production
  // Create an HMAC-SHA256 hash
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);

  // Get the digest in base64 format
  const hashInBase64 = hmac.digest("base64");
  return hashInBase64;
};
