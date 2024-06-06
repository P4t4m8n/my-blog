export const decodeJWT = async (token: string, secret: string) => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Token must have three parts");
  }

  const [header, payload, signature] = parts.map((part) =>
    encoder.encode(part)
  );
  const data = `${parts[0]}.${parts[1]}`;
  const expectedSignature = new Uint8Array(
    atob(parts[2])
      .split("")
      .map((char) => char.charCodeAt(0))
  );

  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    expectedSignature,
    encoder.encode(data)
  );

  if (!valid) {
    throw new Error("Invalid token signature");
  }

  return JSON.parse(atob(parts[1]));
};
