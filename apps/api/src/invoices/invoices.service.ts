import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoicesService {
    constructor(private prisma: PrismaService) { }

    async create(tenantId: string, data: any) {
        // Generate Invoice Number (Simple auto-increment logic or random)
        const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

        return this.prisma.invoice.create({
            data: {
                ...data,
                number: invoiceNumber,
                tenantId,
                status: 'draft',
            },
        });
    }

    async findAll(tenantId: string) {
        return this.prisma.invoice.findMany({
            where: { tenantId },
            include: { client: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(tenantId: string, id: string) {
        return this.prisma.invoice.findFirstOrThrow({
            where: { id, tenantId },
            include: { client: true },
        });
    }

    async update(tenantId: string, id: string, data: any) {
        await this.findOne(tenantId, id);
        return this.prisma.invoice.update({
            where: { id },
            data,
        });
    }

    // Stripe Integration (Mock)
    async generatePaymentLink(tenantId: string, id: string) {
        const invoice = await this.findOne(tenantId, id);

        // In real app: Call Stripe API here
        // const session = stripe.checkout.sessions.create(...)

        // Mock response
        return {
            url: `https://checkout.stripe.com/pay/test_${id}`,
            status: 'success',
        };
    }
}
