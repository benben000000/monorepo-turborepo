import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TenantModule } from './tenant/tenant.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { InvoicesModule } from './invoices/invoices.module';
import { AutomationModule } from './automation/automation.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [PrismaModule, TenantModule, AuthModule, ClientsModule, ProjectsModule, TasksModule, InvoicesModule, AutomationModule, AnalyticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
