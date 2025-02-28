import React, { useState } from "react";
import style from "@/styles/List.module.css";

const ProjectForm = ({ onAdd }) => {
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState("New Project");
  const [error, setError] = useState(false);

  const saveProject = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError(true);
    } else {
      setError(false);
      onAdd(name);
      setName("New Project");
      setEditing(false);
    }
  };
  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      {editing ? (
        <div>
          <form onSubmit={saveProject}>
            <label for="projectName">
              <h3 style={{ marginBottom: "6px" }}>New Project Name</h3>
            </label>
            <input
              style={{ marginBottom: "6px" }}
              id="projectName"
              className={style.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <span style={{ color: "#d40000", fontSize: "small" }}>
              {error && "Error: Project name cannot be blank"}{" "}
            </span>
            <button type="submit" className={style.btn}>
              Add Project
            </button>
          </form>
        </div>
      ) : (
        <button className={style.btn} onClick={() => setEditing(true)}>
          + Add Project
        </button>
      )}
    </div>
  );
};

export default ProjectForm;
