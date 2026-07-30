# Fredson Portfolio — API (NestJS)

Backend em NestJS para o formulário de contato. **A implementação das regras de negócio é sua** — este diretório contém apenas o scaffold.

## Comandos

```bash
# Na raiz do monorepo
npm run dev:api

# Ou dentro desta pasta
npm run start:dev
```

API padrão: `http://localhost:3001/v1/health`

## O que implementar

Siga o guia completo: [`docs/nestjs-api-implementation.md`](../../docs/nestjs-api-implementation.md)

## Estrutura

```
src/
  contact/     → POST /v1/contact
  admin/       → login + listagem de mensagens
  database/    → Supabase
  mail/        → Resend
  health/      → health check
  common/      → (criar) pipes, filters, interceptors
```

## Variáveis de ambiente

Copie `.env.example` para `.env` nesta pasta.
