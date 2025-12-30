import { Controller, Get, Post, Body, Param, Patch, Request } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
    constructor(private readonly invoicesService: InvoicesService) { }

    @Post()
    create(@Request() req: any, @Body() body: any) {
        return this.invoicesService.create(req.user.tenantId, body);
    }

    @Get()
    findAll(@Request() req: any) {
        return this.invoicesService.findAll(req.user.tenantId);
    }

    @Get(':id')
    findOne(@Request() req: any, @Param('id') id: string) {
        return this.invoicesService.findOne(req.user.tenantId, id);
    }

    @Post(':id/pay-link')
    generatePaymentLink(@Request() req: any, @Param('id') id: string) {
        return this.invoicesService.generatePaymentLink(req.user.tenantId, id);
    }
}
