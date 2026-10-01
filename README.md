# GPMB Procurement — Next.js

Website da GPMB, Lda convertido de **TanStack Start para Next.js (App Router)**, mantendo o layout, componentes UI, animações, formulário de contacto, Supabase e versões PT/EN.

## Stack

- Next.js 16 + React 19
- App Router
- TypeScript
- Tailwind CSS 4
- shadcn/Radix UI
- Motion
- React Hook Form + Zod
- Supabase

## Estrutura principal

```text
app/
  [locale]/page.tsx     # /pt e /en
  api/contact/route.ts  # API de contacto
  globals.css
  layout.tsx
  page.tsx              # redireccionamento para o idioma
components/
  gpmb/Site.tsx
  gpmb/WingMark.tsx
  ui/                   # componentes existentes
assets/
public/
  docs/
lib/
messages/
integrations/supabase/
supabase/migrations/
```

## Instalação

```bash
npm install
npm run dev
```

Depois abra `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha as credenciais do Supabase.

O endpoint `/api/contact` usa `SUPABASE_SERVICE_ROLE_KEY` no servidor para gravar os pedidos na tabela `contact_submissions`. **Nunca coloque esta chave num `NEXT_PUBLIC_*`.**

## Rotas

- `/` — detecta o idioma guardado no cookie ou no navegador e redirecciona.
- `/pt` — versão portuguesa.
- `/en` — versão inglesa.
- `/api/contact` — submissão do formulário de contacto.
