import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async signup(data: { email: string; password: string; companyName: string; name: string }) {
        const { email, password, companyName, name } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const slug = companyName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();

        // Transaction: Create Tenant + User
        const result = await this.prisma.$transaction(async (tx) => {
            const tenant = await tx.tenant.create({
                data: {
                    name: companyName,
                    slug,
                },
            });

            const user = await tx.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    role: 'OWNER',
                    tenantId: tenant.id,
                },
            });

            return { user, tenant };
        });

        return this.generateToken(result.user);
    }

    async login(data: { email: string; password: string }) {
        const user = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.generateToken(user);
    }

    private generateToken(user: any) {
        const payload = { sub: user.id, email: user.email, tid: user.tenantId, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                tenantId: user.tenantId,
            },
        };
    }
}
