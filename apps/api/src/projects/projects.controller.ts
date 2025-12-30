import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post()
    create(@Request() req: any, @Body() body: any) {
        return this.projectsService.create(req.user.tenantId, body);
    }

    @Get()
    findAll(@Request() req: any) {
        return this.projectsService.findAll(req.user.tenantId);
    }

    @Get(':id')
    findOne(@Request() req: any, @Param('id') id: string) {
        return this.projectsService.findOne(req.user.tenantId, id);
    }
}
