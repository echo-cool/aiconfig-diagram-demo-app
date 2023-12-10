import React, { useState, ChangeEvent } from "react";

interface JSONFileReaderProps {
  onFileRead: (data: any) => void;
}

const JSONFileReader: React.FC<JSONFileReaderProps> = ({ onFileRead }) => {
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      return;
    }

    setSelectedFileName(file.name); // Set the selected file name for display

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result;
      try {
        if (typeof result === "string") {
          const json = JSON.parse(result);
          onFileRead(json);
        }
      } catch (err) {
        console.error("Error reading file:", err);
        alert("Error reading file. Please ensure the file is a valid JSON.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Upload JSON File
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
      {selectedFileName && (
        <>
          <h3 className="text-lg font-semibold mb-2">
            Filename:
            <span className="mt-2 text-sm text-gray-600">
              {selectedFileName}
            </span>
          </h3>
        </>
      )}
    </div>
  );
};

export default JSONFileReader;
