import React, { useState } from "react";
import style from "@/styles/List.module.css";

const ProjectDetails = ({ projects, updateName, updateDetails, updateStatus, onDelete }) => {
  const [editing, setEditing] = useState(false);

  const project = projects.filter((project) => {
    return project.selected;
  });
  const selected = project[0];

  const [textName, setTextName] = useState(selected ? selected.name : "Project Name");
  const [textDetails, setTextDetails] = useState(selected ? selected.details : "Project Details");

  const handleSave = () => {
    if (textName === "") {
      alert("ERROR: Project name cannot be blank");
    } else {
      handleName();
      handleDetails();
    }
  };

  const handleName = () => {
    if (selected) {
      updateName(selected.id, textName);
    }
  };
  const handleDetails = () => {
    if (selected) {
      updateDetails(selected.id, textDetails);
    }
  };
  const handleDelete = () => {
    if (selected) {
      onDelete(selected.id);
    }
  };

  const btnStyle = {
    margin: "5px",
    backgroundColor: "white",
    color: "black",
    padding: "5px 10px",
    border: "1px solid black",
    borderRadius: "5px",
    cursor: "pointer",
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
            <div>
              <h3>Project Name</h3>
              {
                // if in editing state, it is an input
                editing ? (
                  <div>
                    <input value={textName} onChange={(e) => setTextName(e.target.value)} />
                  </div>
                ) : (
                  <div>
                    <h4>{selected.name}</h4>
                  </div>
                )
              }
            </div>
            <button
              style={btnStyle}
              onClick={() => {
                if (editing) {
                  handleSave();
                  setEditing(!editing);
                } else {
                  setEditing(!editing);
                  setTextName(selected.name);
                  setTextDetails(selected.details);
                }
              }}
            >
              {editing ? "Save" : "Edit"}
            </button>
          </div>
          <div>
            <h4>Details</h4>
            {
              // if in editing state, it is an input
              editing ? (
                <div>
                  <input value={textDetails} onChange={(e) => setTextDetails(e.target.value)} />
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
          <button style={{ ...btnStyle, ...red }} onClick={handleDelete}>
            DELETE
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
