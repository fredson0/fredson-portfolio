import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  login(_payload: { password: string }) {
    return {
      ok: false,
      message: 'Implementação pendente — veja docs/nestjs-api-implementation.md',
    };
  }

  listContacts() {
    return {
      submissions: [],
      message: 'Implementação pendente — veja docs/nestjs-api-implementation.md',
    };
  }
}
