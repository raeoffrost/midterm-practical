import React, { useState } from "react";
import style from "@/styles/List.module.css";

const ProjectDetails = ({ projects, updateName, updateDetails, updateStatus, onDelete }) => {
  const [editName, setEditName] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [nameError, setNameError] = useState(false);

  const project = projects.filter((project) => {
    return project.selected;
  });
  const selected = project[0];

  const [textName, setTextName] = useState(selected ? selected.name : "Project Name");
  const [textDetails, setTextDetails] = useState(selected ? selected.details : "Project Details");

  const handleSaveName = () => {
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

  const handleSaveDetails = () => {
    if (selected) {
      updateDetails(selected.id, textDetails);
      setTextDetails(selected.details);
      setEditDetails(false);
    }
  };

  const handleEditName = () => {
    if (selected) {
      setTextName(selected.name);
      setEditName(true);
    }
  };
  const handleEditDetails = () => {
    if (selected) {
      setTextDetails(selected.details);
      setEditDetails(true);
    }
  };

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
                  <span style={{ color: "#9e3e2e", fontSize: "small" }}>
                    {nameError ? "Name field cannot be blank" : ""}
                  </span>
                </div>
              ) : (
                <div>
                  <h3>{selected.name}</h3>
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
                    value={textDetails}
                    onChange={(e) => setTextDetails(e.target.value)}
                  />
                </div>
              ) : (
                <div>
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
