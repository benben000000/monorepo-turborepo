import { Controller, Get, Post, Body, Param, Patch, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(@Request() req: any, @Body() body: any) {
        return this.tasksService.create(req.user.tenantId, body);
    }

    @Get()
    findAll(@Request() req: any) {
        return this.tasksService.findAll(req.user.tenantId);
    }

    @Patch(':id')
    update(@Request() req: any, @Param('id') id: string, @Body() body: any) {
        return this.tasksService.update(req.user.tenantId, id, body);
    }
}
