# NestJS API — Guia de implementação

Este guia é para **você implementar** o backend em `apps/api`. O scaffold já está criado; os endpoints retornam `"Implementação pendente"` até você codar a lógica.

---

## Estrutura do monorepo

```
fredson-portfolio/
├── app/                    # Next.js (frontend + API temporária)
├── apps/api/               # NestJS — você implementa aqui
│   └── src/
│       ├── contact/        # POST /v1/contact
│       ├── admin/          # login + listagem
│       ├── database/       # Supabase
│       ├── mail/           # Resend
│       └── health/         # GET /v1/health
├── lib/contact/            # Schema Zod (referência compartilhada)
├── supabase/migrations/    # SQL da tabela
└── docs/
```

---

## Passo 1 — Rodar a API localmente

```bash
# Terminal 1 — frontend
npm run dev

# Terminal 2 — API Nest
npm run dev:api
```

Teste: `GET http://localhost:3001/v1/health` → `{ "status": "ok" }`

Copie `apps/api/.env.example` → `apps/api/.env` e preencha as variáveis.

---

## Passo 2 — Dependências sugeridas

Dentro de `apps/api`:

```bash
cd apps/api
npm install @nestjs/config class-validator class-transformer @supabase/supabase-js zod
npm install --save-dev @types/cookie-parser
```

Opcional: `@nestjs/swagger` para documentação OpenAPI.

---

## Passo 3 — ConfigModule global

**Arquivo:** `src/config/env.validation.ts` (criar)

Validar env vars na inicialização:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `CONTACT_NOTIFICATION_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SECRET`
- `FRONTEND_URL`

**Arquivo:** `src/app.module.ts`

```typescript
ConfigModule.forRoot({ isGlobal: true, validate: validateEnv })
```

---

## Passo 4 — Implementar `SupabaseService`

**Arquivo:** `src/database/supabase.service.ts`

Espelhar a lógica de `lib/contact/store-supabase.ts` do Next.js:

| Método | Descrição |
|--------|-----------|
| `saveContactSubmission(dto)` | INSERT em `contact_submissions` |
| `listContactSubmissions()` | SELECT ordenado por `created_at desc` |
| `markAsRead(id)` | UPDATE `read = true` |

Use `@supabase/supabase-js` com **service role key** (nunca no frontend).

Migration SQL: `supabase/migrations/001_contact_submissions.sql`

---

## Passo 5 — Implementar `MailService`

**Arquivo:** `src/mail/mail.service.ts`

Espelhar `lib/contact/email.ts`:

- POST para `https://api.resend.com/emails`
- `reply_to` = e-mail do visitante
- Assunto: `Novo contato: {nome}`

---

## Passo 6 — Validar DTO do contato

**Arquivo:** `src/contact/dto/create-contact.dto.ts`

Opção A — **class-validator** (padrão Nest):

```typescript
export class CreateContactDto {
  @IsString() @MinLength(2) @MaxLength(120)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional() @IsString() @MaxLength(160)
  organization?: string;

  @IsString() @MinLength(3) @MaxLength(300)
  services: string;

  @IsString() @MinLength(10) @MaxLength(4000)
  message: string;
}
```

Opção B — **Zod** (mesmas regras de `lib/contact/schema.ts`).

**Arquivo:** `src/main.ts` — habilitar ValidationPipe global:

```typescript
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
```

---

## Passo 7 — Implementar `ContactService`

**Arquivo:** `src/contact/contact.service.ts`

Fluxo do `POST /v1/contact`:

1. Receber DTO validado
2. Rate limit por IP (middleware ou guard — ver `lib/contact/rate-limit.ts`)
3. `supabaseService.saveContactSubmission(dto)`
4. `mailService.sendContactNotification(submission)`
5. Retornar `{ ok: true, id, emailSent }`

Tratamento de erros: `HttpException` com status 400/429/500.

---

## Passo 8 — Implementar Admin

### Login — `POST /v1/admin/login`

- Comparar `password` com `ADMIN_PASSWORD` (timing-safe)
- Emitir cookie HTTP-only `portfolio_admin_session` com HMAC(`ADMIN_SECRET`)
- Espelhar `lib/contact/auth.ts`

### Listagem — `GET /v1/admin/contacts`

- Proteger com `@UseGuards(AdminGuard)`
- Implementar `AdminGuard` em `admin.guard.ts`
- Retornar `{ submissions: [...] }`

### Logout — `POST /v1/admin/logout` (criar rota)

- Limpar cookie

---

## Passo 9 — CORS e prefixo

**Arquivo:** `src/main.ts`

```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
});
```

Prefixo global já configurado: `/v1`

---

## Passo 10 — Conectar o frontend

Quando a API Nest estiver pronta:

**.env.local** (Next.js):

```env
NEXT_PUBLIC_CONTACT_API_URL=http://localhost:3001/v1/contact
```

O `ContactForm` já usa `CONTACT_API_URL` de `lib/contact/constants.ts`.

Em produção:

```env
NEXT_PUBLIC_CONTACT_API_URL=https://sua-api.railway.app/v1/contact
```

Atualize também o painel admin para apontar para a API Nest (ou mantenha admin no Next.js até migrar).

---

## Passo 11 — Deploy da API

| Plataforma | Comando build | Porta |
|------------|---------------|-------|
| Railway | `npm run build` + `npm run start:prod` | `PORT` env |
| Render | idem | idem |
| Fly.io | Dockerfile opcional | 3001 |

Variáveis de ambiente: mesmas de `apps/api/.env.example`.

Frontend na Vercel + API no Railway é um setup comum e profissional.

---

## Checklist de implementação

- [ ] ConfigModule + validação de env
- [ ] ValidationPipe global
- [ ] SupabaseService completo
- [ ] MailService (Resend)
- [ ] ContactService + rate limit
- [ ] AdminGuard + login/logout
- [ ] CORS para domínio Vercel
- [ ] Testes e2e em `apps/api/test/contact.e2e-spec.ts`
- [ ] Swagger em `/v1/docs` (opcional)
- [ ] Trocar `NEXT_PUBLIC_CONTACT_API_URL` no frontend
- [ ] Remover ou desativar `app/api/contact/route.ts` do Next.js

---

## Contrato da API (referência)

### `POST /v1/contact`

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "organization": "Empresa X",
  "services": "Desenvolvimento Web",
  "message": "Olá, preciso de um site..."
}
```

**201:**
```json
{ "ok": true, "id": "uuid", "emailSent": true }
```

**400:** `{ "error": "...", "fieldErrors": { ... } }`

### `GET /v1/health`

```json
{ "status": "ok", "service": "fredson-portfolio-api" }
```

---

## Referências no projeto

| Lógica | Implementação de referência (Next.js) |
|--------|---------------------------------------|
| Schema Zod | `lib/contact/schema.ts` |
| Supabase | `lib/contact/store-supabase.ts` |
| E-mail | `lib/contact/email.ts` |
| Auth admin | `lib/contact/auth.ts` |
| Rate limit | `lib/contact/rate-limit.ts` |
| Deploy geral | `docs/contact-backend-vercel-supabase.md` |

---

## Dicas para o portfólio

- Commits separados por módulo (`feat(api): contact module`)
- Adicionar Swagger — recruiters adoram
- Teste e2e do fluxo completo
- README em `apps/api` com diagrama de arquitetura

Quando terminar, você terá **frontend Next.js + backend NestJS + Supabase + Resend** — stack sólida para demonstrar em entrevistas.
