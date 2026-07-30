import { Injectable } from '@nestjs/common';

import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  /**
   * TODO: implementar fluxo completo
   * 1. Validar payload (class-validator ou Zod)
   * 2. Persistir via SupabaseService
   * 3. Disparar e-mail via MailService
   */
  create(_payload: CreateContactDto) {
    return {
      ok: false,
      message: 'Implementação pendente — veja docs/nestjs-api-implementation.md',
    };
  }
}
