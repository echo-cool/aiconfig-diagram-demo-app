import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion"; // import Radix UI accordion for metadata

const MainControl = () => {
  const [metadata, setMetadata] = useState({
    // Example metadata
    title: "Diagram Title",
    description: "Description of the Diagram",
    // other metadata fields
  });
  return (
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
  );
};

export default MainControl;
