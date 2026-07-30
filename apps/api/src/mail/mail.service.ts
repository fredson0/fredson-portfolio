import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  /**
   * TODO: integrar Resend (fetch ou SDK)
   * TODO: sendContactNotification(submission)
   */
  async sendContactNotification(_payload: Record<string, unknown>) {
    return { sent: false, reason: 'not_implemented' };
  }
}
