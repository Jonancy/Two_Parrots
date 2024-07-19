import CryptoJS from "crypto-js";

export const createSignature = (message: string) => {
  const secretKey = "8gBm/:&EnhH.1/q";
  const hash = CryptoJS.HmacSHA256(message, secretKey);
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  return hashInBase64;
};
