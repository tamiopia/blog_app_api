import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
dotenv.config();

console.log('🛡️ JWT_SECRET loaded:', process.env.JWT_SECRET); // Debug secret

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, 
    });
  }

  async validate(payload: any) {
    console.log('🔑 Validating JWT Payload:', payload); // 👈 ADD THIS LINE
    return { 
      userId: payload.sub,
      role: payload.role || 'user'
    };
  }
}
