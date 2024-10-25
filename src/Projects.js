import Card from "./Card.js";

const ProjectContainer = ({ projects, theme }) => {
  const projectCards = projects.map((project) => {
    return (
      <Card
        className="project-cards"
        id={project.id}
        key={project.id}
        name={project.name}
        description={project.description}
        preview={project.preview}
        githubLink={project.githubLink}
        liveLink={project.liveLink}
        theme={theme}
      />
    );
  });

  return <div className="my-project-container">{projectCards}</div>;
};

export default ProjectContainer;
