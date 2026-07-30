import { Injectable } from '@nestjs/common';

@Injectable()
export class SupabaseService {
  /**
   * TODO: instalar @supabase/supabase-js
   * TODO: ler SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY do ConfigModule
   * TODO: métodos saveContactSubmission / listContactSubmissions
   */
  isConfigured() {
    return Boolean(
      process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
    );
  }
}
