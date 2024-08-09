// jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard using JWT strategy for authentication.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
