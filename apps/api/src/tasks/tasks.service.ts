import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) { }

    async create(tenantId: string, data: any) {
        return this.prisma.task.create({
            data: { ...data, tenantId },
        });
    }

    async findAll(tenantId: string) {
        return this.prisma.task.findMany({
            where: { tenantId },
            include: { assignee: true, project: true },
        });
    }

    async update(tenantId: string, id: string, data: any) {
        // Verify ownership
        await this.prisma.task.findFirstOrThrow({ where: { id, tenantId } });
        return this.prisma.task.update({
            where: { id },
            data,
        });
    }
}
