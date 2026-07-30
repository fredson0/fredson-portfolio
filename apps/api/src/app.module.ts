import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { ContactModule } from './contact/contact.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    DatabaseModule,
    MailModule,
    ContactModule,
    AdminModule,
    HealthModule,
  ],
})
export class AppModule {}
