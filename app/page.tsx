"use client";
import { useState } from "react";
import "beautiful-react-diagrams/styles.css";
import ContentContainer from "./components/ContentContainer";
import Tree from "react-d3-tree";

export default function DiagramWithMetadata() {
  // State for your metadata, you can fetch or calculate this as needed
  const [metadata, setMetadata] = useState({
    // Example metadata
    title: "Diagram Title",
    description: "Description of the Diagram",
    // other metadata fields
  });

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
    <>
      <ContentContainer />
    </>
  );
}
