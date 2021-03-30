import Card from './Card.js'


const ProjectContainer = ({ projects }) => {
    console.log(projects)
    const projectCards = projects.map(project => {
        return (
            <Card
                id={project.id}
                key={project.id}
                name={project.name}
                description={project.description}
                preview={project.preview}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
            />
        )
    })

    return (
        <div className='my-project-container'>
            {projectCards}
        </div>
    )
}



export default ProjectContainer;