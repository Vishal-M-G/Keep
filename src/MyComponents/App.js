import React, { useState, useEffect } from "react";
import Item from "./Item";
import LightBox from "./LightBox";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const EmptyLightBox = () => {
  return <div className="lightPage"></div>;
};

const App = () => {
  let [search, setSearch] = useState("");
  let [title, setTitle] = useState("");
  let [desc, setDesc] = useState("");
  let [opener, invertOpener] = useState(false);
  let [arrayOfNotes, setArr] = useState([]);
  let [lightPageStatus, invertStatus] = useState(false);
  let [currentId, setId] = useState(-1);
  let [editActive, invertEditActive] = useState(false);

  useEffect(() => {
    if (opener === false) document.getElementById("ta").readOnly = true;
    else document.getElementById("ta").readOnly = false;
    let ele = document.getElementById("inputBox");
    if (editActive === true) {
      ele.style.transform = "scale(0.9)";
      ele.style.zIndex = 2;
    } else {
      ele.style.transform = "none";
      ele.style.zIndex = 0;
    }
  });

  const adder = () => {
    if (desc.trim().length === 0) {
      alert("Description cannot be blank");
      return;
    }
    if (title.trim().length === 0)
      setArr((prev) => {
        return [...prev, { title: "Untitled", description: desc.trim() }];
      });
    else
      setArr((prev) => {
        return [
          ...prev,
          {
            title: title.trim().charAt(0).toUpperCase() + title.trim().slice(1),
            description: desc.trim(),
          },
        ];
      });
    setTitle("");
    setDesc("");
  };

  const editor = () => {
    if (desc.trim().length === 0) {
      alert("Description cannot be blank");
      return;
    }
    if (title.trim().length === 0) {
      arrayOfNotes[currentId].title = "Untitled";
      arrayOfNotes[currentId].description = desc.trim();
    } else {
      arrayOfNotes[currentId].title = title.trim();
      arrayOfNotes[currentId].description = desc.trim();
    }
    setTitle("");
    setDesc("");
    invertEditActive(false);
  };

  return (
    <>
      {editActive ? <EmptyLightBox /> : null}
      {currentId > -1 && lightPageStatus && (
        <LightBox
          closeMe={() => invertStatus(false)}
          val={arrayOfNotes[currentId]}
        />
      )}
      <div className="header">
        <div>
          <EmojiObjectsIcon id="keepLogo" />
        </div>
        <h1>Keep</h1>
        <div className="searchBar">
          <Tooltip title="Enter the title to search" arrow disableInteractive>
            <input
              type="type"
              placeholder="Search Bar"
              value={search}
              onChange={(ele) => setSearch(ele.target.value)}
            />
          </Tooltip>
          <button onClick={() => setSearch("")}>
            {search.trim().length > 0 ? (
              <CloseIcon id="searchBarIcon" />
            ) : (
              <SearchIcon id="searchBarIcon" />
            )}
          </button>
        </div>
      </div>
      <div className="mainBody">
        <div className="inputBox" id="inputBox">
          {opener && (
            <input
              type="text"
              value={title}
              placeholder="Title"
              onChange={(ele) => {
                setTitle(ele.target.value);
              }}
            />
          )}
          <div className="innerInput">
            <Tooltip
              title={
                opener
                  ? "Double Click to close the adder"
                  : "Single Click to open the adder"
              }
              arrow
              disableInteractive
            >
              <textarea
                id="ta"
                placeholder="Click to add a note"
                value={desc}
                onChange={(ele) => {
                  setDesc(ele.target.value);
                }}
                onClick={() => invertOpener(true)}
                onDoubleClick={() => {
                  setTitle("");
                  setDesc("");
                  invertOpener(false);
                }}
              ></textarea>
            </Tooltip>
            {opener &&
              (editActive ? (
                <Tooltip title="Confirm Edit" arrow disableInteractive>
                  <button id="plusBtn" onClick={editor}>
                    <EditIcon id="plusIcon" />
                  </button>
                </Tooltip>
              ) : (
                <Tooltip title="Add" arrow disableInteractive>
                  <button id="plusBtn" onClick={adder}>
                    <AddIcon id="plusIcon" />
                  </button>
                </Tooltip>
              ))}
          </div>
        </div>
        <div className="listOfNotes">
          {arrayOfNotes.map((ele, ind) => {
            return (
              <Item
                key={ind}
                id={ind}
                val={ele}
                searchEle={search}
                onPreview={(id) => {
                  invertStatus(true);
                  setId(id);
                }}
                onEdit={(id) => {
                  invertOpener(true);
                  invertEditActive(true);
                  setId(id);
                  setTitle(arrayOfNotes[id].title);
                  setDesc(arrayOfNotes[id].description);
                }}
                onDelete={(id) => {
                  setArr(() => {
                    return arrayOfNotes.filter((ele, ind) => {
                      return id !== ind;
                    });
                  });
                }}
              />
            );
          })}
        </div>
        <p style={{ position: "absolute", right: 0, top: 0 }}>
          &copy;Copyright 2022, All Rights Reserved |{" "}
          <a
            href="https://github.com/Vishal-M-G"
            target="_blank"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Vishal M G
          </a>
        </p>
      </div>
    </>
  );
};

export default App;
