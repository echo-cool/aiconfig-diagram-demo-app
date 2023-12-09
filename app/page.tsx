"use client";
import { useState } from "react";
import UncontrolledDiagram from "./components/canvas/diagram/UncontrolledDiagram"; // import your diagram component
import * as Accordion from "@radix-ui/react-accordion"; // import Radix UI accordion for metadata
import "beautiful-react-diagrams/styles.css";

export default function DiagramWithMetadata() {
  // State for your metadata, you can fetch or calculate this as needed
  const [metadata, setMetadata] = useState({
    // Example metadata
    title: "Diagram Title",
    description: "Description of the Diagram",
    // other metadata fields
  });

  return (
    <div className="flex h-screen">
      {/* Left Side: Diagram */}
      <div className="flex-1">
        <UncontrolledDiagram />
      </div>

      {/* Right Side: Metadata */}
      <div className="w-1/3 p-4 bg-gray-100">
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger className="w-full">Metadata</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              {/* Display metadata here */}
              <div>
                <h3>{metadata.title}</h3>
                <p>{metadata.description}</p>
                {/* Render other metadata fields */}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </div>
  );
}
