# Backend de contato — Vercel, Supabase e evolução NestJS

Documentação para deploy em produção do formulário de contato do portfólio, com persistência no Supabase, notificação por e-mail e painel admin.

---

## Visão geral da arquitetura

```
┌─────────────────┐     POST /api/contact      ┌──────────────────────────┐
│  Next.js (UI)   │ ─────────────────────────► │  API Routes (TypeScript) │
│  /contact       │                            │  • Zod (validação)       │
└─────────────────┘                            │  • Rate limit            │
                                               │  • Auth admin            │
                                               └───────────┬──────────────┘
                                                           │
                     ┌─────────────────────────────────────┼─────────────────────┐
                     ▼                                     ▼                     ▼
            ┌────────────────┐                   ┌─────────────────┐    ┌─────────────────┐
            │ Supabase (PG)  │                   │ Resend (e-mail) │    │ /admin/contacts │
            │ contact_       │                   │ notificação     │    │ painel interno  │
            │ submissions    │                   └─────────────────┘    └─────────────────┘
            └────────────────┘
```

### Por que essa stack?

| Camada | Tecnologia | Motivo |
|--------|------------|--------|
| Frontend | Next.js 16 + Vercel | SSR, rotas API serverless, deploy simples |
| Validação | Zod | Schema tipado, erros por campo, padrão de mercado |
| Banco | Supabase (Postgres) | Persistência real na Vercel (filesystem não persiste) |
| E-mail | Resend | API confiável, plano gratuito, boa entregabilidade |
| Admin | Cookie HTTP-only + senha | Leve, sem expor dados publicamente |

---

## Fase 1 — Implementação atual (recomendada)

O projeto **já possui** esta camada. Use Supabase em produção e arquivo JSON apenas em desenvolvimento local.

### Estrutura de arquivos

```
app/
  api/contact/route.ts          # POST — recebe formulário
  api/admin/login/route.ts      # POST — login do painel
  api/admin/contacts/route.ts   # GET — lista mensagens
  api/admin/logout/route.ts     # POST — logout
  contact/page.tsx              # Página do formulário
  admin/contacts/page.tsx       # Painel admin

lib/contact/
  schema.ts                     # Zod — validação compartilhável
  store.ts                      # Escolhe Supabase ou arquivo local
  store-file.ts                 # Dev local (data/contact-submissions.json)
  store-supabase.ts             # Produção (Supabase)
  supabase.ts                   # Cliente admin (service role)
  email.ts                      # Notificação Resend
  auth.ts                       # Sessão admin
  rate-limit.ts                 # Limite por IP

supabase/migrations/
  001_contact_submissions.sql   # Schema da tabela
```

### Campos validados (Zod)

| Campo | Regra |
|-------|-------|
| `name` | 2–120 caracteres |
| `email` | E-mail válido |
| `organization` | Opcional, até 160 caracteres |
| `services` | 3–300 caracteres |
| `message` | 10–4000 caracteres |

---

## Setup Supabase

### 1. Criar projeto

1. Acesse [supabase.com](https://supabase.com) e crie um projeto.
2. Anote **Project URL** e **service_role key** (Settings → API).
   - Use **service_role** apenas no backend (Vercel env). Nunca no frontend.

### 2. Executar migration

No **SQL Editor** do Supabase, cole e execute:

`supabase/migrations/001_contact_submissions.sql`

Isso cria a tabela `contact_submissions` com RLS habilitado e **sem políticas públicas** — apenas o backend com service role acessa.

### 3. Variáveis de ambiente

Copie `.env.example` para `.env.local`:

```env
# Storage: supabase (prod) | file (local)
CONTACT_STORAGE=supabase

SUPABASE_URL=https://SEU_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# E-mail (Resend)
RESEND_API_KEY=re_...
CONTACT_NOTIFICATION_EMAIL=fredsonmachado02@gmail.com
CONTACT_FROM_EMAIL=Portfolio <contato@seudominio.com>

# Admin (/admin/contacts)
ADMIN_PASSWORD=sua_senha_forte
ADMIN_SECRET=string_aleatoria_longa
```

**Desenvolvimento local sem Supabase:** omita `SUPABASE_URL` ou defina `CONTACT_STORAGE=file`. Os dados vão para `data/contact-submissions.json`.

---

## Deploy na Vercel

### 1. Conectar repositório

1. [vercel.com](https://vercel.com) → Import Git Repository.
2. Framework: **Next.js** (detectado automaticamente).
3. Build command: `npm run build` (padrão).

### 2. Environment Variables

Em **Project Settings → Environment Variables**, adicione todas as variáveis do `.env.local`:

| Variável | Ambiente |
|----------|----------|
| `CONTACT_STORAGE` | Production = `supabase` |
| `SUPABASE_URL` | Production, Preview |
| `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview (secreto) |
| `RESEND_API_KEY` | Production |
| `CONTACT_NOTIFICATION_EMAIL` | Production |
| `CONTACT_FROM_EMAIL` | Production |
| `ADMIN_PASSWORD` | Production |
| `ADMIN_SECRET` | Production |

### 3. Resend + domínio

1. Crie conta em [resend.com](https://resend.com).
2. Verifique seu domínio (DNS: SPF, DKIM).
3. Atualize `CONTACT_FROM_EMAIL` para um endereço do domínio verificado.
4. Sem domínio verificado, use temporariamente `onboarding@resend.dev` (apenas para testes).

### 4. Checklist pós-deploy

- [ ] Enviar formulário em `/contact` → registro aparece no Supabase (Table Editor).
- [ ] E-mail de notificação recebido.
- [ ] Login em `/admin/contacts` com `ADMIN_PASSWORD`.
- [ ] Rate limit: mais de 5 envios/hora por IP retorna 429.

---

## Fase 2 — Backend NestJS (evolução profissional)

Para demonstrar arquitetura em camadas (portfólio + entrevistas), você pode extrair a API para um serviço **NestJS** separado. O frontend Next.js continua na Vercel; a API roda em **Railway**, **Render** ou **Fly.io**.

### Quando migrar?

- Quando quiser **Swagger/OpenAPI**, testes E2E dedicados, filas (BullMQ), múltiplos módulos (blog, CMS, auth).
- Quando o portfólio virar **case de arquitetura** (monorepo frontend + backend).

### Arquitetura alvo

```
fredson-portfolio/          (monorepo opcional)
├── apps/
│   ├── web/                # Next.js — Vercel
│   └── api/                # NestJS — Railway
├── packages/
│   └── contact-schema/     # Zod compartilhado
└── supabase/
```

### Endpoints equivalentes (NestJS)

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/v1/contact` | Validar + salvar + e-mail |
| `POST` | `/v1/admin/login` | Sessão admin |
| `GET` | `/v1/admin/contacts` | Listar (Bearer/cookie) |

### Módulos NestJS sugeridos

```
src/
  contact/
    contact.controller.ts
    contact.service.ts
    dto/create-contact.dto.ts    # class-validator espelhando Zod
  admin/
    admin.controller.ts
    admin.guard.ts
  mail/
    mail.service.ts              # Resend
  database/
    supabase.service.ts
  common/
    filters/http-exception.filter.ts
    pipes/zod-validation.pipe.ts
```

### Fluxo após migração

1. Next.js `ContactForm` passa a chamar `NEXT_PUBLIC_API_URL/v1/contact`.
2. NestJS valida, persiste no Supabase, dispara e-mail.
3. CORS configurado para o domínio Vercel.

### Alternativa mais leve: TypeScript puro (Fastify/Hono)

Se NestJS for pesado demais agora, um serviço **Fastify + Zod + Supabase** em um único `server.ts` já transmite backend dedicado com menos boilerplate. A documentação e contratos (OpenAPI) podem ser adicionados depois.

---

## Segurança

- **Nunca** exponha `SUPABASE_SERVICE_ROLE_KEY` ou `RESEND_API_KEY` no client.
- **RLS** ativo no Supabase; sem policies públicas na tabela de contatos.
- **ADMIN_PASSWORD** forte; prefira `ADMIN_SECRET` diferente da senha.
- Rate limit in-memory funciona em single instance; em escala, use **Upstash Redis** na Vercel.
- Valide sempre no servidor — o Zod na API é a fonte da verdade.

---

## Troubleshooting

| Problema | Solução |
|----------|---------|
| Formulário 500 em produção | Verifique env vars na Vercel; logs em Deployments → Functions |
| E-mail não chega | Confirme domínio no Resend; veja spam; teste API key |
| Admin 401 | `ADMIN_PASSWORD` e cookie `secure` em HTTPS |
| Dados não aparecem no Supabase | `CONTACT_STORAGE=supabase`; migration executada |
| Build OK, store usa arquivo | Faltam `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` no deploy |

---

## Próximos passos sugeridos

1. Configurar Supabase + Vercel com este guia.
2. Verificar domínio no Resend.
3. (Opcional) Extrair `lib/contact/schema.ts` para package compartilhado.
4. (Opcional) Scaffold NestJS em `apps/api` quando for apresentar arquitetura em entrevistas.

---

## Referências

- [Supabase — Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Vercel — Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Resend — Send Email](https://resend.com/docs/send-with-nextjs)
- [NestJS — Documentation](https://docs.nestjs.com/)
- [Zod](https://zod.dev/)
