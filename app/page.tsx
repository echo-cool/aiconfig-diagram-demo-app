"use client";
import { useState } from "react";
import "beautiful-react-diagrams/styles.css";
import ContentContainer from "./components/ContentContainer";

export default function DiagramWithMetadata() {
  // State for your metadata, you can fetch or calculate this as needed
  const [metadata, setMetadata] = useState({
    // Example metadata
    title: "Diagram Title",
    description: "Description of the Diagram",
    // other metadata fields
  });

  return (
    <>
      <ContentContainer />
    </>
  );
}
