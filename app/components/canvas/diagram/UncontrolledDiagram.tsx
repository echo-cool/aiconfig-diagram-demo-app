// @ts-nocheck
"use client";
import Diagram, { useSchema, createSchema } from "beautiful-react-diagrams";
import { useEffect, useMemo, useState } from "react";
import Tree from "react-d3-tree";
import MixedNodeElement from "../MixedNodeElement";
import PureSvgNodeElement from "../PureSvgNodeElement";
interface UncontrolledDiagramProps {
  metadata: any;
  displayPrompt: any;
}

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
interface Prompt {
  name: string;
  input: string;
  metadata: {
    model: {
      name: string;
    };
  };
}

interface Node {
  id: string;
  content: string;
  coordinates: number[];
}

interface Link {
  input: string;
  output: string;
  label: string;
  readonly: boolean;
  className: string;
}

interface Data {
  nodes: Node[];
  links: Link[];
}

const parse = (json_data: any): Data => {
  const prompts: Prompt[] = json_data.prompts;
  const nodes: Node[] = prompts.map((prompt, i) => ({
    id: `node-${i + 1}`,
    content: prompt.name,
    coordinates: [100 * (i + 1), 100 * (i + 1)],
    model: prompt.metadata.model.name,
    input: prompt.input,
    children: [],
  }));

  const links: Link[] = [];
  prompts.forEach((prompt, i) => {
    // const match = prompt.input.match(/\{\{([\-a-zA-Z\_0-9]+?)\.output\}\}/);
    const regex = /\{\{([a-zA-Z_0-9]+?)\.output\}\}/g;
    let match;
    const matches: string[] = [];

    while ((match = regex.exec(prompt.input)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `match` variable.
      matches.push(match[1]);
    }
    matches.forEach((inputName) => {
      // Now 'inputName' contains the matched strings, similar to 'j' in your Python code
      // console.log(inputName); // Do something with each 'inputName'

      const inputIndex = prompts.findIndex((p) => p.name === inputName);
      if (inputIndex !== -1) {
        links.push({
          input: `node-${inputIndex + 1}`,
          output: `node-${i + 1}`,
          label: `Link ${i + 1}`,
          readonly: true,
          className: "my-custom-link-class",
        });
      }
    });

    // if (match) {

    // }
  });

  return { nodes, links };
};

const findRootNodes = (data: Data): Node[] => {
  const childSet = new Set(data.links.map((link) => link.output));
  return data.nodes.filter((node) => !childSet.has(node.id));
};

const transformData = (data: Data) => {
  const nodeMap: { [key: string]: any } = {};

  data.nodes.forEach((node) => {
    nodeMap[node.id] = { ...node, children: [] };
  });

  data.links.forEach((link) => {
    if (nodeMap[link.input] && nodeMap[link.output]) {
      nodeMap[link.input].children.push(nodeMap[link.output]);
    }
  });

  let rootNodes = findRootNodes(data);
  rootNodes = rootNodes.map((node) => nodeMap[node.id]);
  // console.log(rootNodes);
  const dummyRoot = [
    {
      id: "dummy",
      content: "Start",
      attributes: { model: "Input", input: "Input" },
      children: rootNodes,
    },
  ];

  const transformNode = (node: any) => {
    return {
      name: node.content,
      attributes: {
        model: node.model ? node.model : "None",
        input: node.input ? node.input : "",
        // other attributes can be added here
      },
      children: node.children.map(transformNode),
    };
  };

  return dummyRoot.map(transformNode);
};

const UncontrolledDiagram: React.FC<UncontrolledDiagramProps> = ({
  metadata,
  displayPrompt,
}) => {
  // const [key, setKey] = useState(0);
  // // console.log(parse(metadata));
  // // console.log(transformDataToSchema(metadata));

  // const schema = useMemo(() => transformData(parse(metadata)), [metadata]);

  // useEffect(() => {
  //   // Update key to force re-render when metadata changes
  //   setKey((prev) => prev + 1);
  // }, [metadata]); // Dependency array includes metadata
  const part = parse(metadata);
  const step2 = transformData(part);
  // console.log(step2);
  const tree_data = {
    data: step2,
    totalNodeCount: 0,
    orientation: "horizontal",
    dimensions: undefined,
    centeringTransitionDuration: 800,
    translateX: 100,
    translateY: 500,
    collapsible: true,
    shouldCollapseNeighborNodes: false,
    initialDepth: 10,
    depthFactor: 300,
    zoomable: true,
    draggable: true,
    zoom: 0.5,
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

  const customNodeFnMapping = {
    svg: {
      description: "Default - Pure SVG node & label (IE11 compatible)",
      fn: (rd3tProps, appState) => (
        <PureSvgNodeElement
          nodeDatum={rd3tProps.nodeDatum}
          toggleNode={rd3tProps.toggleNode}
          orientation={appState.orientation}
        />
      ),
    },
    input: {
      description: "MixedNodeElement - Interactive nodes with inputs",
      fn: ({ nodeDatum, toggleNode }, appState) => (
        <MixedNodeElement
          nodeData={nodeDatum}
          triggerNodeToggle={toggleNode}
          foreignObjectProps={{
            width: appState.nodeSize.x,
            height: appState.nodeSize.y + 100,
            x: -50,
            y: 50,
          }}
        />
      ),
    },
  };

  return (
    <div id="treeWrapper" style={{ width: "100%", height: "100%" }}>
      {/* <div className="demo-container"> */}
      <div className="tree-container">
        <Tree
          hasInteractiveNodes
          data={tree_data.data}
          renderCustomNodeElement={(rd3tProps) =>
            displayPrompt
              ? customNodeFnMapping["input"].fn(rd3tProps, tree_data)
              : customNodeFnMapping["svg"].fn(rd3tProps, tree_data)
          }
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
