import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";

const Item = (props) => {
  let match = props.val.title.toString().toLowerCase();
  let searchEle = props.searchEle.toString().toLowerCase();
  let flag = true,
    j = 0;
  for (let i of searchEle) {
    if (match[j] === i) j++;
    else {
      flag = false;
      break;
    }
  }
  return flag ? (
    <>
      <div className="container">
        <h1>
          <span style={{ backgroundColor: "yellow" }}>
            {props.val.title.slice(0, j)}
          </span>
          {props.val.title.slice(j, props.val.title.length)}
        </h1>
        <p>{props.val.description}</p>
        <div className="itemBtnsContainer">
          <Tooltip title="Preview" arrow disableInteractive>
            <button className="itemBtn btnVisible" onClick={()=>props.onPreview(props.id)}>
              <VisibilityIcon />
            </button>
          </Tooltip>
          <Tooltip title="Edit" arrow disableInteractive>
            <button
              className="itemBtn btnEdit"
              onClick={() => props.onEdit(props.id)}
            >
              <EditIcon />
            </button>
          </Tooltip>
          <Tooltip title="Delete" arrow disableInteractive>
            <button
              className="itemBtn btnDelete"
              onClick={() => props.onDelete(props.id)}
            >
              <DeleteIcon />
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Item;
