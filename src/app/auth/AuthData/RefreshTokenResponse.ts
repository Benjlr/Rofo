export interface RefreshTokenResponse {
  email: string;
  jwtToken: string;
  refreshToken: string;
  errors: string;
}
