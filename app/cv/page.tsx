import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { revealDelay } from '@/lib/styles';

export const metadata: Metadata = {
  title: 'CV',
  description: 'Curriculum Vitae for Gökdeniz İnan.',
  alternates: {
    canonical: '/cv',
  },
};

export default function CvPage() {
  return (
    <main>
      <header className="page-header">
        <div className="container">
          <span className="section-label reveal-up" style={revealDelay('0ms')}>
            Curriculum Vitae
          </span>
          <h1 className="page-title reveal-up" style={revealDelay('80ms')}>
            Gökdeniz İnan
          </h1>
          <p className="page-sub reveal-up" style={revealDelay('160ms')}>
            Developer · Writer · Wageningen — <a href={`mailto:${site.email}`}>Mail</a>
          </p>
          <a href="/cv_gokdeniz.pdf" className="btn-primary reveal-up" style={revealDelay('240ms')} download>
            Download PDF ↓
          </a>
        </div>
      </header>

      <div className="cv-body">
        <div className="container container-narrow">
          <section className="cv-section">
            <h2 className="cv-section-title">Experience</h2>
            <div className="cv-item reveal-up">
              <div className="cv-item-header">
                <div>
                  <h3 className="cv-role">Student Researcher</h3>
                  <span className="cv-company">Wageningen University — HugSelect Django UI</span>
                </div>
                <span className="cv-period">Summer 2026</span>
              </div>
              <p className="cv-desc">
                Working on a Django-based user interface for HugSelect, a research system for recommending Hugging Face
                foundation models.
              </p>
              <ul className="cv-list">
                <li>Understanding the existing recommendation pipeline, processed model datasets, and Elasticsearch-based search flow.</li>
                <li>Designing a user-facing interface for searching, filtering, comparing, and explaining AI model recommendations.</li>
                <li>Working with Python, Django, Elasticsearch, Hugging Face, HTML, CSS, JavaScript, and Git.</li>
              </ul>
            </div>
          </section>

          <section className="cv-section">
            <h2 className="cv-section-title">Education</h2>
            <div className="cv-item reveal-up">
              <div className="cv-item-header">
                <div>
                  <h3 className="cv-role">Sabanci University</h3>
                  <span className="cv-company">BSc Computer Science / BSc Economics — Istanbul, Turkey</span>
                </div>
                <span className="cv-period">Sept 2023 — Jun 2028</span>
              </div>
              <p className="cv-desc">Minor in Finance.</p>
              <ul className="cv-list">
                <li>GPA: 3.99/4.0</li>
                <li>Half scholarship awarded for academic excellence.</li>
              </ul>
            </div>

            <div className="cv-item reveal-up">
              <div className="cv-item-header">
                <div>
                  <h3 className="cv-role">Wageningen University &amp; Research</h3>
                  <span className="cv-company">Erasmus Exchange Semester — Wageningen, Netherlands</span>
                </div>
                <span className="cv-period">Spring 2026</span>
              </div>
              <p className="cv-desc">Exchange semester completed as part of undergraduate studies at Sabanci University.</p>
            </div>

            <div className="cv-item reveal-up">
              <div className="cv-item-header">
                <div>
                  <h3 className="cv-role">Izmir Private Turkish College High School, Marmaris Campus</h3>
                  <span className="cv-company">High School Diploma — Mugla, Turkey</span>
                </div>
                <span className="cv-period">Sept 2018 — Jun 2022</span>
              </div>
              <ul className="cv-list">
                <li>School Band, Trumpet: performed in multiple school ceremonies and public events.</li>
              </ul>
            </div>
          </section>

          <section className="cv-section">
            <h2 className="cv-section-title">Projects</h2>
            {[
              {
                role: 'Personalized 3D-Printed Shoe Insoles',
                company: 'Sabanci University — Rhino3D, Grasshopper, LIDAR, 3D Printing',
                period: 'Spring 2025',
                items: [
                  'Designed personalized shoe insoles using LIDAR-based foot scanning and parametric modeling.',
                  'Developed 3D models in Rhino3D and Grasshopper, optimizing pressure distribution with lattice structures.',
                  'Improved comfort and biomechanical support compared to traditional insoles.',
                ],
              },
              {
                role: 'SmartCalendar',
                company: 'Wageningen University — Java, GUI Development',
                period: '2026 — Ongoing',
                items: [
                  'Built a multi-user scheduling system that identifies optimal meeting times from shared calendar data.',
                  'Implemented event management features including invitations, notifications, and dynamic updates.',
                  'Designed authentication, role-based access, and calendar integration for admin and user workflows.',
                ],
              },
              {
                role: 'CarDatabase',
                company: 'Database Application — PHP, Python, HTML, SQL',
                period: '2026',
                items: [
                  'Built a car database application for managing vehicle records with CRUD operations.',
                  'Added search and filtering workflows to make car data easier to browse and maintain.',
                  'Worked with database-backed views and backend scripts for data management workflows.',
                ],
              },
              {
                role: 'Momentum Grids',
                company: 'Web Application — Habit Tracking, Accounts',
                period: '2026 — Beta',
                items: [
                  'Built a quiet, year-at-a-glance habit tracking web app with user accounts and a heatmap-style interface for reviewing consistency over time.',
                  'Focused the product around simple automation and a quiet, reliable user experience.',
                  'Deployed the beta version publicly on Vercel for testing and iteration.',
                ],
              },
              {
                role: 'Music Chord Finder',
                company: 'Python CLI — Music Theory, Input Parsing, Pattern Matching',
                period: '2026 — v1 complete, v2 in progress',
                items: [
                  'Built a command-line app that identifies basic major, minor, diminished, and augmented chords from user-entered notes.',
                  'Implemented note normalization, input validation, interval calculation, and inversion recognition.',
                  'Completed Version 1 and started a Version 2 roadmap focused on clearer CLI instructions, repeated input flow, help/exit commands, and improved result formatting.',
                ],
              },
            ].map((item) => (
              <div className="cv-item reveal-up" key={item.role}>
                <div className="cv-item-header">
                  <div>
                    <h3 className="cv-role">{item.role}</h3>
                    <span className="cv-company">{item.company}</span>
                  </div>
                  <span className="cv-period">{item.period}</span>
                </div>
                <ul className="cv-list">
                  {item.items.map((listItem) => (
                    <li key={listItem}>{listItem}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="cv-section">
            <h2 className="cv-section-title">Skills</h2>
            <div className="skills-grid">
              <div className="skill-group reveal-up">
                <h4>Programming</h4>
                <p>Python, C++, Java, SQL, R, Swift</p>
              </div>
              <div className="skill-group reveal-up">
                <h4>Frameworks & Tools</h4>
                <p>SwiftUI, Git, VS Code, RStudio, MySQL, ArcGIS Pro, Rhino3D, Grasshopper, 3D Printing</p>
              </div>
              <div className="skill-group reveal-up">
                <h4>Languages (spoken)</h4>
                <p>Turkish (native), English (C1), German (A2)</p>
              </div>
            </div>
          </section>

          <section className="cv-section">
            <h2 className="cv-section-title">Certifications</h2>
            <ul className="cv-list cv-list-standalone">
              <li>CS50&apos;s Introduction to Programming with Python — Harvard University</li>
              <li>Financial Markets — Yale University (Coursera)</li>
            </ul>
          </section>

          <section className="cv-section">
            <h2 className="cv-section-title">Activities</h2>
            {[
              {
                role: 'Sabanci Seahawks Ultimate Frisbee Team Player',
                company: 'Sabanci University — Istanbul, Turkey',
                period: 'Sept 2024 — May 2025',
                items: [
                  "Competed and trained as part of the university's Ultimate Frisbee team.",
                  'Developed teamwork, strategic thinking, and physical endurance through regular practices.',
                ],
              },
              {
                role: 'Student Volunteer',
                company: 'Sabanci University Civic Involvement Projects — Istanbul, Turkey',
                period: 'Feb 2024 — Jun 2024',
                items: [
                  'Delivered educational activities to primary school students on global and daily life topics.',
                  'Designed engaging learning experiences through interactive activities and small projects.',
                ],
              },
              {
                role: 'Group Leader',
                company: 'UniMates',
                period: 'Oct 2025 — Jan 2026',
                items: [
                  "Led a student initiative supporting incoming students' adaptation to university life.",
                  'Organized social events and managed communication channels to build an inclusive community.',
                ],
              },
            ].map((item) => (
              <div className="cv-item reveal-up" key={item.role}>
                <div className="cv-item-header">
                  <div>
                    <h3 className="cv-role">{item.role}</h3>
                    <span className="cv-company">{item.company}</span>
                  </div>
                  <span className="cv-period">{item.period}</span>
                </div>
                <ul className="cv-list">
                  {item.items.map((listItem) => (
                    <li key={listItem}>{listItem}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="cv-section">
            <h2 className="cv-section-title">Interests</h2>
            <div className="cv-tags">
              <span>App Development</span>
              <span>User Interface Design</span>
              <span>Financial Markets</span>
              <span>Music</span>
              <span>Latin Dance</span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
