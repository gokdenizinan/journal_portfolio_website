import Link from 'next/link';
import { getFeaturedProjects } from '@/lib/projects';

export function ProjectList() {
  const projects = getFeaturedProjects();

  return (
    <div className="projects-list">
      {projects.map((project, index) => (
        <div className="project-item reveal-up" data-published={project.published} key={project.title}>
          <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
          <div className="project-body">
            <div className="project-tags">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
            {project.iconClassName ? (
              <div className="project-title-row">
                <span className={`project-icon ${project.iconClassName}`} aria-hidden="true" />
                <h3 className="project-title">{project.title}</h3>
              </div>
            ) : (
              <h3 className="project-title">{project.title}</h3>
            )}
            <p className="project-desc">{project.description}</p>
          </div>
          <div className="project-links">
            {project.slug ? (
              <Link href={`/${project.slug}.html`} className="project-link">
                Read more →
              </Link>
            ) : null}
            {project.liveUrl ? (
              <Link href={project.liveUrl} className="project-link" target="_blank" rel="noopener">
                Live ↗
              </Link>
            ) : null}
            {project.githubUrl && !project.slug ? (
              <Link href={project.githubUrl} className="project-link" target="_blank" rel="noopener">
                GitHub ↗
              </Link>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
