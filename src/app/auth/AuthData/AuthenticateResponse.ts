export interface AuthResponse {
  id: string;
  username:string,
  email: string;
  jwtToken: string;
  jwtExpiry: Date;
  refreshToken: string;
  refreshExpiry: Date;
  errors: string;
}
