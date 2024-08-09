import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Controller for the application's main entry point.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Handles the root '/' route.
   * @returns A welcome message or similar response.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
