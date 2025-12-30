import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantService {
    constructor(private prisma: PrismaService) { }

    async findById(id: string) {
        return this.prisma.tenant.findUnique({ where: { id } });
    }

    // Helper to create tenant independently if needed
    async create(name: string) {
        const slug = name.toLowerCase().replace(/ /g, '-') + '-' + Date.now();
        return this.prisma.tenant.create({
            data: {
                name,
                slug,
            },
        });
    }
}
