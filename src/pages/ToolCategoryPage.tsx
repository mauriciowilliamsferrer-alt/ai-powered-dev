import { useParams, useLocation } from "react-router-dom";
import { categoryGroups, getToolsByGroup } from "@/data/categoryGroups";
import { allTools } from "@/data/toolsIndex";
import { FilteredToolIndex } from "@/components/FilteredToolIndex";

interface ToolCategoryPageProps {
  group?: string;
}

const ToolCategoryPage = ({ group: propGroup }: ToolCategoryPageProps) => {
  const { groupId } = useParams<{ groupId: string }>();
  const location = useLocation();
  
  const groupIdToUse = propGroup || groupId;
  const highlightedToolId = location.state?.highlightedToolId;
  const initialSearchQuery = location.state?.searchQuery;

  // Se for "todas", mostrar todas as ferramentas
  if (groupIdToUse === "todas") {
    return (
      <FilteredToolIndex
        tools={allTools}
        title="Todas as Ferramentas"
        description="Lista completa de todas as ferramentas em ordem alfabética"
        color="hsl(221 83% 53%)"
        highlightedToolId={highlightedToolId}
        initialSearchQuery={initialSearchQuery}
        showAlphabeticalByDefault
      />
    );
  }

  const groupData = categoryGroups.find(g => g.id === groupIdToUse);
  
  if (!groupData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Categoria não encontrada</h1>
          <p className="text-muted-foreground">A categoria "{groupIdToUse}" não existe.</p>
        </div>
      </div>
    );
  }

  const tools = getToolsByGroup(groupIdToUse);

  return (
    <FilteredToolIndex
      tools={tools}
      title={groupData.name}
      description={groupData.description}
      color={groupData.color}
      icon={groupData.icon}
      categories={groupData.categories}
      highlightedToolId={highlightedToolId}
      initialSearchQuery={initialSearchQuery}
    />
  );
};

export default ToolCategoryPage;
