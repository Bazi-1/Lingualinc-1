import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard using the local strategy for authentication.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }
}
