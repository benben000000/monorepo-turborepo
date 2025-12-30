import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientsService {
    constructor(private prisma: PrismaService) { }

    async create(tenantId: string, data: any) {
        return this.prisma.client.create({
            data: {
                ...data,
                tenantId,
            },
        });
    }

    async findAll(tenantId: string) {
        return this.prisma.client.findMany({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(tenantId: string, id: string) {
        const client = await this.prisma.client.findFirst({
            where: { id, tenantId },
            include: { projects: true, invoices: true },
        });

        if (!client) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }

        return client;
    }

    async update(tenantId: string, id: string, data: any) {
        // Check existence first to ensure tenant ownership
        await this.findOne(tenantId, id);

        return this.prisma.client.update({
            where: { id },
            data,
        });
    }

    async remove(tenantId: string, id: string) {
        await this.findOne(tenantId, id);
        return this.prisma.client.delete({ where: { id } });
    }
}
