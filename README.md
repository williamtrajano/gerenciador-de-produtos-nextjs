# Gerenciador de Produtos (Next.js)

Aplicação web para gerenciamento de produtos, com foco em:

- Next.js (App Router) + TypeScript
- Estado global
- Consumo de API fictícia (mock)
- UI com Tailwind CSS
- 1 teste de snapshot

## Funcionalidades

- Listagem de produtos exibindo: **nome**, **categoria**, **preço**, **descrição**, **imagem (URL)**
- Cadastro de novo produto (campos: **nome, preço, descrição, URL da imagem**)
- Filtros: **nome** e **faixa de preço** (mínimo/máximo)
- **Ordenação** (mais recentes, nome, preço, categoria)
- **Paginação** (extra)
- Layout responsivo (extra)

## Stack e escolhas

- **Estado global:** Zustand (simples, direto e sem boilerplate)
	- Store em [src/store/productsStore.ts](src/store/productsStore.ts)
- **Mock de API:** MSW (Mock Service Worker) no browser (intercepta chamadas `fetch`)
	- Handlers em [src/mocks/handlers.ts](src/mocks/handlers.ts)
	- Worker gerado em `public/mockServiceWorker.js`
- **Fallback de API (opcional, mas ajuda):** rota Next em [app/api/products/route.ts](app/api/products/route.ts)
	- Assim a aplicação continua funcionando mesmo se o MSW estiver desabilitado.
- **UI:** Tailwind CSS + componentes pequenos reutilizáveis

## Como rodar

Requisitos: Node.js + npm.

```bash
npm install
npm run dev
```

Abrir: http://localhost:4000

## Testes

```bash
npm test
```

## Produção (local)

```bash
npm run build
npm run start
```

Abrir: http://localhost:4000

- Snapshot test em [src/__tests__/products-page.snapshot.test.tsx](src/__tests__/products-page.snapshot.test.tsx)

## Endpoints (mock)

O front consome:

- `GET /api/products` → `{ items: Product[] }`
- `POST /api/products` → `{ item: Product }`

No desenvolvimento, o MSW é iniciado automaticamente via [src/mocks/MswProvider.tsx](src/mocks/MswProvider.tsx).

Se quiser forçar o mock, você pode usar:

- `NEXT_PUBLIC_API_MOCKING=enabled`

