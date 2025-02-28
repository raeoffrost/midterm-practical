import React, { useState } from "react";
import style from "@/styles/List.module.css";

const ProjectList = ({ projects, onSelect }) => {
  const [active, setActive] = useState(null);

  // Filter the list
  // if the active state is null just print the list
  // else print whatever projects match
  // the active state of the filter
  const filterProjects = projects.filter((project) => {
    if (active === null) return true;
    return project.active === active;
  });

  const btnStyle = {
    margin: "5px",
    backgroundColor: "white",
    color: "black",
    padding: "5px 10px",
    border: "1px solid black",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div className={style.panel}>
      <div>
        <button onClick={() => setActive(null)} style={btnStyle}>
          All
        </button>
        <button onClick={() => setActive(true)} style={btnStyle}>
          Incomplete
        </button>
        <button onClick={() => setActive(false)} style={btnStyle}>
          Completed
        </button>
      </div>
      <div>
        <ul className={style.list}>
          {filterProjects.length === 0 ? (
            <p>No projects yet!</p>
          ) : (
            filterProjects.map((project) => (
              <li
                key={project.id}
                onClick={() => onSelect(project.id)}
                className={style.project}
                style={{
                  backgroundColor: project.selected ? "#3d383f" : "#ad7fa8",
                  border: project.selected ? "1px solid white" : "1px solid grey",
                  opacity: project.active ? 1 : 0.6,
                  textDecoration: project.active ? "none" : "line-through",
                }}
              >
                {project.name}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProjectList;
