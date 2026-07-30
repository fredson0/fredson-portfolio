import { Body, Controller, Post } from '@nestjs/common';

import { CreateContactDto } from './dto/create-contact.dto';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  /**
   * POST /v1/contact
   * TODO: validar DTO, rate limit, salvar no Supabase e enviar e-mail.
   */
  @Post()
  create(@Body() _payload: CreateContactDto) {
    return this.contactService.create(_payload);
  }
}
