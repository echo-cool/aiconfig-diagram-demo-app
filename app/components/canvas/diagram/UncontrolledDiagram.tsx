"use client";
import Diagram, { useSchema, createSchema } from "beautiful-react-diagrams";
import { useEffect, useMemo, useState } from "react";
import { parse } from "@/static/algo";

interface UncontrolledDiagramProps {
  metadata: any;
}
const initialSchema = createSchema({
  nodes: [
    { id: "node-1", content: "Node 1", coordinates: [250, 60] },
    { id: "node-2", content: "Node 2", coordinates: [100, 200] },
    { id: "node-3", content: "Node 3", coordinates: [250, 220] },
    { id: "node-4", content: "Node 4", coordinates: [400, 200] },
  ],
  links: [
    { input: "node-1", output: "node-2", label: "Link 1", readonly: true },
    { input: "node-1", output: "node-3", label: "Link 2", readonly: true },
    {
      input: "node-1",
      output: "node-4",
      label: "Link 3",
      readonly: true,
      className: "my-custom-link-class",
    },
  ],
});

interface JSONData {
  prompts: Array<{
    name: string;
    metadata: {
      model: {
        name: string;
        settings: {
          temperature: number;
          system_prompt: string;
        };
      };
    };
  }>;
}

interface Node {
  id: string;
  content: string;
  coordinates: [number, number];
}

interface Link {
  input: string;
  output: string;
  label: string;
  readonly: boolean;
  className?: string;
}

const transformDataToSchema = (jsonData: JSONData) => {
  const nodes: Node[] = jsonData.prompts.map((prompt, index) => ({
    id: `node-${index + 1}`,
    content: prompt.name,
    coordinates: [100 * (index + 1), 100 * (index + 1)], // Example coordinates logic
  }));

  const links: Link[] = nodes
    .map((node, index) => ({
      input: node.id,
      output: index < nodes.length - 1 ? `node-${index + 2}` : `node-1`, // Link to the next node or loop back to the first
      label: `Link ${index + 1}`,
      readonly: true,
    }))
    .slice(0, -1); // Remove last link to prevent a loop back if not needed

  return createSchema({
    nodes,
    links,
  });
};

const UncontrolledDiagram: React.FC<UncontrolledDiagramProps> = ({
  metadata,
}) => {
  const [key, setKey] = useState(0);

  const schema = useMemo(() => transformDataToSchema(metadata), [metadata]);

  useEffect(() => {
    // Update key to force re-render when metadata changes
    setKey((prev) => prev + 1);
  }, [metadata]); // Dependency array includes metadata

  return (
    <div style={{ height: "100%", width: "100%" }} key={key}>
      <Diagram schema={schema} />
    </div>
  );
};

export default UncontrolledDiagram;
