// @ts-nocheck
import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  fontSize: 10,
  p: 4,
};
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(nodeData);
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
          <div>
            {/*<Button >Open Step</Button>*/}
            <button style={styles.button} onClick={handleOpen}>Open Step</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {nodeData.name}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Input
                </Typography>
                <textarea style={styles.input} value={nodeData.input}/>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Model Output
                </Typography>
                <textarea style={styles.input}/>
                <div>
                  <button style={styles.button}>Run</button>

                </div>

              </Box>


            </Modal>
          </div>


          {/*<label>Prompt</label>*/}
          {/*<textarea style={styles.input}/>*/}

          {/*<label>Model Output</label>*/}
          {/*<textarea style={styles.input}/>*/}


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
