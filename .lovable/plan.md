
# Navegacao Global — Tornar Todas as Rotas Acessiveis

## Problema

Nenhuma pagina do site tem um menu de navegacao global com links reais para as rotas. Os componentes `MobileNavigation`, `MobileBottomNav` e `MobileHeader` apenas disparam callbacks de scroll em secoes — nao navegam entre paginas. As unicas formas de chegar a `/indice`, `/projetos`, `/divulgacao` ou `/devtools-guide` sao links espalhados dentro do conteudo das paginas.

## Solucao

Criar um **header de navegacao global** que apareca em todas as paginas com links diretos para as rotas principais, e atualizar o `MobileBottomNav` para navegar entre rotas usando `react-router-dom`.

## Componentes

### 1. Novo: `src/components/GlobalHeader.tsx`

Header fixo no topo com:
- Logo/titulo "AI-Powered Dev" com link para `/`
- Links de navegacao desktop (visivel em `md+`):
  - Inicio (`/`)
  - Indice de Ferramentas (`/indice`)
  - Projetos IA (`/projetos`)
  - Marketing (`/divulgacao`)
- Menu hamburger mobile (Sheet) com os mesmos links
- Badge de novidades no link do Indice (usando `useNewToolsAlert`)

```text
Desktop:
+---------------------------------------------------------------+
| AI-Powered Dev   | Inicio | Indice | Projetos | Marketing     |
+---------------------------------------------------------------+

Mobile:
+---------------------------------------------------------------+
| [Menu]   AI-Powered Dev                                       |
+---------------------------------------------------------------+
```

### 2. Modificar: `src/components/MobileBottomNav.tsx`

Trocar callbacks `onTabChange` por navegacao real com `useNavigate`:
- Inicio → `/`
- Ferramentas → `/indice`
- Projetos → `/projetos`
- Marketing → `/divulgacao`

Usar `useLocation` para destacar o tab ativo baseado na rota atual.

### 3. Modificar: `src/pages/LandingPage.tsx`

- Adicionar `GlobalHeader` no topo
- Adicionar `MobileBottomNav` no final (com navegacao por rotas)

### 4. Modificar: Todas as sub-paginas

Adicionar `GlobalHeader` nas paginas que ainda nao tem header consistente:
- `src/pages/LandingPage.tsx`
- `src/pages/DevToolsGuide.tsx` (substituir header local)
- `src/pages/MarketingGuidePage.tsx` (substituir header local)
- `src/pages/ProjectSuggestionsPage.tsx` (substituir header local)
- `src/pages/ToolIndexHub.tsx`

Alternativa mais limpa: adicionar o `GlobalHeader` diretamente no `App.tsx` (acima do `<Routes>`) para que apareca em todas as paginas automaticamente, sem precisar editar cada pagina individualmente.

## Arquivos

### Criar
- `src/components/GlobalHeader.tsx`

### Modificar
- `src/App.tsx` — adicionar `GlobalHeader` e `MobileBottomNav` no layout global
- `src/components/MobileBottomNav.tsx` — usar `Link`/`useNavigate` em vez de callbacks

### Remover dependencia
- Headers locais duplicados em sub-paginas podem ser simplificados (manter apenas botao "Voltar" onde necessario)

## Secao Tecnica

### GlobalHeader

```typescript
// Rotas do menu
const navItems = [
  { path: "/", label: "Inicio", icon: Home },
  { path: "/indice", label: "Ferramentas", icon: BookOpen },
  { path: "/projetos", label: "Projetos IA", icon: Sparkles },
  { path: "/divulgacao", label: "Marketing", icon: Megaphone },
];
```

Usa `useLocation()` para destacar a rota ativa e `Link` do `react-router-dom` para navegacao.

### MobileBottomNav Atualizado

```typescript
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { path: "/", label: "Inicio", icon: Home },
  { path: "/indice", label: "Ferramentas", icon: Search },
  { path: "/projetos", label: "Projetos", icon: Sparkles },
  { path: "/divulgacao", label: "Marketing", icon: Megaphone },
];

// Cada tab sera um <Link to={tab.path}>
// useLocation().pathname determina qual esta ativo
```

### Integracao no App.tsx

```typescript
const AppRoutes = () => (
  <>
    <GlobalHeader />
    <Suspense fallback={<LoadingFallback />}>
      <Routes>...</Routes>
    </Suspense>
    <MobileBottomNav />
    <FloatingButton />
  </>
);
```

## Resultado

- Todas as rotas acessiveis de qualquer pagina
- Navegacao consistente em desktop e mobile
- Header global com destaque de rota ativa
- Bottom nav mobile funcional com rotas reais
