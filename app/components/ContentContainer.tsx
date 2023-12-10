import React from "react";
import MainCanvas from "./canvas/MainCanvas";
import MainControl from "./control/MainControl";

const ContentContainer = () => {
  return (
    <div className="flex h-screen">
      <MainCanvas />
      <MainControl />
    </div>
  );
};

export default ContentContainer;
