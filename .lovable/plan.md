# Correção de Contraste no Tema Escuro

## Problema

Vários componentes usam cores fixas (`bg-white`, `bg-gray-100`, `bg-blue-50`, `text-blue-700`, `text-gray-600` etc.) em vez dos tokens semânticos do design system. No tema escuro essas combinações ficam ilegíveis — texto azul claro sobre fundo azul claro, página inteira branca, badges e cards sem contraste.

## Telas/componentes afetados

1. **`src/pages/NotFound.tsx`** — fundo `bg-gray-100` e texto `text-gray-600` fixos.
2. **`src/pages/MarketingGuidePage.tsx`** — 3 cards de preços (`bg-blue-50/50`, `bg-purple-50/50`, `text-blue-700`, `text-purple-700`, etc.) viram texto colorido sobre fundo quase invisível no escuro.
3. **`src/components/MobileToolCard.tsx`** — fallback `bg-gray-100 text-gray-800` para badges de dificuldade desconhecida.
4. **`src/components/EnhancedToolCard.tsx`** — estrelas vazias com `text-gray-300` somem no escuro.
5. **`src/pages/NewToolsBanner` e gradientes "purple-500 → pink-500"** — funcionam em ambos os temas, mas vou revisar contraste do texto `text-white` quando aplicável (ok manter).

Também faço um sweep geral procurando por `text-gray-*`, `bg-gray-*`, `bg-white`, `bg-blue-50`, `bg-purple-50` em qualquer outro arquivo que apareça e troco pelos tokens.

## Solução

Substituir cores fixas pelos tokens semânticos já definidos em `index.css` / `tailwind.config.ts`:

| Antes | Depois |
|---|---|
| `bg-gray-100`, `bg-white` | `bg-background` ou `bg-card` |
| `text-gray-600`, `text-gray-800` | `text-muted-foreground` ou `text-foreground` |
| `bg-blue-50/50` (card destacado) | `bg-muted/50` + `border-border` |
| `text-blue-700` em destaque | manter cor da marca via `text-primary` ou criar variante |
| `text-gray-300` (estrela vazia) | `text-muted-foreground/40` |

Para os cards de preços de Marketing (Iniciante/Intermediário/Especialista), uso uma única abordagem consistente: `bg-card` + `border-border` + título em `text-foreground` + valor em `text-primary` + descrição em `text-muted-foreground`. Mantenho diferenciação visual via ícone ou pequeno acento colorido.

## Arquivos a modificar

- `src/pages/NotFound.tsx`
- `src/pages/MarketingGuidePage.tsx`
- `src/components/MobileToolCard.tsx`
- `src/components/EnhancedToolCard.tsx`
- (Possíveis outros descobertos durante o sweep — vou listar antes de tocar)

## Validação

Após as edições, abro a preview no tema escuro e verifico:
- Página `/divulgacao` (cards de preços legíveis)
- Página 404 (fundo e texto adaptam-se)
- Cards de ferramentas (badges e estrelas visíveis)

Sem mudanças de comportamento — só ajustes visuais para respeitar o tema.
