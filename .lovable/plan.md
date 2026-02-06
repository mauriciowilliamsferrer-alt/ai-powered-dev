
# Separacao de Categorias em Paginas Especializadas

## Contexto Atual

O projeto possui atualmente:
- **252 ferramentas** em **30 categorias** no arquivo `toolsIndex.ts`
- Uma unica pagina `/indice` que lista todas as ferramentas
- Paginas especializadas ja existentes: `/divulgacao` (Marketing), `/projetos` (Sugestoes IA)

## Problema

A pagina `/indice` ficou muito extensa com 252 ferramentas. Usuarios precisam fazer scroll excessivo para encontrar o que buscam.

## Solucao Proposta

Criar paginas especializadas para grupos de categorias relacionadas, mantendo o indice geral como hub de navegacao.

## Arquitetura de Paginas

```text
/indice (Hub Central)
    |
    +-- /indice/desenvolvimento
    |       IDEs, Agentes, Builders, Backend, Deploy
    |
    +-- /indice/ia-generativa  
    |       Imagens, Videos, Audio, Modelos IA
    |
    +-- /indice/design
    |       Prototipagem, UI, Assets, Icones
    |
    +-- /indice/marketing
    |       Redes Sociais, SEO, Monetizacao, Leads
    |
    +-- /indice/servicos
    |       APIs, Scraping, Email, Pagamentos, Auth
    |
    +-- /indice/qualidade
            Testes, Seguranca, Automacao, Analytics
```

## Mapeamento de Categorias por Pagina

### 1. Desenvolvimento (`/indice/desenvolvimento`)
- Desenvolvimento (Builders, IDEs, Agentes)
- Backend & Database  
- Deploy
- Infraestrutura
- IA Local
- APIs de LLM

**Total: ~45 ferramentas**

### 2. IA Generativa (`/indice/ia-generativa`)
- IA Generativa (Imagens, Videos, Audio)
- Ideacao com IA
- Modelos IA 2025 (novos)

**Total: ~35 ferramentas**

### 3. Design & Prototipagem (`/indice/design`)
- Prototipagem & UI
- Design
- Assets (Icones, Fotos)

**Total: ~20 ferramentas**

### 4. Marketing & Crescimento (`/indice/marketing`)
- Redes Sociais
- Marketing Digital
- SEO
- Tendencias
- Monetizacao
- Portfolio
- Networking
- Captura de Leads
- Investimento
- Freelance
- Educacao

**Total: ~74 ferramentas**

### 5. Servicos & APIs (`/indice/servicos`)
- Servicos & APIs (Scraping, Email, Pagamentos, Auth, etc.)

**Total: ~43 ferramentas**

### 6. Qualidade & Operacoes (`/indice/qualidade`)
- Qualidade & Testes
- Seguranca
- Automacao
- Analytics
- Boas Praticas
- Documentacao

**Total: ~35 ferramentas**

## Componentes a Criar

### 1. CategoryPage (Componente Reutilizavel)
Pagina template para exibir ferramentas de categorias especificas:
- Header com titulo, descricao e icone
- Barra de busca local
- Filtros (pricing, novidades)
- Grid de ferramentas
- Link para voltar ao indice geral

### 2. ToolIndexHub (Nova Pagina Principal)
Substitui o indice atual por um hub de navegacao:
- Cards para cada pagina especializada
- Contador de ferramentas por area
- Busca global que redireciona para categoria correta
- Acesso rapido as novidades 2025

## Arquivos a Criar

```text
src/pages/
  ToolIndexHub.tsx          # Nova pagina principal do indice
  ToolCategoryPage.tsx      # Componente reutilizavel

src/data/
  categoryGroups.ts         # Agrupamento de categorias por pagina
```

## Arquivos a Modificar

```text
src/App.tsx                 # Adicionar novas rotas
src/components/ToolIndex.tsx # Adaptar para receber categorias filtradas
src/data/toolsIndex.ts      # Exportar grupos de categorias
```

## Estrutura de Rotas

```typescript
// Em App.tsx
<Route path="/indice" element={<ToolIndexHub />} />
<Route path="/indice/desenvolvimento" element={<ToolCategoryPage group="desenvolvimento" />} />
<Route path="/indice/ia-generativa" element={<ToolCategoryPage group="ia-generativa" />} />
<Route path="/indice/design" element={<ToolCategoryPage group="design" />} />
<Route path="/indice/marketing" element={<ToolCategoryPage group="marketing" />} />
<Route path="/indice/servicos" element={<ToolCategoryPage group="servicos" />} />
<Route path="/indice/qualidade" element={<ToolCategoryPage group="qualidade" />} />
```

## UX do Hub Central

O novo `/indice` mostrara:

```text
+------------------------------------------+
|  Indice de Ferramentas  (252 total)      |
|  [Busca global...]                       |
+------------------------------------------+
|                                          |
|  +------------+  +------------+          |
|  | DESENVOL-  |  | IA GENE-   |          |
|  | VIMENTO    |  | RATIVA     |          |
|  | 45 tools   |  | 35 tools   |          |
|  | >          |  | >          |          |
|  +------------+  +------------+          |
|                                          |
|  +------------+  +------------+          |
|  | DESIGN     |  | MARKETING  |          |
|  | 20 tools   |  | 74 tools   |          |
|  | >          |  | >          |          |
|  +------------+  +------------+          |
|                                          |
|  +------------+  +------------+          |
|  | SERVICOS   |  | QUALIDADE  |          |
|  | 43 tools   |  | 35 tools   |          |
|  | >          |  | >          |          |
|  +------------+  +------------+          |
|                                          |
|  [Ver todas as ferramentas A-Z]          |
|                                          |
+------------------------------------------+
```

## Beneficios

1. **Navegacao mais rapida**: Usuario vai direto para area de interesse
2. **Menos scroll**: Cada pagina tem ~30-75 ferramentas vs 252
3. **SEO melhor**: URLs especificas para cada area
4. **Manutencao facil**: Adicionar ferramentas em categorias certas
5. **Performance**: Lazy load de paginas especializadas

## Secao Tecnica

### Interface CategoryGroup

```typescript
interface CategoryGroup {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  categories: string[]; // nomes das categorias incluidas
}

const categoryGroups: CategoryGroup[] = [
  {
    id: "desenvolvimento",
    name: "Desenvolvimento",
    description: "IDEs, agentes de codigo, backend e deploy",
    icon: Code2,
    color: "hsl(221 83% 53%)",
    categories: [
      "Desenvolvimento",
      "Backend",
      "Deploy",
      "Infraestrutura",
      "IA Local",
      "APIs de LLM"
    ]
  },
  // ... outros grupos
];
```

### Componente ToolCategoryPage

```typescript
interface ToolCategoryPageProps {
  group: string; // id do grupo
}

const ToolCategoryPage = ({ group }: ToolCategoryPageProps) => {
  const groupData = categoryGroups.find(g => g.id === group);
  const tools = allTools.filter(t => 
    groupData.categories.includes(t.category)
  );
  
  return (
    <ToolIndex 
      tools={tools}
      title={groupData.name}
      // ... outras props
    />
  );
};
```

### Busca Global com Redirecionamento

```typescript
const handleGlobalSearch = (query: string) => {
  const tool = allTools.find(t => 
    t.name.toLowerCase().includes(query.toLowerCase())
  );
  
  if (tool) {
    const group = findGroupForCategory(tool.category);
    navigate(`/indice/${group.id}`, { 
      state: { highlightedToolId: tool.id, searchQuery: query }
    });
  }
};
```

## Fases de Implementacao

### Fase 1: Estrutura de Dados
- Criar `categoryGroups.ts` com mapeamento
- Exportar grupos em `toolsIndex.ts`

### Fase 2: Componentes
- Criar `ToolIndexHub.tsx` (hub principal)
- Adaptar `ToolIndex.tsx` para aceitar ferramentas filtradas

### Fase 3: Rotas
- Adicionar rotas em `App.tsx`
- Criar paginas especializadas com lazy loading

### Fase 4: Navegacao
- Atualizar links existentes
- Adicionar breadcrumbs nas paginas especializadas
- Testar navegacao entre paginas
