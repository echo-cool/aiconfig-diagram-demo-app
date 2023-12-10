import React from "react";

// Define the type for text layout
interface TextLayout {
  title: {
    textAnchor: string;
    x?: number;
    y?: number;
  };
  attributes: {
    x?: number;
    y?: number;
  };
  attribute: {
    x: number;
    dy: string;
  };
}

// Define a mapping type for the text layout
interface TextLayoutMapping {
  vertical: TextLayout;
  horizontal: TextLayout;
}

const textLayout: TextLayoutMapping = {
  vertical: {
    title: {
      textAnchor: "start",
      x: 40,
    },
    attributes: {},
    attribute: {
      x: 40,
      dy: "1.2em",
    },
  },
  horizontal: {
    title: {
      textAnchor: "start",
      y: 40,
    },
    attributes: {
      x: 0,
      y: 40,
    },
    attribute: {
      x: 0,
      dy: "1.2em",
    },
  },
};

// Define the types for nodeDatum and props
interface NodeDatum {
  name: string;
  attributes?: { [key: string]: string };
}

interface PureSvgNodeElementProps {
  nodeDatum: NodeDatum;
  orientation: keyof TextLayoutMapping;
  toggleNode: () => void;
  onNodeClick: () => void;
}

const PureSvgNodeElement: React.FC<PureSvgNodeElementProps> = ({
  nodeDatum,
  orientation,
  toggleNode,
  onNodeClick,
}) => {
  return (
    <>
      <circle r={20} onClick={toggleNode}></circle>
      <g className="rd3t-label">
        <text
          className="rd3t-label__title"
          {...textLayout[orientation].title}
          onClick={onNodeClick}
        >
          {nodeDatum.name}
        </text>
        <text
          className="rd3t-label__attributes"
          {...textLayout[orientation].attributes}
        >
          {nodeDatum.attributes &&
            Object.entries(nodeDatum.attributes).map(
              ([labelKey, labelValue], i) => (
                <tspan
                  key={`${labelKey}-${i}`}
                  {...textLayout[orientation].attribute}
                >
                  {labelKey}: {labelValue}
                </tspan>
              )
            )}
        </text>
      </g>
    </>
  );
};

export default PureSvgNodeElement;
