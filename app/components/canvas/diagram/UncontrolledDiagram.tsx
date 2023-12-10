"use client";
import Diagram, { useSchema, createSchema } from "beautiful-react-diagrams";
import { useEffect, useMemo, useState } from "react";

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
    input: string;
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

function parse(jsonData: JSONData) {
  let prompts = jsonData.prompts;
  const nodes: Node[] = jsonData.prompts.map((prompt, index) => ({
    id: prompt.name,
    content: prompt.name,
    coordinates: [100 * (index + 1), 100 * (index + 1)],
  }));

  const links: Link[] = [];

  for (let i = 0; i < prompts.length; i++) {
    let prompt = prompts[i];
    let regex = /\{\{(.+?)\.output\}\}/;
    let input = prompt.input.match(regex)?.[1] || "";
    let output = prompt.name;

    if (
      nodes.some((node) => node.content === input) &&
      nodes.some((node) => node.content === output)
    ) {
      links.push({
        input: input,
        output: output,
        label: `Link ${i + 1}`,
        readonly: true,
        className: "my-custom-link-class",
      });
    }
  }
  console.log(nodes);
  console.log(links);
  return createSchema({
    nodes,
    links,
  });
}

const UncontrolledDiagram: React.FC<UncontrolledDiagramProps> = ({
  metadata,
}) => {
  const [key, setKey] = useState(0);
  // console.log(parse(metadata));
  // console.log(transformDataToSchema(metadata));
  const schema = useMemo(() => parse(metadata), [metadata]);

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
