import React, { useState } from "react";
import style from "@/styles/List.module.css";

const ProjectDetails = ({ projects, updateName, updateDetails, updateStatus, onDelete }) => {
  const [editName, setEditingName] = useState(false);
  const [editDetails, setEditingDetails] = useState(false);
  const project = projects.filter((project) => {
    return project.selected;
  });
  const selected = project[0];

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
        <div>
          <div>
            <h3>{selected.name}</h3>
            <button style={btnStyle} onClick={() => setEditingName(!editName)}>
              {editName ? "Save" : "Edit"}
            </button>
          </div>
          <div>
            <h4>Details</h4>
            <p>{selected.details}</p>
            <button style={btnStyle} onClick={() => setEditingDetails(!editDetails)}>
              {editDetails ? "Save" : "Edit"}
            </button>
          </div>
          <div>
            <h4>Status</h4>
            <p>{selected.active ? "Incomplete" : "Complete"}</p>
            <input type="checkbox" onClick={updateStatus}></input>
          </div>
          <div>
            <button style={{ ...btnStyle, ...red }} onClick={handleDelete}>
              DELETE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
