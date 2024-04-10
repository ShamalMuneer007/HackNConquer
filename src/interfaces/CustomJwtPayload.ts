import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  role: string;
  exp: number;
  profileImage: string;
  email: string;
  level: number;
}
