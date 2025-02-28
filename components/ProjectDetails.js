import React, { useState } from "react";
import style from "@/styles/List.module.css";

const ProjectDetails = ({ projects, updateName, updateDetails, updateStatus, onDelete }) => {
  const [editName, setEditName] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [nameError, setNameError] = useState(false);

  // finds the selected project and makes it a single item array
  const project = projects.filter((project) => {
    return project.selected;
  });
  // set single item array to a variable
  const selected = project[0];

  // set name and details based on select state
  const [textName, setTextName] = useState(selected ? selected.name : "Project Name");
  const [textDetails, setTextDetails] = useState(selected ? selected.details : "Project Details");

  // ******** Save Functions *******
  // saves name and removes edit mode
  const handleSaveName = () => {
    // Error handling
    // Prevents save without input
    if (textName.trim() == "") {
      setNameError(true);
    } else {
      if (selected) {
        setNameError(false);
        updateName(selected.id, textName);
        setTextName(selected.name);
        setEditName(false);
      }
    }
  };

  // saves details and removes edit mode
  const handleSaveDetails = () => {
    if (selected) {
      updateDetails(selected.id, textDetails);
      setTextDetails(selected.details);
      setEditDetails(false);
    }
  };

  // ******** Edit Functions *******

  // sets edit name mode and updates placeholder text
  const handleEditName = () => {
    if (selected) {
      setTextName(selected.name);
      setEditName(true);
    }
  };
  // sets edit details mode and updates placeholder text
  const handleEditDetails = () => {
    if (selected) {
      setTextDetails(selected.details);
      setEditDetails(true);
    }
  };
  // ***** Delete *****
  const handleDelete = () => {
    if (selected) {
      onDelete(selected.id);
    }
  };

  const red = {
    backgroundColor: "#9e3e2e",
    color: "white",
    fontWeight: 800,
  };

  // returns page based on state
  // if nothing is selected the page will only display the help text
  // if something is selected the page will display relevant details
  // and allow save and edit functionality
  return (
    <div className={style.panel}>
      {!selected ? (
        <h3>Click a project to display details</h3>
      ) : (
        <div className={style.details} key={selected.id}>
          <div className={style.detailsName}>
            {
              // if in editing state, it is an input
              editName ? (
                <div>
                  <h3>Project Name</h3>
                  <input
                    className={style.input}
                    value={textName}
                    onChange={(e) => setTextName(e.target.value)}
                  />
                  <span style={{ color: "#d40000", fontSize: "small" }}>
                    {nameError && "Project Name cannot be blank"}
                  </span>
                </div>
              ) : (
                <div>
                  <h3 className={style.over}>{selected.name}</h3>
                </div>
              )
            }

            <button
              className={style.btn}
              onClick={() => {
                if (editName) {
                  handleSaveName();
                } else {
                  handleEditName();
                }
              }}
            >
              {editName ? "Save" : "Edit"}
            </button>
          </div>
          <div>
            <div className={style.detailsName}>
              <h4>Details</h4>
              <button
                className={style.btn}
                onClick={() => {
                  if (editDetails) {
                    handleSaveDetails();
                  } else {
                    handleEditDetails();
                  }
                }}
              >
                {editDetails ? "Save" : "Edit"}
              </button>
            </div>
            {
              // if in editing state, it is a textarea
              editDetails ? (
                <div>
                  <textarea
                    className={style.input}
                    style={{ height: "100px", overflow: "scroll" }}
                    value={textDetails}
                    onChange={(e) => setTextDetails(e.target.value)}
                  />
                </div>
              ) : (
                <div className={style.over}>
                  <p>{selected.details}</p>
                </div>
              )
            }
          </div>
          <div>
            <h4>Status</h4>
            <div className={style.detailsStatus}>
              <input
                type="checkbox"
                checked={!selected.active}
                onChange={() => updateStatus(selected.id)}
              ></input>
              <p>{selected.active ? "Incomplete" : "Complete"}</p>
            </div>
          </div>
          <button style={red} className={style.btn} onClick={handleDelete}>
            DELETE
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
