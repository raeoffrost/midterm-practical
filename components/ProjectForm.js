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
    <div>
      {editing ? (
        <div>
          <form noValidate>
            <label>Project Name</label>
            <input
              className={style.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <span style={{ color: "#d40000", fontSize: "small" }}>
              {error && "Error: Project name cannot be blank"}{" "}
            </span>
          </form>
          <button type="submit" className={style.btn} onClick={(e) => saveProject(e)}>
            Add Project
          </button>
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
