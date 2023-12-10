"use client";
import Diagram, { useSchema, createSchema } from "beautiful-react-diagrams";
import { useEffect, useMemo, useState } from "react";
import Tree from "react-d3-tree";
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
  // console.log(nodes);
  // console.log(links);
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

  const orgChart = {
    name: "CEO",
    children: [
      {
        name: "Manager",
        attributes: {
          department: "Production",
        },
        children: [
          {
            name: "Foreman",
            attributes: {
              department: "Fabrication",
            },
            children: [
              {
                name: "Worker",
              },
            ],
          },
          {
            name: "Foreman",
            attributes: {
              department: "Assembly",
            },
            children: [
              {
                name: "Worker",
              },
            ],
          },
        ],
      },
    ],
  };

  const tree_data = {
    data: orgChart,
    totalNodeCount: 0,
    orientation: "horizontal",
    dimensions: undefined,
    centeringTransitionDuration: 800,
    translateX: 200,
    translateY: 300,
    collapsible: true,
    shouldCollapseNeighborNodes: false,
    initialDepth: 1,
    depthFactor: undefined,
    zoomable: true,
    draggable: true,
    zoom: 1,
    scaleExtent: { min: 0.1, max: 1 },
    separation: { siblings: 2, nonSiblings: 2 },
    nodeSize: { x: 200, y: 200 },
    enableLegacyTransitions: false,
    transitionDuration: 500,
    styles: {
      nodes: {
        node: {
          circle: {
            fill: "#52e2c5",
          },
          attributes: {
            stroke: "#000",
          },
        },
        leafNode: {
          circle: {
            fill: "transparent",
          },
          attributes: {
            stroke: "#000",
          },
        },
      },
    },
  };

  return (
    <div id="treeWrapper" style={{ width: "100%", height: "100%" }}>
      {/* <div className="demo-container"> */}
      <div className="tree-container">
        <Tree
          hasInteractiveNodes
          data={tree_data.data}
          rootNodeClassName="demo-node"
          branchNodeClassName="demo-node"
          orientation={tree_data.orientation}
          dimensions={tree_data.dimensions}
          centeringTransitionDuration={tree_data.centeringTransitionDuration}
          translate={{
            x: tree_data.translateX,
            y: tree_data.translateY,
          }}
          collapsible={tree_data.collapsible}
          initialDepth={tree_data.initialDepth}
          zoomable={tree_data.zoomable}
          draggable={tree_data.draggable}
          zoom={tree_data.zoom}
          scaleExtent={tree_data.scaleExtent}
          nodeSize={tree_data.nodeSize}
          separation={tree_data.separation}
          enableLegacyTransitions={tree_data.enableLegacyTransitions}
          transitionDuration={tree_data.transitionDuration}
          depthFactor={tree_data.depthFactor}
          styles={tree_data.styles}
          shouldCollapseNeighborNodes={tree_data.shouldCollapseNeighborNodes}
        />
      </div>
    </div>
  );
};

export default UncontrolledDiagram;
