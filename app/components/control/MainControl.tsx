import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion"; // import Radix UI accordion for metadata
import JSONFileReader from "./JSONFileReader";
interface MainControlProps {
  setMetadata: (data: any) => void;
  metadata: any;
}

const MainControl: React.FC<MainControlProps> = ({ setMetadata, metadata }) => {
  // Function to handle the data received from JSONFileReader
  const handleFileRead = (data: any) => {
    if (data && data.metadata) {
      setMetadata(data); // Update the state with the metadata part of the received data
    } else {
      console.error("No metadata found in the JSON file");
    }
  };
  return (
    <div className="w-1/3 p-4 bg-gray-100">
      <div>
        <JSONFileReader onFileRead={handleFileRead} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Metadata:</h3>

        <Accordion.Root type="single" collapsible>
          {Object.entries(metadata).map(([key, value], index) => (
            <Accordion.Item value={key} key={index}>
              <Accordion.Header>
                <Accordion.Trigger className="w-full p-2 bg-blue-200 rounded-md mb-1">
                  {key}
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="p-2 bg-blue-100 rounded-md mb-2">
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(value, null, 2)}
                </pre>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
};

export default MainControl;
