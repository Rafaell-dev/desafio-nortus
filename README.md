<div align="center">

# 🛡️ Nortus — Insurance Management Platform

**Sistema inteligente de gestão para seguradoras**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest)](https://vitest.dev/)
[![License](https://img.shields.io/badge/license-Private-red)]()

<br />

> **Desafio técnico** — Processo seletivo [Loomi](https://loomi.com.br)

</div>

---

## 📑 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Preview das Telas](#-preview-das-telas)
- [Tech Stack](#-tech-stack)
- [Arquitetura](#-arquitetura)
- [Funcionalidades](#-funcionalidades)
- [Internacionalização](#-internacionalização-i18n)
- [Autenticação & Segurança](#-autenticação--segurança)
- [Design System](#-design-system)
- [Testes](#-testes)
- [Começando](#-começando)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura de Pastas](#-estrutura-de-pastas)

---

## 🎯 Sobre o Projeto

O **Nortus** é uma plataforma completa de gestão voltada para o mercado de seguros, construída como um desafio técnico para o processo seletivo da **Loomi**. A aplicação oferece um painel administrativo rico em dados, com dashboards analíticos, gestão de tickets de suporte, um assistente de chat com sugestões de IA e um simulador interativo de planos de seguro.

O projeto foi desenvolvido com foco em:

| Pilar | Detalhes |
|-------|----------|
| 🏗️ **Arquitetura Escalável** | Feature-based structure com separação clara de responsabilidades |
| 🌍 **Acessibilidade Global** | Suporte a 3 idiomas com `next-intl` |
| 🔐 **Segurança** | Autenticação via HttpOnly Cookies + Middleware Guard |
| 📊 **Visualização de Dados** | Gráficos interativos com ApexCharts + Mapas com OpenLayers |
| ✅ **Qualidade de Código** | 45 testes automatizados com Vitest + Testing Library + MSW |
| 🎨 **UI Moderna** | Dark theme com design system próprio + shadcn/ui |

---

## 🖼️ Preview das Telas

| Tela | Descrição |
|------|-----------|
| **Login** | Formulário de autenticação com validação em tempo real e seletor de idioma |
| **Dashboard** | KPIs de evolução (retenção, conversão, churn, ARPU), mapa de clientes e lista de clientes ativos |
| **Tickets** | Gestão completa de chamados com filtros, estatísticas, paginação e criação de novos tickets |
| **Chat** | Interface de conversa com análise de insights e sugestões inteligentes de IA |
| **Simulador** | Calculadora interativa de planos de seguro com configuração de coberturas e indicadores |

---

## 🧱 Tech Stack

### Core

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| [Next.js](https://nextjs.org/) | `16.1.6` | Framework fullstack com App Router |
| [React](https://react.dev/) | `19.2.3` | Biblioteca de UI com Server Components |
| [TypeScript](https://www.typescriptlang.org/) | `5` | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/) | `4` | Utility-first CSS |

### UI & Visualização

| Tecnologia | Uso |
|-----------|-----|
| [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) | Componentes acessíveis (Button, Dialog, Select, Slider, Tooltip...) |
| [ApexCharts](https://apexcharts.com/) | Gráficos de área para KPIs e taxa de conversão |
| [OpenLayers](https://openlayers.org/) | Mapa interativo com geolocalização de clientes |
| [Lucide React](https://lucide.dev/) | Iconografia consistente |

### Estado & Formulários

| Tecnologia | Uso |
|-----------|-----|
| [Zustand](https://zustand.docs.pmnd.rs/) | Gerenciamento de estado global (chat, simulator) |
| [React Hook Form](https://react-hook-form.com/) | Formulários performáticos |
| [Zod](https://zod.dev/) | Validação de schemas |

### Internacionalização

| Tecnologia | Uso |
|-----------|-----|
| [next-intl](https://next-intl.dev/) | i18n com suporte a Server & Client Components |

### Testes

| Tecnologia | Uso |
|-----------|-----|
| [Vitest](https://vitest.dev/) | Test runner rápido e compatível com Vite |
| [Testing Library](https://testing-library.com/) | Testes focados no comportamento do usuário |
| [MSW](https://mswjs.io/) | Mock de API em nível de rede |

---

## 🏛️ Arquitetura

O projeto segue uma **arquitetura Feature-based** combinada com o poder do **Next.js App Router**, garantindo separação de responsabilidades e escalabilidade.

```
┌──────────────────────────────────────────────────────────────┐
│                        BROWSER                               │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐  ┌───────────────┐  ┌──────────────────┐   │
│  │   Pages      │  │  Components   │  │     Hooks        │   │
│  │  (App Router)│──│  (Features)   │──│  (Custom Logic)  │   │
│  └──────┬──────┘  └───────┬───────┘  └────────┬─────────┘   │
│         │                 │                    │              │
│         ▼                 ▼                    ▼              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              Zustand Stores / React State             │    │
│  └──────────────────────────┬───────────────────────────┘    │
│                             │                                │
├─────────────────────────────┼────────────────────────────────┤
│                             ▼                                │
│  ┌──────────────────────────────────────────────────────┐    │
│  │            BFF - API Routes (Next.js)                 │    │
│  │     /api/dashboard  /api/tickets  /api/chat           │    │
│  │     /api/simulator  /api/map                          │    │
│  └──────────────────────────┬───────────────────────────┘    │
│                             │ HttpOnly Cookie (Bearer Token) │
├─────────────────────────────┼────────────────────────────────┤
│                             ▼                                │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                   External API                        │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

### Decisões Arquiteturais

| Decisão | Motivação |
|---------|-----------|
| **BFF Pattern** | API routes do Next.js como proxy, isolando tokens e lógica de autenticação do client-side |
| **Server Actions** | Login e logout via Server Actions para manipulação segura de cookies |
| **Middleware Guard** | Interceptação de rotas protegidas com verificação de `auth_token` antes do render |
| **Feature-based Structure** | Cada feature (`auth`, `dashboard`, `tickets`, `chat`, `simulator`) é auto-contida com seus componentes, hooks, services e tipos |
| **Zustand para estado global** | Leve, sem boilerplate, perfeito para stores de chat e simulador |

---

## ✨ Funcionalidades

### 🔐 Login

- Formulário com validação em tempo real (Zod + React Hook Form)
- Feedback visual de erros com mensagens traduzidas
- Seletor de idioma dinâmico (🇧🇷 🇺🇸 🇪🇸)
- Autenticação via Server Actions com cookie seguro

### 📊 Dashboard

- **KPI Evolution Chart** — Gráfico de área com 4 métricas (Retenção, Conversão, Churn, ARPU) navegáveis por tabs
- **Conversion Rate Chart** — Visualização dedicada da taxa de conversão
- **Client Map** — Mapa interativo (OpenLayers) com marcadores clicáveis exibindo informações do cliente em popups
- **Active Clients List** — Tabela de clientes ativos com dados detalhados

### 🎫 Tickets

- **Listagem completa** com filtros por pesquisa, status, prioridade e responsável
- **Estatísticas em tempo real** — Abertos, Em andamento, Resolvidos hoje, Tempo médio
- **Criação de tickets** via modal com formulário validado
- **Indicadores visuais** — Cores por prioridade (Urgente 🔴, Alta 🟠, Média 🟡, Baixa 🟢) e por status
- **Paginação** para navegação eficiente
- **Skeleton loading** animado durante carregamento

### 💬 Chat

- **Interface de conversa** com bubbles estilizadas por tipo de mensagem
- **Sugestões de IA** — Bubbles diferenciadas para ações sugeridas pela inteligência artificial
- **Análise de conversa** — Painel lateral com insights e ações futuras extraídos automaticamente
- **Estado global** com Zustand para gerenciamento de mensagens e conversas

### 🧮 Simulador de Seguros

- **3 Planos** — Seleção entre planos pré-definidos (Básico, Intermediário, Premium)
- **Painel de Configuração** — Sliders para valor do veículo e idade + toggles de coberturas (Furto/Roubo, Colisão, Incêndio, Natureza)
- **Indicadores** — Painel com métricas calculadas em tempo real
- **Lista de Benefícios** — Detalhamento das coberturas incluídas no plano selecionado

---

## 🌍 Internacionalização (i18n)

O projeto suporta **3 idiomas** com tradução completa de toda a interface:

| Idioma | Código | Padrão |
|--------|--------|--------|
| 🇧🇷 Português (Brasil) | `pt-BR` | ✅ |
| 🇺🇸 English | `en` | — |
| 🇪🇸 Español | `es` | — |

- **Roteamento por locale** — URLs como `/en/dashboard`, `/es/tickets`
- **`localePrefix: 'as-needed'`** — O locale padrão (`pt-BR`) não aparece na URL
- **Server & Client Components** — `getTranslations()` no server, `useTranslations()` no client
- **Troca dinâmica** — Seletor de idioma disponível na tela de login

---

## 🔐 Autenticação & Segurança

```
Login Form ──▶ Server Action ──▶ External API ──▶ Set HttpOnly Cookie
                                                        │
Middleware ◀────────────────────────────────────────────┘
    │
    ├── Cookie presente? ──▶ Permite acesso às rotas protegidas
    │
    └── Cookie ausente? ──▶ Redireciona para /login
```

- **HttpOnly Cookies** — Token nunca acessível via JavaScript no client
- **Secure + SameSite** — Proteção contra XSS e CSRF
- **Middleware Guard** — Rotas `/dashboard`, `/tickets`, `/chat`, `/calculator` protegidas
- **BFF Proxy** — API routes injetam o token automaticamente nas requisições ao backend
- **Cookie com expiração** — 7 dias de validade com renovação no login

---

## 🎨 Design System

O projeto utiliza um **Dark Theme** sofisticado com design tokens customizados:

### Paleta de Cores

| Token | Cor | Uso |
|-------|-----|-----|
| `--background` | `#0B1125` | Fundo principal |
| `--dark-surface` | `#20273E` | Cards e superfícies |
| `--blue` | `#1876D2` | Ações primárias e destaques |
| `--priority-urgent` | `#EF4444` | Prioridade urgente |
| `--priority-high` | `#F97316` | Prioridade alta |
| `--priority-medium` | `#EAB308` | Prioridade média |
| `--priority-low` | `#22C55E` | Prioridade baixa |

### Tipografia

| Fonte | Variável | Uso |
|-------|----------|-----|
| **Inter** | `--font-inter` | Corpo do texto |
| **Space Grotesk** | `--font-space-grotesk` | Títulos e destaques |

### Componentes shadcn/ui

`Button` · `Input` · `Select` · `Dialog` · `Checkbox` · `Slider` · `Tooltip` · `Alert` · `Form` · `Label`

---

## ✅ Testes

O projeto conta com uma suite de **45 testes automatizados** utilizando a **Testing Pyramid** como estratégia:

```
         ╱ ╲
        ╱ E2E╲          (futuro)
       ╱───────╲
      ╱Integração╲      LoginForm, LanguageSelector
     ╱─────────────╲
    ╱   Unitários    ╲   Schema, API, Service, Hook
   ╱───────────────────╲
```

### Cobertura Atual

| Arquivo | Tipo | Testes | Descrição |
|---------|------|--------|-----------|
| `loginSchema.test.ts` | Unitário | 8 | Validações de email, senha e edge cases |
| `authApi.test.ts` | Unitário | 5 | Requisições HTTP com MSW |
| `authService.test.ts` | Unitário | 6 | Lógica de negócio de autenticação |
| `useLogin.test.ts` | Unitário | 10 | Hook com estados, loading e erros |
| `loginForm.test.tsx` | Integração | 10 | Renderização, validação e submissão do formulário |
| `LanguageSelector.test.tsx` | Integração | 6 | Seleção de idioma e navegação |

### Infraestrutura

- **MSW (Mock Service Worker)** — Interceptação de requisições em nível de rede
- **Testing Library** — Testes focados no comportamento do usuário, não em detalhes de implementação
- **Custom Render** — Wrapper com providers (NextIntlClientProvider)
- **Setup global** — Polyfills (ResizeObserver) e configuração de mocks

---

## 🚀 Começando

### Pré-requisitos

- **Node.js** >= 18
- **npm** >= 9

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/desafio-nortus.git

# Entre na pasta do projeto
cd desafio-nortus

# Instale as dependências
npm install
```

### Executando

```bash
# Servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run lint` | Executa o ESLint |
| `npm test` | Roda todos os testes |
| `npm run test:watch` | Testes em modo watch |
| `npm run test:coverage` | Testes com relatório de cobertura |
| `npm run test:ui` | Interface visual do Vitest |

---

## 📂 Estrutura de Pastas

```
desafio-nortus/
├── 📁 components/ui/          # Componentes shadcn/ui
├── 📁 lib/                    # Utilitários (cn helper)
├── 📁 messages/               # Arquivos de tradução (pt-BR, en, es)
├── 📁 public/                 # Assets estáticos (ícones, ilustrações)
├── 📁 src/
│   ├── 📁 app/                # App Router (layouts, pages, API routes)
│   │   ├── globals.css        # Design tokens e estilos globais
│   │   ├── layout.tsx         # Root layout (fontes, providers)
│   │   ├── [locale]/          # Rotas internacionalizadas
│   │   │   ├── page.tsx       # Login page
│   │   │   └── (main)/       # Grupo de rotas protegidas
│   │   │       ├── layout.tsx # Layout com Sidebar
│   │   │       ├── dashboard/
│   │   │       ├── tickets/
│   │   │       ├── chat/
│   │   │       └── calculator/
│   │   └── api/               # BFF API Routes
│   │       ├── dashboard/
│   │       ├── tickets/
│   │       ├── chat/
│   │       ├── simulator/
│   │       └── map/
│   ├── 📁 features/           # Módulos de funcionalidade
│   │   ├── auth/              # 🔐 Autenticação
│   │   │   ├── actions.ts     # Server Actions (login, getUserByEmail)
│   │   │   ├── components/    # LoginForm, LanguageSelector
│   │   │   ├── hooks/         # useLogin
│   │   │   ├── schemas/       # loginSchema (Zod)
│   │   │   ├── services/      # authApi, authService
│   │   │   └── types/         # auth.types.ts
│   │   ├── dashboard/         # 📊 Dashboard analítico
│   │   ├── tickets/           # 🎫 Gestão de chamados
│   │   ├── chat/              # 💬 Chat com IA
│   │   ├── simulator/         # 🧮 Simulador de seguros
│   │   ├── common/            # 🔧 Componentes compartilhados
│   │   └── users/             # 👤 Dados de usuário
│   ├── 📁 i18n/               # Configuração de internacionalização
│   ├── 📁 tests/              # Infraestrutura de testes
│   │   ├── setup.tsx          # Setup global (polyfills, mocks)
│   │   ├── test-utils.tsx     # Custom render com providers
│   │   └── mocks/             # MSW handlers e server
│   └── proxy.ts               # Middleware (auth guard + i18n)
├── vitest.config.ts           # Configuração do Vitest
├── next.config.ts             # Configuração do Next.js
├── tsconfig.json              # Configuração do TypeScript
└── package.json
```

---

<div align="center">

Desenvolvido com ☕ e dedicação para o desafio técnico **Loomi**

**Next.js 16** · **React 19** · **TypeScript** · **Tailwind CSS 4**

</div>
