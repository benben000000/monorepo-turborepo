import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
    constructor(private prisma: PrismaService) { }

    async getDashboardStats(tenantId: string) {
        const totalRevenue = await this.prisma.invoice.aggregate({
            where: { tenantId, status: 'paid' },
            _sum: { total: true },
        });

        const overdueCount = await this.prisma.invoice.count({
            where: { tenantId, status: 'overdue' },
        });

        const pendingTasks = await this.prisma.task.count({
            where: { tenantId, status: { not: 'done' } },
        });

        const projectsCount = await this.prisma.project.count({
            where: { tenantId },
        });

        return {
            revenue: totalRevenue._sum.total || 0,
            overdueInvoices: overdueCount,
            pendingTasks,
            totalProjects: projectsCount,
        };
    }
}
