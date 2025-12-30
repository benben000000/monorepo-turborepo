import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) { }

    async create(tenantId: string, data: any) {
        return this.prisma.project.create({
            data: { ...data, tenantId },
        });
    }

    async findAll(tenantId: string) {
        return this.prisma.project.findMany({
            where: { tenantId },
            include: { client: true },
        });
    }

    async findOne(tenantId: string, id: string) {
        return this.prisma.project.findFirst({
            where: { id, tenantId },
            include: { tasks: true },
        });
    }
}
