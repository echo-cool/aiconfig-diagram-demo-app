import React from "react";

interface NodeData {
  name: string;
  attributes?: { [key: string]: string };
}

interface MixedNodeElementProps {
  nodeData: NodeData;
  triggerNodeToggle: () => void;
  foreignObjectProps?: React.SVGProps<SVGForeignObjectElement>;
}

const MixedNodeElement: React.FC<MixedNodeElementProps> = ({
  nodeData,
  triggerNodeToggle,
  foreignObjectProps = {},
}) => {
  return (
    <React.Fragment>
      <circle r={20}></circle>

      <foreignObject {...foreignObjectProps}>
        <div style={styles.container}>
          <h1 style={styles.title}>{nodeData.name}</h1>
          <ul style={styles.list}>
            {nodeData.attributes &&
              Object.keys(nodeData.attributes).map((labelKey, i) => (
                <li key={`${labelKey}-${i}`} style={styles.listItem}>
                  {labelKey}: {nodeData.attributes[labelKey]}
                </li>
              ))}
          </ul>
          <textarea style={styles.input} />
          <button style={styles.button}>Run</button>
        </div>
      </foreignObject>
    </React.Fragment>
  );
};

// Styling
const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    border: "2px solid black",
    paddingBottom: "1rem",
    backgroundColor: "rgb(248, 248, 255)", // ghostwhite
  },
  title: {
    margin: "0.5rem 0",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: "0.5rem 0",
  },
  listItem: {
    fontSize: "1rem",
    margin: "0.2rem 0",
  },
  input: {
    width: "80%", // Larger input width
    padding: "0.5rem", // Padding for larger input
    margin: "0.5rem 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "0.5rem 1rem",
    margin: "0.5rem 0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
  },
};

export default MixedNodeElement;
