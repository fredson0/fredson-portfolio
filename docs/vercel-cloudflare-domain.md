# Portfólio no domínio — Vercel + Cloudflare

> Site pessoal em `fredsondev.com.br`. Este repositório (`fredson0/fredson-portfolio`) é o projeto da Vercel.  
> O ENEM+IA **continua** na Contabo (`enem` / `api.enem`) — repositório e VPS separados. Não use este repo como origem do apex na Contabo.

**Última revisão:** 2026-09-14

Formulário de contato (Supabase / Resend / admin): [contact-backend-vercel-supabase.md](./contact-backend-vercel-supabase.md).

---

## A Contabo entra nisso?

**Não.** O portfólio é Next.js (landing, cases, contato). A **Vercel Free** segura o site e as API Routes.

| Site | Onde | Por quê |
|------|------|---------|
| `fredsondev.com.br` | **Vercel** | Next.js, HTTPS, deploy no `git push` |
| `www.fredsondev.com.br` | **Vercel** | redireciona para o apex (ou o contrário) |
| `enem.fredsondev.com.br` | **Contabo** | Next + Nest + Postgres + Redis |
| `api.enem.fredsondev.com.br` | **Contabo** | API do ENEM |

A Contabo existe porque o ENEM tem API, banco e Redis. O portfólio **não** roda lá.

O contato deste site usa rotas em `app/api/*` na própria Vercel (e opcionalmente Supabase/Resend). Isso **não** é o `api.enem`.

DNS continua no **Cloudflare** (nameservers do Registro.br já apontam para lá). Você só **adiciona** registros do apex/`www`. **Não apague** `enem` e `api.enem`.

---

## O que você precisa ter

1. Conta [Vercel](https://vercel.com) (login com GitHub)
2. Este repositório no GitHub: [fredson0/fredson-portfolio](https://github.com/fredson0/fredson-portfolio)
3. Zona Cloudflare de `fredsondev.com.br` já **Active**

Custo extra: **R$ 0** no plano Free da Vercel, no uso típico de portfólio.

---

## 1. Subir o projeto na Vercel

1. [vercel.com/new](https://vercel.com/new) → Import **`fredson-portfolio`**.
2. Framework: **Next.js** (detectado).
3. Root directory: **raiz do repo** (não use `apps/api` — o Nest lá é scaffold; o site em produção é o Next na raiz).
4. Build: `npm run build` (padrão).
5. Variáveis: as do contato, se for usar formulário em produção. Lista em [contact-backend-vercel-supabase.md](./contact-backend-vercel-supabase.md). Opcional: `NEXT_PUBLIC_SITE_URL=https://fredsondev.com.br`.
6. Deploy. Confirme o URL `*.vercel.app`.

A partir daí, **push na `main`** publica sozinho. Isso não mexe no ENEM.

---

## 2. Ligar o domínio (Vercel)

1. Projeto → **Settings** → **Domains**
2. Add: `fredsondev.com.br`
3. Add: `www.fredsondev.com.br`
4. Escolha um como principal (ex.: apex) e redirecione o outro para ele

A Vercel mostra os DNS **exatos** do projeto. Use os da tela, não copie IP/CNAME de outro tutorial.

Valores **típicos** (confira no card do domínio):

| Tipo | Nome no Cloudflare | Conteúdo (exemplo) |
|------|--------------------|--------------------|
| `A` | `@` (ou `fredsondev.com.br`) | o IPv4 que a Vercel mostrar |
| `CNAME` | `www` | o host `….vercel-dns….com` que a Vercel mostrar |

A Vercel às vezes pede **dois** registros `A` (IPv4) e `AAAA` (IPv6). Cadastre o que o painel listar.

---

## 3. Cloudflare — só apex e www

**DNS → Records → Add record**. Deixe **enem** e **api.enem** como estão (IP da VPS, proxy laranja).

| Tipo | Nome | Conteúdo | Proxy |
|------|------|----------|--------|
| A | `@` | IP da Vercel | **DNS only** (nuvem **cinza**) no começo |
| CNAME | `www` | target da Vercel | **DNS only** (cinza) no começo |

MX/TXT de e-mail (`_dmarc`, SPF) **não mexa**.

Por que cinza no início: a Vercel precisa verificar o domínio e emitir certificado. Nuvem laranja cedo demais gera loop de SSL ou “Invalid Configuration”.

SSL/TLS do Cloudflare pode ficar em **Full** (já usado pelo ENEM). Não use **Flexible**.

Quando `https://fredsondev.com.br` abrir com cadeado na Vercel, você **pode** ligar o proxy laranja no `@` e no `www` se quiser WAF. Se quebrar, volte para cinza — o ENEM não é afetado.

---

## 4. Conferir

- https://fredsondev.com.br — portfólio
- https://www.fredsondev.com.br — redireciona ou abre igual
- https://enem.fredsondev.com.br — ENEM (Contabo), intacto

Não crie um `A` `@` apontando para o IP da Contabo. Isso faria o apex virar o ENEM.

---

## 5. O que **não** fazer

- Não importe o repositório do ENEM (`enem-adaptive-learning`) como projeto Vercel do apex — os dois sites brigam pelo mesmo domínio.
- Não aponte `enem` / `api.enem` para a Vercel.
- Não defina Root Directory da Vercel como `apps/api`.

---

## Resumo

- Portfólio (`fredsondev.com.br`) → **só Vercel**, este repo, branch `main`.
- ENEM → **só Contabo**, outro repo, Docker na VPS.
- Um domínio, dois destinos, no Cloudflare.
- Deploy do portfólio: automático no `git push`. Deploy do ENEM: `git pull` + Docker na VPS (docs no repositório do ENEM).
