import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { cvActivities, cvProjects } from "@/lib/cv";
import { CvJourney } from "@/components/CvJourney";
import styles from "./cv.module.css";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Computer Science and Economics student. Education, research, and projects by Gökdeniz İnan.",
  alternates: { canonical: "/cv" },
};

const projectLinks: Record<string, { href: string; label: string }> = {
  "HugSelect Django UI": {
    href: "/hugselect-django-ui.html",
    label: "Explore project",
  },
  SmartCalendar: {
    href: "https://github.com/scarlettcsung/scheduler-app",
    label: "View on GitHub",
  },
  CarDatabase: {
    href: "https://github.com/Gorkem345/CarDatabase",
    label: "View on GitHub",
  },
  "Momentum Grids": { href: "/momentum-grids.html", label: "Explore project" },
  "Music Chord Finder": {
    href: "/music-chord-finder.html",
    label: "Explore project",
  },
};

function Plane() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m21 11-7-3V3.5a2 2 0 0 0-4 0V8l-7 3v2l7-1v5l-2 1.5V20l4-1 4 1v-1.5L14 17v-5l7 1z" />
    </svg>
  );
}

export default function CvPage() {
  return (
    <CvJourney>
      <div className={styles.identity}>
        <span className={styles.perforation} aria-hidden="true" />
        <div>
          <span className={styles.name}>{site.name}</span>
          <span>Wageningen, Netherlands</span>
          <span className={styles.identityNote}>
            A WORK IN PROGRESS. ALWAYS.
          </span>
        </div>
      </div>
      <a className={styles.download} href="/cv_gokdeniz.pdf" download>
        Download CV <span aria-hidden="true">↓</span>
      </a>

      <header className={styles.intro}>
        <p className={styles.eyebrow}>CURIOSITY IS THE DEPARTURE POINT.</p>
        <h1>Computer Science &amp; Economics student.</h1>
        <p className={styles.introText}>
          Building things, understanding how they work.
          <br className={styles.desktopBreak} /> Curious about software,
          economics, and the systems we use.
        </p>
        <nav className={styles.contents} aria-label="CV sections">
          <a href="#journey">Journey</a>
          <span>·</span>
          <a href="#projects">Projects</a>
          <span>·</span>
          <a href="#skills">Skills</a>
        </nav>
      </header>

      <section
        id="journey"
        className={styles.journey}
        aria-labelledby="journey-heading"
      >
        <h2 id="journey-heading" className={styles.routeStart}>
          <span>FLIGHT PLAN</span>
          <Plane />
        </h2>
        <div className={styles.timeline} data-cv-timeline>
          <article className={styles.stop}>
            <div className={styles.date}>
              <span>RESEARCH · NL</span>
              <span>2026</span>
              <small>SUMMER</small>
            </div>
            <span
              className={`${styles.stopIcon} ${styles.researchIcon}`}
              aria-hidden="true"
            >
              W
            </span>
            <h3>Wageningen University</h3>
            <p className={styles.role}>Student Researcher</p>
            <p className={styles.description}>
              Worked on HugSelect, an evidence-driven Django decision-support
              tool for selecting Hugging Face foundation models.
            </p>
            <details className={styles.details}>
              <summary>
                Research &amp; contributions <span aria-hidden="true">+</span>
              </summary>
              <ul>
                <li>
                  Worked with the recommendation pipeline, processed model
                  datasets, and Elasticsearch-based search flow.
                </li>
                <li>
                  Implemented and validated user-facing search, filtering,
                  comparison, explanation, and reporting workflows.
                </li>
                <li>
                  Contributed to software, validation, visualisation, and
                  writing for the revised HugSelect release.
                </li>
              </ul>
            </details>
            <Link
              href="/hugselect-django-ui.html"
              className={styles.projectPreview}
            >
              <img src="/hugselect-icon.svg" width="33" height="33" alt="" />
              <span>
                <strong>HugSelect Django UI</strong>
                <span>Making AI model selection explainable.</span>
              </span>
              <span className={styles.externalArrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          </article>

          <article className={styles.stop}>
            <div className={styles.date}>
              <span>EXCHANGE · NL</span>
              <span>2026</span>
              <small>SPRING</small>
            </div>
            <span
              className={`${styles.stopIcon} ${styles.exchangeIcon}`}
              aria-hidden="true"
            >
              ↗
            </span>
            <h3>Wageningen University &amp; Research</h3>
            <p className={styles.role}>Erasmus Exchange Semester</p>
            <p className={styles.description}>
              An exchange semester in Wageningen, Netherlands, completed as part
              of my undergraduate studies at Sabanci University.
            </p>
          </article>

          <article className={styles.stop}>
            <div className={styles.date}>
              <span>EDUCATION · TR</span>
              <span>2023</span>
              <small>— 2028</small>
            </div>
            <span
              className={`${styles.stopIcon} ${styles.educationIcon}`}
              aria-hidden="true"
            >
              S
            </span>
            <div className={styles.titleRow}>
              <h3>Sabanci University</h3>
              <span className={styles.current}>CURRENT</span>
            </div>
            <p className={styles.role}>BSc Computer Science / BSc Economics</p>
            <p className={styles.description}>
              Istanbul, Turkey. Minor in Finance.
              <br />
              September 2023 — June 2028.
            </p>
            <div className={styles.achievements}>
              <span>3.99 / 4.0 GPA</span>
              <span>Half scholarship for academic excellence</span>
            </div>
          </article>

          <article className={styles.stop}>
            <div className={styles.date}>
              <span>EDUCATION · TR</span>
              <span>2018</span>
              <small>— 2022</small>
            </div>
            <span
              className={`${styles.stopIcon} ${styles.schoolIcon}`}
              aria-hidden="true"
            >
              ♪
            </span>
            <h3>Izmir Private Turkish College</h3>
            <p className={styles.role}>High School Diploma · Marmaris Campus</p>
            <p className={styles.description}>
              Mugla, Turkey. September 2018 — June 2022. Played trumpet in the
              school band, performing at school ceremonies and public events.
            </p>
          </article>
        </div>
        <p className={styles.routeEnd}>
          <span />
          EVERY STOP ADDS SOMETHING.
        </p>
      </section>

      <section
        id="projects"
        className={styles.section}
        aria-labelledby="projects-heading"
      >
        <div className={styles.sectionLabel}>
          <span>THINGS I&apos;VE BUILT</span>
          <span>01 / PROJECTS</span>
        </div>
        <h2 id="projects-heading">From an idea to something real.</h2>
        {cvProjects.map((project, index) => (
          <details className={styles.project} key={project.role}>
            <summary>
              <span className={styles.projectNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.projectTitle}>
                <strong>{project.role}</strong>
                <span>{project.company}</span>
              </span>
              <span className={styles.plus} aria-hidden="true">
                +
              </span>
            </summary>
            <div className={styles.projectBody}>
              <p className={styles.period}>{project.period}</p>
              <ul>
                {project.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {projectLinks[project.role] && (
                <Link
                  href={projectLinks[project.role].href}
                  target={
                    projectLinks[project.role].href.startsWith("https:")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    projectLinks[project.role].href.startsWith("https:")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={styles.textLink}
                >
                  {projectLinks[project.role].label} ↗
                </Link>
              )}
            </div>
          </details>
        ))}
      </section>

      <section
        id="skills"
        className={styles.section}
        aria-labelledby="skills-heading"
      >
        <div className={styles.sectionLabel}>
          <span>CARRY-ON ESSENTIALS</span>
          <span>02 / SKILLS</span>
        </div>
        <h2 id="skills-heading">What I bring along.</h2>
        <div className={styles.skillGroup}>
          <h3>Programming</h3>
          <div className={styles.tags}>
            {["Python", "C++", "Java", "SQL", "R", "Swift"].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
        <div className={styles.skillGroup}>
          <h3>Frameworks &amp; tools</h3>
          <div className={styles.tags}>
            {[
              "SwiftUI",
              "Git",
              "VS Code",
              "RStudio",
              "MySQL",
              "ArcGIS Pro",
              "Rhino3D",
              "Grasshopper",
              "3D Printing",
            ].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
        <div className={styles.skillGroup}>
          <h3>Languages</h3>
          <p>
            Turkish <span>Native</span> · English <span>C1</span> · German{" "}
            <span>A2</span>
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="learning-heading">
        <div className={styles.sectionLabel}>
          <span>STILL EXPLORING</span>
          <span>03 / LEARNING</span>
        </div>
        <h2 id="learning-heading">A little further, every day.</h2>
        <div className={styles.certificate}>
          <span aria-hidden="true">↗</span>
          <div>
            <h3>CS50&apos;s Introduction to Programming with Python</h3>
            <p>Harvard University</p>
          </div>
        </div>
        <div className={styles.certificate}>
          <span aria-hidden="true">↗</span>
          <div>
            <h3>Financial Markets</h3>
            <p>Yale University · Coursera</p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="activities-heading">
        <div className={styles.sectionLabel}>
          <span>BEYOND THE SCREEN</span>
          <span>04 / ACTIVITIES</span>
        </div>
        <h2 id="activities-heading">The other parts of the journey.</h2>
        {cvActivities.map((activity) => (
          <details className={styles.project} key={activity.role}>
            <summary>
              <span className={styles.projectTitle}>
                <strong>{activity.role}</strong>
                <span>{activity.company}</span>
              </span>
              <span className={styles.plus} aria-hidden="true">
                +
              </span>
            </summary>
            <div className={styles.projectBody}>
              <p className={styles.period}>{activity.period}</p>
              <ul>
                {activity.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </details>
        ))}
        <div className={styles.interests}>
          <h3>Off the clock</h3>
          <p>
            App Development · User Interface Design · Financial Markets · Music
            · Latin Dance
          </p>
        </div>
      </section>

      <section className={styles.contact} aria-labelledby="contact-heading">
        <Plane />
        <p className={styles.eyebrow}>THE NEXT DESTINATION</p>
        <h2 id="contact-heading">Let&apos;s see where this goes.</h2>
        <p>A project, a conversation, or a simple hello.</p>
        <a href={`mailto:${site.email}`}>
          {site.email} <span aria-hidden="true">↗</span>
        </a>
      </section>
    </CvJourney>
  );
}
