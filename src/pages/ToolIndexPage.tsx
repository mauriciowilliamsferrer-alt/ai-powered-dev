import { useLocation } from "react-router-dom";
import { ToolIndex } from "@/components/ToolIndex";

const ToolIndexPage = () => {
  const location = useLocation();
  const highlightedToolId = location.state?.highlightedToolId;

  return <ToolIndex highlightedToolId={highlightedToolId} />;
};

export default ToolIndexPage;
