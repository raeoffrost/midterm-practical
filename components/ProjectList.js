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
  const activeBtn = {
    border: "2px solid #7a6ac0",
    outline: "1px solid #7a6ac0",
  };
  const inactiveBtn = {
    border: "2px solid white",
  };
  return (
    <div className={style.panel}>
      <div>
        <button
          style={active === null ? activeBtn : inactiveBtn}
          onClick={() => setActive(null)}
          className={style.btn}
        >
          All
        </button>
        <button
          style={active === true ? activeBtn : inactiveBtn}
          onClick={() => setActive(true)}
          className={style.btn}
        >
          Incomplete
        </button>
        <button
          style={active === false ? activeBtn : inactiveBtn}
          onClick={() => setActive(false)}
          className={style.btn}
        >
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
