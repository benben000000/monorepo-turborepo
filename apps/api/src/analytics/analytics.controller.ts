import { Controller, Get, Request } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('dashboard')
    getStats(@Request() req: any) {
        return this.analyticsService.getDashboardStats(req.user.tenantId);
    }
}
