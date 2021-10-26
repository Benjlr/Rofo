export interface AuthResponse {
  id: string;
  username:string,
  email: string;
  jwtToken: string;
  refreshToken: string;
  errors: string;
}
