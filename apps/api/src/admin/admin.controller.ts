import { Body, Controller, Get, Post } from '@nestjs/common';

import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /** POST /v1/admin/login */
  @Post('login')
  login(@Body() _payload: { password: string }) {
    return this.adminService.login(_payload);
  }

  /** GET /v1/admin/contacts — TODO: proteger com AdminGuard */
  @Get('contacts')
  listContacts() {
    return this.adminService.listContacts();
  }
}
