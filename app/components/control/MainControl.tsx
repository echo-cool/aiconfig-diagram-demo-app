// @ts-nocheck
import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion"; // import Radix UI accordion for metadata
import JSONFileReader from "./JSONFileReader";
interface MainControlProps {
  setMetadata: (data: any) => void;
  metadata: any;
  setdisplayPrompt: (data: any) => void;
}
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { log } from "console";
import {TextField} from "@mui/material";

const MainControl: React.FC<MainControlProps> = ({
  setMetadata,
  metadata,
  setdisplayPrompt,
}) => {
  // Function to handle the data received from JSONFileReader
  const handleFileRead = (data: any) => {
    if (data && data.metadata) {
      setMetadata(data); // Update the state with the metadata part of the received data
    } else {
      console.error("No metadata found in the JSON file");
    }
  };

  return (
    <div className="w-1/3 p-4 bg-gray-100 justify-items-center items-center">
      <div className="flex">
        <JSONFileReader onFileRead={handleFileRead} />
      </div>
      <div>
        {Object.entries(metadata.metadata.models).map(([key, value], index) => (
            <div key={key} className='mt-2 mb-2'>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <TextField   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setMetadata(
                        {
                            ...metadata,
                            metadata: {
                                ...metadata.metadata,
                                models: {
                                    ...metadata.metadata.models,
                                    [key]: {
                                        ...metadata.metadata.models[key],
                                        api_key: event.target.value
                                    }
                                }
                            }
                        }
                    )
                }} id="filled-basic" label={'API KEY '+metadata.metadata.models[key].model} variant="filled" />
            </div>
        ))}
      </div>
      <div>
        {" "}
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                onChange={(data) => {
                  if (data.target.checked) {
                    setdisplayPrompt(true);
                  } else {
                    setdisplayPrompt(false);
                  }
                }}
              />
            }
            label="Show Prompt"
          />
        </FormGroup>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Metadata:</h3>

        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Version</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  {metadata.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {metadata.schema_version}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <h3 className="text-lg font-semibold mt-3 mb-2">Models:</h3>
        {Object.entries(metadata.metadata.models).map(([key, value], index) => (
          <TableContainer key={key} component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Model</TableCell>
                  <TableCell>top_p</TableCell>
                  <TableCell>presence_penalty</TableCell>
                  <TableCell>frequency_penalty</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {metadata.metadata.models[key].model}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {metadata.metadata.models[key].top_p}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {metadata.metadata.models[key].presence_penalty}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {metadata.metadata.models[key].frequency_penalty}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ))}

        <h3 className="text-lg font-semibold mt-3 mb-2">Steps:</h3>
        {Object.entries(metadata.prompts).map(([key, value], index) => (
          <div key={key} className="mb-2">
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>name</TableCell>
                    <TableCell>input</TableCell>
                    <TableCell>model</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {value.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {value.input}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {value.metadata.model.name}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}

        {/* {Object.entries(metadata).map(([key, value], index) => (
          <Accordion.Root type="single" collapsible>
            <Accordion.Item value={key} key={index}>
              <Accordion.Header>
                <Accordion.Trigger className="w-full p-2 bg-blue-200 rounded-md mb-1">
                  {key}
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="p-2 bg-blue-100 rounded-md mb-2">
                <DisplayJson data={value} />
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        ))} */}
      </div>
    </div>
  );
};

export default MainControl;
