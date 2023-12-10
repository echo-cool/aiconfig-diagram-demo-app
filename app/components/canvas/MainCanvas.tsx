import React, { useState } from "react";
import UncontrolledDiagram from "./diagram/UncontrolledDiagram"; // import your diagram component
import Tree from "react-d3-tree";

interface MainCanvasProps {
  metadata: any;
}

const MainCanvas: React.FC<MainCanvasProps> = ({ metadata }) => {
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
    <div className="flex-1 items-center justify-center">
      {/* <UncontrolledDiagram metadata={metadata} /> */}
      <div id="treeWrapper" style={{ width: "100%", height: "100%" }}>
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

export default MainCanvas;
