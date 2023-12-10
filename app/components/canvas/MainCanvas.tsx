import React, { useState } from "react";
// import UncontrolledDiagram from "./diagram/UncontrolledDiagram"; // import your diagram component
import dynamic from "next/dynamic";
const UncontrolledDiagram = dynamic(
  () => import("./diagram/UncontrolledDiagram"),
  {
    ssr: false,
  }
);

interface MainCanvasProps {
  metadata: any;
  displayPrompt: any;
}

const MainCanvas: React.FC<MainCanvasProps> = ({ metadata, displayPrompt }) => {
  return (
    <div className="flex-1 items-center justify-center">
      <UncontrolledDiagram metadata={metadata} displayPrompt={displayPrompt} />
    </div>
  );
};

export default MainCanvas;
