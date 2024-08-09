// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';


/**
 * JWT strategy for authentication using Passport.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'cSHUl|rArf1SgvR-#zNN*6#DGs/l|/%/_2?4&({Edd:BZ9DQ[l]pDkJmvb$u%}3',
    });
  }

  /**
  * Validates the JWT payload.
  * @param payload - The JWT payload.
  * @returns The user's information if validation is successful.
  */
  async validate(payload: any) {
    // Implement payload validation logic
    return { userId: payload.sub, username: payload.email };
  }
}


