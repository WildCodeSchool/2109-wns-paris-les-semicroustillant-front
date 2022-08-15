// ====================================================
// JWT DECODE TOKEN
// ====================================================

export interface IDecodedToken {
  userId: string | unknown;
  iat: number;
  exp: number;
}