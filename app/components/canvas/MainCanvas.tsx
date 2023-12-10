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

  return (
    <div className="flex-1 items-center justify-center">
      {/* <UncontrolledDiagram metadata={metadata} /> */}
      <div id="treeWrapper" style={{ width: "100%", height: "100%" }}>
        <Tree data={orgChart} />
      </div>
    </div>
  );
};

export default MainCanvas;
