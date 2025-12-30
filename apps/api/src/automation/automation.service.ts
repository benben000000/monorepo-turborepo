import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AutomationService {
    private readonly logger = new Logger(AutomationService.name);

    constructor(private prisma: PrismaService) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleOverdueInvoices() {
        this.logger.debug('Checking for overdue invoices...');

        const overdueInvoices = await this.prisma.invoice.findMany({
            where: {
                status: 'sent',
                dueDate: { lt: new Date() },
            },
            include: { client: true, tenant: true },
        });

        for (const invoice of overdueInvoices) {
            this.logger.warn(`Invoice ${invoice.number} for Client ${invoice.client.name} is OVERDUE.`);
            // In real app: Send email notification
            // await this.emailService.sendReminder(invoice.client.email, ...);
        }
    }

    @Cron('0 9 * * *') // Daily at 9 AM
    async sendDailyTaskSummary() {
        this.logger.debug('Sending daily task summaries...');
        // Logic to find tasks due today and notify users
    }
}
