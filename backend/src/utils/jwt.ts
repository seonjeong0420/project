import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export function createAccessToken(payload: { id: string; email: string }) {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

export function createRefreshToken(payload: { id: string; email: string }) {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "7d",
  });
}
