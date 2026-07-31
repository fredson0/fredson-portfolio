# Redesign da página Sobre — referência Atypikal

Documento de planejamento para reformular `/about` (e eventualmente a seção About na home) com linguagem visual e motion inspirada em [Atypikal Creative](https://atypikal.co/).

**Status:** planejamento — não implementado  
**Última atualização:** julho 2026

---

## 1. Visão e diferencial

Hoje a página `/about` segue um layout editorial estático (título grande + bloco de texto + foto lateral + seção cream para stacks). Funciona, mas é parecido com muitos portfólios dev.

A proposta é transformar a narrativa de Fredson em **sequência de cenas scroll-driven**, como no site da Atypikal:

- Linha vertical central como eixo visual
- **Collage de imagens** no centro (fotos pessoais, stacks, projetos)
- Título grande + corpo de texto + tags/categorias abaixo
- Motion suave, premium, sincronizado com o scroll

Isso cria um **diferencial claro** no portfólio: storytelling visual + motion de agência criativa, mantendo o restante do site no estilo Dennis (minimal, tipografia, dark hero).

---

## 2. Referência vs. Dennis (importante)

| Aspecto | Dennis Snellenberg (já no site) | Atypikal (nova referência About) |
|--------|----------------------------------|----------------------------------|
| Layout | Lista, hover modal, tipografia limpa | Collage central + linha vertical + scroll scenes |
| Motion | Marquee, magnetic buttons, menu slide | Rise de imagens, título sincronizado, texto “settle” |
| Uso no projeto | Home, work, contact, header | **Página Sobre / narrativa pessoal** |

As animações que você descreveu (fotos subindo, título junto, texto que “se ajeita”) são do **Atypikal**, não do Dennis. O Dennis usa outro vocabulário de motion (marquee, parallax leve, hover).

**Conclusão:** não precisamos “descobrir o que Dennis usou” para isso — usamos o stack que sites nesse nível (Atypikal, Codrops showcases, Awwwards) adotam, e que **já temos no projeto**.

---

## 3. Bibliotecas e stack de animação (recomendado)

### O que o Atypikal / sites equivalentes usam

Não há documentação pública oficial do bundle exato do [atypikal.co](https://atypikal.co/), mas o padrão da indústria para esse tipo de site é:

| Biblioteca | Função |
|------------|--------|
| **GSAP 3** | Timelines, easing, stagger, scrub |
| **ScrollTrigger** (plugin GSAP) | Animar ao entrar na seção, pin de cenas, scrub |
| **Lenis** | Scroll suave; sincronizado com GSAP ticker |
| **SplitText** (GSAP Club) *opcional* | Split por linha/caractere para texto “settle” |
| **Next.js + React** | Estrutura de páginas e componentes |

Sites documentados com o mesmo padrão visual (Codrops, clones Awwwards) citam explicitamente **GSAP + ScrollTrigger + Lenis** — ver [Exat microsite (Codrops)](https://tympanus.net/codrops/2026/04/10/the-exat-microsite-pushing-a-typography-showcase-to-new-creative-extremes/) e [Podium (Codrops)](https://tympanus.net/codrops/2026/06/23/podium-building-a-website-where-running-becomes-storytelling/).

### O que já temos no `fredson-portfolio`

- ✅ GSAP + ScrollTrigger (`lib/gsap.ts`, `@gsap/react`)
- ✅ Lenis (`SmoothScrollContext`)
- ✅ `scrollerProxy` Lenis ↔ ScrollTrigger (home)
- ✅ Padrão de reveal de linhas na seção About da home (`yPercent: 100` + mask)

**Não é necessário adicionar Locomotive Scroll** — Lenis já cobre smooth scroll. Framer Motion não é ideal para scrub longo e collage multi-elemento; GSAP é a escolha correta.

### SplitText — precisa ou não?

Para o efeito “texto mal posicionado que se ajusta”:

- **Com SplitText (Club GreenSock):** split por linhas/palavras, stagger fino, mais controle
- **Sem SplitText (recomendado inicial):** cada `<p>` ou linha em `overflow-hidden` + `translateY` / `skewY` / `rotateZ` leve — mesmo efeito perceptível, já usado em `About.tsx` da home

Começar **sem** SplitText; adicionar só se precisar de granularidade por caractere.

---

## 4. Sistema de animação (3 camadas)

Descrição do que você observou no Atypikal e como replicar.

### 4.1 Camada A — Imagens (collage central)

**Sensação:** fotos “nascem” de baixo e flutuam até a posição final.

**Implementação sugerida:**

```text
Estado inicial (por imagem, offsets diferentes):
  y: 80–180px (ou 8–15vh)
  opacity: 0 → 0.6
  scale: 0.92–1.0 (opcional, leve)

Estado final:
  y: 0
  opacity: 1
  scale: 1

Trigger: ScrollTrigger
  start: "top 85%" (entrada na viewport)
  end: "top 35%"
  scrub: 0.6–1.2  OU  toggleActions: "play none none reverse"

Ease: power3.out (sem scrub) ou none (com scrub)

Stagger: 0.08–0.15s entre cada asset do collage
```

**Detalhe Atypikal:** cada imagem tem **offset vertical e horizontal diferente** no collage — não animar tudo igual; usar `data-depth` ou índice para variar `y` inicial e duração.

### 4.2 Camada B — Título da seção

**Sensação:** sobe **junto** com o bloco de imagens (mesma “cena”).

**Implementação:**

- Título (`h2`) na mesma **timeline GSAP** que o collage, posição `0` ou `0.05` no timeline
- `y: 60–100px → 0`, `opacity: 0 → 1`
- Tipografia: sans grande, bold/black, uppercase ou title case — contraste com corpo leve

Não usar animação independente muito tardia; o título deve parecer **parte do mesmo movimento** que as fotos.

### 4.3 Camada C — Corpo + tags (“texto que se ajusta”)

**Sensação:** texto parece **ligeiramente torto/deslocado** e depois “assenta” na posição correta — diferente do rise das imagens.

**Implementação (sem SplitText):**

```text
Estado inicial (por linha ou parágrafo):
  y: 24–40px
  skewY: 1.5–3deg
  rotateZ: 0.5–1.5deg
  opacity: 0.4–0.7

Estado final:
  y: 0
  skewY: 0
  rotateZ: 0
  opacity: 1

Trigger: após o título/collage (delay 0.15–0.3s na timeline OU start mais tardio)
Duration: 0.7–1.1s
Ease: power3.out
Stagger: 0.06s entre linhas
```

**Tags/categorias** (ex.: `REACT · NEXT.JS · TYPESCRIPT`):

- Mesmo princípio, mas mais rápido e com `opacity` dominante
- Fonte menor, uppercase, `text-black/40`

**Máscara:** wrapper com `overflow-hidden` em cada linha (padrão já usado em `About.tsx` home).

### 4.4 Linha vertical central

- `position: fixed` ou absoluta no container da seção, `left: 50%`, `width: 1px`, `bg-black/10`
- Pode **crescer** com scroll (`scaleY: 0 → 1` com ScrollTrigger scrub) ou permanecer estática
- Altura: 100vh por seção ou contínua na página inteira

---

## 5. Estrutura de conteúdo — seções narrativas

Cada bloco = **uma cena** com imagens próprias + copy. Scroll longo; cada seção ocupa ~100–120vh no desktop.

**Ordem narrativa recomendada:** história pessoal → **stack tecnológica** → **arquitetura & engenharia** → trabalhos → footer.

> **Separação importante:** stacks (ferramentas) e arquitetura/patterns/segurança são **duas seções distintas**. A stack mostra *com o que* você trabalha; a seção de arquitetura mostra *como* você projeta, integra e protege sistemas em produção.

---

### Seção 1 — Sobre Fredson (história)

| Elemento | Conteúdo |
|----------|----------|
| Título | Ex.: `Fredson Santana` ou frase curta de posicionamento |
| Imagens | 3–6 fotos suas (perfil, bastidores, Salvador, faculdade, etc.) — collage irregular |
| Texto | Quem é, Salvador, freelancer, formação, objetivo profissional |
| Tags | Ex.: `DESENVOLVEDOR WEB · FULL STACK · SALVADOR` |

**Assets necessários:** fotos PNG/WebP com recorte se possível (objetos “flutuando” no collage).

---

### Seção 2 — Stack tecnológica (ferramentas)

Foco: **linguagens, frameworks, dados, filas** — lista concreta do que você usa no dia a dia.

| Elemento | Conteúdo |
|----------|----------|
| Título | Ex.: `Stack` ou `Tecnologias` |
| Imagens | Logos e ícones das tecnologias; screenshot de terminal/editor; diagrama simples de camadas (front/back/db) |
| Texto | Parágrafo curto: desenvolvedor web full stack, TypeScript no front e back, APIs com NestJS, apps com Next.js |
| Tags | Ver lista abaixo |

**Conteúdo a listar (copy + tags):**

| Categoria | Itens |
|-----------|--------|
| **Linguagens** | JavaScript, TypeScript |
| **Backend / runtime** | Node.js, NestJS |
| **Frontend** | Next.js, React (implícito no Next) |
| **Bancos de dados** | PostgreSQL, MariaDB, MySQL, Supabase |
| **Filas & workers** | RabbitMQ, Kafka |
| **Posicionamento** | Desenvolvedor web full stack |

**Tags sugeridas (footer da seção):**

`NODE · TYPESCRIPT · NESTJS · NEXT.JS · POSTGRESQL · SUPABASE · RABBITMQ · KAFKA`

**Assets:**

- [ ] Logos: Node, TS, NestJS, Next.js, PostgreSQL, MySQL/MariaDB, Supabase, RabbitMQ, Kafka
- [ ] 1 screenshot de projeto (package.json, estrutura de pastas ou terminal)
- [ ] Diagrama opcional: front (Next) → API (Nest) → DB / fila

**Não incluir nesta seção:** MVC, hexagonal, Mercado Pago, RBAC — isso vai na Seção 3.

---

### Seção 3 — Arquitetura, patterns & engenharia (diferencial)

Foco: **como você constrói software** — system design, padrões de projeto, arquitetura de software, integrações reais e segurança. Esta é a seção que diferencia um dev que “sabe ferramentas” de um que **entrega sistema de verdade**.

| Elemento | Conteúdo |
|----------|----------|
| Título | Ex.: `Arquitetura & engenharia` ou `Como eu construo sistemas` |
| Imagens | Diagramas de arquitetura (hexagonal, camadas MVC), fluxo de integração (pagamento, OAuth), checklist de segurança, snippets de patterns |
| Texto | Narrativa: já aplicou em **projetos reais** — não só teoria de faculdade |
| Tags | Ver lista abaixo |

**Conteúdo a listar (organizado por blocos no texto ou bullets animados):**

#### Arquitetura & system design

- Arquitetura **MVC** (aplicada em projetos reais)
- Arquitetura **hexagonal** (ports & adapters, domínio isolado)
- **System design**: separação de responsabilidades, escalabilidade, boundaries entre serviços
- **Design patterns** relevantes ao que você já usou (ex.: repository, factory, strategy — listar só os que você realmente aplicou)

#### Integrações reais (produção ou ambiente real de cliente)

- **Mercado Pago** — pagamentos / checkout / webhook
- **Login com Google** — OAuth / autenticação social
- Outras integrações que você tenha (APIs REST, webhooks, terceiros)

#### Segurança (práticas de mercado)

- **Rate limiting** — proteção de APIs e formulários (ex.: contato do portfólio)
- **RBAC** (Role-Based Access Control) — permissões por papel
- **Idempotência** — operações seguras em retries e pagamentos
- Validação de entrada (Zod/schemas), sanitização
- Headers de segurança, cookies de sessão, secrets em env
- *(Listar apenas o que você já implementou ou estudou com implementação)*

**Tags sugeridas (footer da seção):**

`SYSTEM DESIGN · MVC · HEXAGONAL · RBAC · RATE LIMITING · IDEMPOTENCY · INTEGRATIONS`

**Assets:**

- [ ] Diagrama hexagonal (camadas: domain, application, infrastructure)
- [ ] Diagrama MVC ou fluxo request → controller → service → repository
- [ ] Mockup fluxo Mercado Pago (checkout → webhook → confirmação)
- [ ] Mockup fluxo Google OAuth (redirect → token → sessão)
- [ ] Ícone/shield para bloco “segurança”
- [ ] Screenshot de middleware de rate limit ou guard RBAC (código legível, sem secrets)

**Copy angle (sugestão):**

> “Não paro na interface. Projeto APIs com NestJS pensando em domínio, integrações e segurança — rate limiting, RBAC e idempotência onde o negócio exige. Já entreguei integração com Mercado Pago e login social com Google em contexto real.”

---

### Seção 4 — Trabalhos / projetos

| Elemento | Conteúdo |
|----------|----------|
| Título | Ex.: `Trabalhos selecionados` |
| Imagens | Thumbnails Rei da Selva, faculdade, projetos pessoais — collage como case studies |
| Texto | Rei da Selva, freelance, projeto extracurricular, link para `/work` |
| Tags | `FREELANCE · WEB · DESIGN + DEV` |

**Assets:** reutilizar `public/projects/**`; adicionar crops para collage.

**Conexão com Seção 3:** mencionar no texto qual projeto usou hexagonal, Mercado Pago, etc. (quando aplicável).

---

### Seção 5 (opcional) — Próximo passo

- CTA suave: link para `/work` ou `/contact`
- 1–2 imagens + linha curta
- Transição para footer `Contact` (já existente)

---

### Mapa visual das seções

```text
1. Sobre Fredson     → fotos pessoais, história, Salvador
2. Stack             → logos tech, linguagens, DBs, filas
3. Arquitetura       → diagramas, integrações, segurança, patterns
4. Trabalhos         → cases, Rei da Selva, faculdade
5. CTA (opcional)    → /work ou /contact
6. Contact footer    → componente existente
```

---

## 6. Layout visual (wireframe)

```text
┌─────────────────────────────────────────────────────────────┐
│  [header fixo]                                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  TÍTULO GRANDE (esq, pode cruzar linha)                     │
│         │                                                   │
│         │    [img]  [img grande]                            │
│         │      [img]     [img]     ← collage centro         │
│         │                                                   │
│  texto + tags (esq, abaixo)    │                            │
│                                 │  linha vertical           │
│                                                             │
│                    ~100–120vh por seção                     │
└─────────────────────────────────────────────────────────────┘
```

**Grid sugerido (desktop):**

- Container `max-w-[1400px]`, padding lateral alinhado ao site
- Coluna central ~50% para collage; linha em `50%`
- Título: `grid-column` esquerda, pode `z-index` acima das imagens
- Texto: coluna esquerda, `max-w-xl`, abaixo do collage (margin-top após animação)

**Mobile:**

- Linha vertical pode ir para `left: 24px` ou ser omitida
- Collage empilhada, menos imagens visíveis (2–3)
- Título full width; animações mais curtas (menos scrub, mais toggle on enter)

---

## 7. Estilo visual a adotar

| Token | Valor | Notas |
|-------|-------|-------|
| Background | `#FFFFFF` | Limpo, editorial |
| Texto principal | `black` / `black/65` | Corpo leve |
| Títulos | `black`, `font-light` ou `font-normal`, tracking negativo | Grande escala |
| Tags | `black/40`, uppercase, small | Separador `·` ou `+` |
| Linha | `black/10`, 1px | Eixo central |
| Imagens | Sem borda ou sombra leve | Recortes orgânicos |
| Links no texto | underline sutil | Como Atypikal (BravoCon, etc.) |

Manter **consistência** com o restante do portfólio (Inter, weights light, spacing generoso). O collage é o elemento “Atypikal”; tipografia continua Fredson/Dennis.

---

## 8. Arquitetura de componentes (implementação futura)

```text
app/about/page.tsx
  └── AboutNarrativePage (client wrapper)
        ├── AboutStorySection           (Sobre Fredson)
        ├── AboutStackSection           (Stack tecnológica)
        ├── AboutArchitectureSection    (Arquitetura, patterns, segurança)
        ├── AboutWorkSection            (Trabalhos)
        └── Contact (footer existente)

components/about/narrative/
  ├── NarrativeScene.tsx         # layout + ScrollTrigger por seção
  ├── NarrativeCollage.tsx       # grid de imagens com data-depth
  ├── NarrativeTitle.tsx
  ├── NarrativeBody.tsx          # linhas com overflow-hidden
  ├── NarrativeTags.tsx
  ├── NarrativeBulletList.tsx    # opcional: lista de skills/patterns
  ├── CenterLine.tsx
  └── useNarrativeScene.ts       # hook GSAP timeline factory

lib/about/narrative-content.ts   # copy + imagens + tags por seção (5 blocos)
```

**Princípio:** um `NarrativeScene` reutilizável com props `title`, `body`, `tags`, `images[]` — conteúdo em arquivo separado para editar sem mexer em layout.

---

## 9. Performance e acessibilidade

- Imagens: `next/image` onde possível; WebP; lazy abaixo da fold
- `prefers-reduced-motion`: desabilitar scrub/skew; fade simples ou conteúdo estático
- Collage: limitar 4–6 imagens por seção no DOM
- ScrollTrigger: `ScrollTrigger.refresh()` após load de imagens e em route change (já feito no `AppHeader`)
- Lenis: manter desabilitado em `/about` se pin/scrub conflitar (avaliar na implementação — hoje Lenis é desligado em páginas internas via `LenisRouteSync`)

---

## 10. Fases de implementação

| Fase | Entregável |
|------|------------|
| **0** | Este documento + aprovação de copy e lista de assets |
| **1** | `NarrativeScene` estático (sem animação) — validar layout desktop/mobile |
| **2** | Animação collage + título (Camada A + B) |
| **3** | Animação corpo + tags (Camada C) |
| **4** | Conteúdo real (fotos Fredson, stacks, projetos) |
| **5** | Polish mobile, reduced-motion, performance |

---

## 11. Checklist de assets (para você preparar)

### Sobre Fredson
- [ ] 3–5 fotos suas (alta resolução, preferência fundo neutro ou recorte)
- [ ] Texto final revisado (3–4 parágrafos curtos)

### Stack tecnológica
- [ ] Logos: Node, TypeScript, NestJS, Next.js, PostgreSQL, MySQL/MariaDB, Supabase, RabbitMQ, Kafka
- [ ] Screenshot de estrutura de projeto ou terminal
- [ ] Diagrama simples front → API → DB/fila (opcional)

### Arquitetura & engenharia
- [ ] Diagrama arquitetura hexagonal
- [ ] Diagrama MVC ou fluxo em camadas
- [ ] Fluxo Mercado Pago (checkout / webhook)
- [ ] Fluxo login Google (OAuth)
- [ ] Visual “segurança”: rate limit, RBAC, idempotência (ícones ou snippet de código)
- [ ] Lista final de design patterns que você **realmente** usou (para não inflar)

### Trabalhos
- [ ] Rei da Selva (já em `public/projects/`)
- [ ] Projeto faculdade / outros freelances
- [ ] Thumbnails quadrados ou wide para collage

---

## 12. Resumo executivo

- **Referência:** [Atypikal](https://atypikal.co/) — não Dennis — para esta página narrativa.
- **Diferencial:** storytelling scroll-driven com collage + linha vertical + motion em 3 camadas.
- **Stack:** GSAP + ScrollTrigger + Lenis (já no projeto). SplitText opcional.
- **Animações:** (A) imagens sobem, (B) título na mesma timeline, (C) texto “assenta” com skew/rotate leve.
- **Seções:** Sobre → **Stack** → **Arquitetura & engenharia** → Trabalhos (5 cenas + footer).
- **Stack:** Node, TS, NestJS, Next.js, PostgreSQL, MariaDB, MySQL, Supabase, RabbitMQ, Kafka.
- **Arquitetura:** MVC, hexagonal, system design, Mercado Pago, Google login, rate limiting, RBAC, idempotência — em projetos reais.
- **Próximo passo:** validar este doc, reunir assets, depois implementar Fase 1.

---

## Referências

- [Atypikal Creative](https://atypikal.co/)
- [Codrops — Exat microsite (GSAP + Lenis + SplitText)](https://tympanus.net/codrops/2026/04/10/the-exat-microsite-pushing-a-typography-showcase-to-new-creative-extremes/)
- [Codrops — Podium (GSAP + Lenis + ScrollTrigger)](https://tympanus.net/codrops/2026/06/23/podium-building-a-website-where-running-becomes-storytelling/)
- Código existente no repo: `components/sections/About.tsx` (reveal de linhas), `context/SmoothScrollContext.tsx` (Lenis + ScrollTrigger)
