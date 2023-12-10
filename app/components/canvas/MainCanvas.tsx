import React, { useState } from "react";
import UncontrolledDiagram from "./diagram/UncontrolledDiagram"; // import your diagram component

const MainCanvas = () => {
  return (
    <div className="flex-1">
      <UncontrolledDiagram />
    </div>
  );
};

export default MainCanvas;
