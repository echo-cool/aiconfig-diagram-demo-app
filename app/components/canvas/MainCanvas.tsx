import React, { useState } from "react";
import UncontrolledDiagram from "./diagram/UncontrolledDiagram"; // import your diagram component


interface MainCanvasProps {
  metadata: any;
}

const MainCanvas: React.FC<MainCanvasProps> = ({ metadata }) => {
  

  return (
    <div className="flex-1 items-center justify-center">
      <UncontrolledDiagram metadata={metadata} />
      
    </div>
  );
};

export default MainCanvas;
