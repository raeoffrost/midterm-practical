import React, { useState } from "react";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";
import ProjectForm from "./ProjectForm";
import style from "@/styles/List.module.css";

const Main = () => {
  // ********* Project List ***********
  // List of projects with details and status tracking
  const [projects, setProjects] = useState([
    { id: 1, name: "Vacuum", details: "Vacuum the office", active: true, selected: false },
    {
      id: 2,
      name: "Buy Snacks",
      details: "Get snacks for reading week",
      active: true,
      selected: false,
    },
    {
      id: 3,
      name: "Do Laundry",
      details: "Fold the clean laundry",
      active: false,
      selected: false,
    },
    {
      id: 4,
      name: "Complete Midterm",
      details: "Finish by Friday",
      active: false,
      selected: false,
    },
  ]);

  // ********* Project Add & Delete ***********

  // Add a new project
  // rerenders the list with new project added
  // initializes all details
  const addProject = (name) => {
    const newProject = {
      // set id by finding the highest id then add 1 (or use 0)
      id: Math.max(...projects.map((project) => project.id), 0) + 1,
      name: name,
      details: "",
      active: true,
      selected: false,
    };
    setProjects([...projects, newProject]);
  };

  // Delete a Project
  // takes the project id and filters array
  // If id matches the input it skips it
  const deleteProject = (projectId) => {
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  // ********* Update Projects ***********

  // Update the project name
  // maps the projects, if the id matches input updates the name
  const nameProject = (projectId, newName) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, name: newName } : project
      )
    );
  };

  // Update the project details
  // maps the projects, if the id matches input updates the details
  const detailsProject = (projectId, newDetails) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, details: newDetails } : project
      )
    );
  };

  // Update the project status
  // maps the projects, if the id matches input swaps the status
  const statusProject = (projectId) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, active: !project.active } : project
      )
    );
  };

  // Update the project select state
  // maps the projects, if the id matches input sets it selected
  // sets all other projects de-selected
  const selectProject = (projectId) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, selected: true } : { ...project, selected: false }
      )
    );
  };

  return (
    <div>
      <div className={style.heading}>
        <h1>Midterm Practical</h1>
        <h2>Project Management Tool</h2>
      </div>
      <div className={style.group}>
        <div>
          <ProjectList projects={projects} onSelect={selectProject} />
        </div>
        <div>
          <ProjectDetails
            projects={projects}
            updateName={nameProject}
            updateDetails={detailsProject}
            updateStatus={statusProject}
            onDelete={deleteProject}
          />
        </div>
      </div>
      <div>
        <ProjectForm
          projects={projects}
          updateName={nameProject}
          updateDetails={detailsProject}
          onAdd={addProject}
        />
      </div>
    </div>
  );
};

export default Main;
