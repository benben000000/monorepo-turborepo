import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assume global guard or manual handling for now

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) { }

    @Post()
    create(@Request() req: any, @Body() body: any) {
        // Assume req.user is populated by JwtStrategy
        return this.clientsService.create(req.user.tenantId, body);
    }

    @Get()
    findAll(@Request() req: any) {
        return this.clientsService.findAll(req.user.tenantId);
    }

    @Get(':id')
    findOne(@Request() req: any, @Param('id') id: string) {
        return this.clientsService.findOne(req.user.tenantId, id);
    }

    @Patch(':id')
    update(@Request() req: any, @Param('id') id: string, @Body() body: any) {
        return this.clientsService.update(req.user.tenantId, id, body);
    }

    @Delete(':id')
    remove(@Request() req: any, @Param('id') id: string) {
        return this.clientsService.remove(req.user.tenantId, id);
    }
}
