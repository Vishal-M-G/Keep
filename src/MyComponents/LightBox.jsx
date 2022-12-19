import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";

const LightBox = (props) => {
  return (
    <>
      <div className="lightPage">
        <div className="containerP">
          <Tooltip title="Close Preview" arrow disableInteractive>
            <button onClick={props.closeMe}>
              <CloseIcon />
            </button>
          </Tooltip>
          <h1>Title : {props.val.title}</h1>
          <h3>
            <pre>{props.val.description}</pre>
          </h3>
        </div>
      </div>
    </>
  );
};

export default LightBox;
