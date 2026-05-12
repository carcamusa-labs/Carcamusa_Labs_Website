import { InnerPageLayout } from "../components/InnerPageLayout";

export function CvContactPage() {
  return (
    <InnerPageLayout title="2. Contact & Media">
      <h2>[ CV &amp; CONTACT ]</h2>
      <h3>CV Download</h3>
      <div className="cv-download-wrap">
        <a
          href="/assets/visuals/downloadables/CV-Martin-Rosa_QA-Engineer_(EN).pdf"
          className="download_a"
          download
        >
          <div className="download_button">CV Download (PDF - 2mb)</div>
        </a>
      </div>
      <h3 className="cv-preview-heading">CV Preview</h3>
      <embed
        className="cv"
        src="/assets/visuals/downloadables/CV-Martin-Rosa_QA-Engineer_(EN).pdf"
        width="100%"
        height="700px"
        type="application/pdf"
      />
      <h3>More detailed information</h3>
      <div className="grid_container_outer cv-skills-outer">
        <div className="grid_container_inner_left">
          <h2>Skills &amp; Stack</h2>
          <h3>
            <b>Programming &amp; Tools</b>
          </h3>
          <ul className="cv-skills-ul">
            <li>
              <b>Git</b>
              <span className="cv-skill-desc"> - Version control system for tracking code changes</span>
            </li>
            <li>
              <b>GitHub</b>
              <span className="cv-skill-desc"> - Cloud-based platform for code hosting and collaboration</span>
            </li>
            <li>
              <b>GitLab</b>
              <span className="cv-skill-desc"> - DevOps platform for code repository management</span>
            </li>
            <li>
              <b>HTML</b>
              <span className="cv-skill-desc"> - Markup language for structuring web content</span>
            </li>
            <li>
              <b>CSS</b>
              <span className="cv-skill-desc"> - Stylesheet language for web design</span>
            </li>
            <li>
              <b>Java</b>
              <span className="cv-skill-desc">
                {" "}
                - Object-oriented programming language (I&apos;ve been using it with <b>Gradle</b> for QA
                Automation frameworks&apos; development)
              </span>
            </li>
            <li>
              <b>JavaScript</b>
              <span className="cv-skill-desc"> - Programming language for web interactivity</span>
            </li>
            <li>
              <b>TypeScript</b>
              <span className="cv-skill-desc"> - Typed superset of JavaScript for scalable development</span>
            </li>
            <li>
              <b>Lua</b>
              <span className="cv-skill-desc"> - Lightweight scripting language for game development</span>
            </li>
            <li>
              <b>Godot Scripting (GDS)</b>
              <span className="cv-skill-desc"> - Custom language for Godot engine</span>
            </li>
          </ul>

          <h3>
            <b>QA Tools &amp; Methodologies</b>
          </h3>
          <ul className="cv-skills-ul">
            <li>
              <b>Appium</b>
              <span className="cv-skill-desc"> - Mobile app automation testing tool</span>
            </li>
            <li>
              <b>Cucumber</b>
              <span className="cv-skill-desc"> - Tool for behavior-driven development (BDD)</span>
            </li>
            <li>
              <b>WebdriverIO</b>
              <span className="cv-skill-desc"> - Automation framework for web testing</span>
            </li>
            <li>
              <b>Gradle</b>
              <span className="cv-skill-desc"> - Build automation tool for Java projects</span>
            </li>
            <li>
              <b>Gherkin</b>
              <span className="cv-skill-desc"> - Language for writing BDD test cases</span>
            </li>
            <li>
              <b>TestLodge</b>
              <span className="cv-skill-desc"> - Test case management tool</span>
            </li>
            <li>
              <b>BrowserStack</b>
              <span className="cv-skill-desc"> - Cross-browser testing platform</span>
            </li>
            <li>
              <b>Issue tracking (e.g., Jira, Trello, Github Projects)</b>
              <span className="cv-skill-desc"> - Tools for tracking bugs and tasks</span>
            </li>
            <li>
              <b>Test plan creation</b>
              <span className="cv-skill-desc"> - Writing structured test strategies</span>
            </li>
            <li>
              <b>Agile methodologies</b>
              <span className="cv-skill-desc"> - Framework for iterative project management</span>
            </li>
            <li>
              <b>Regression &amp; unit testing</b>
              <span className="cv-skill-desc"> - Techniques to validate code functionality</span>
            </li>
            <li>
              <b>Localisation QA</b>
              <span className="cv-skill-desc"> - Testing for language and regional correctness</span>
            </li>
          </ul>

          <h3>
            <b>Game Dev Frameworks, Engines &amp; SDKs</b>
          </h3>
          <ul className="cv-skills-ul">
            <li>
              <b>Unity</b>
              <span className="cv-skill-desc"> - Game engine for 2D/3D development with C#</span>
            </li>
            <li>
              <b>Godot</b>
              <span className="cv-skill-desc"> - Game engine with GDScript support</span>
            </li>
            <li>
              <b>Playdate</b>
              <span className="cv-skill-desc"> - Game dev SDK for the Playdate console with Lua and/or C</span>
            </li>
            <li>
              <b>LÖVE2D</b>
              <span className="cv-skill-desc"> - Game engine with Lua</span>
            </li>
          </ul>

          <h3>
            <b>Design &amp; Multimedia</b>
          </h3>
          <ul className="cv-skills-ul">
            <li>
              <b>Adobe Illustrator</b>
              <span className="cv-skill-desc"> - Vector graphic design software</span>
            </li>
            <li>
              <b>Photoshop</b>
              <span className="cv-skill-desc"> - Image editing and design software</span>
            </li>
            <li>
              <b>Aseprite</b>
              <span className="cv-skill-desc"> - Pixel art tool for sprite creation</span>
            </li>
            <li>
              <b>Krita</b>
              <span className="cv-skill-desc"> - Free image editing and design software</span>
            </li>
            <li>
              <b>Blender</b>
              <span className="cv-skill-desc"> - 3D modeling and animation tool</span>
            </li>
            <li>
              <b>GIMP</b>
              <span className="cv-skill-desc"> - Open-source image manipulation program</span>
            </li>
            <li>
              <b>Prepress preparation</b>
              <span className="cv-skill-desc"> - Setup for print production</span>
            </li>
          </ul>

          <h3>
            <b>Data Analytics &amp; Product Tools</b>
          </h3>
          <ul className="cv-skills-ul">
            <li>
              <b>Amplitude</b>
              <span className="cv-skill-desc"> - Analytics platform for product insights</span>
            </li>
            <li>
              <b>Braze</b>
              <span className="cv-skill-desc"> - Customer engagement platform for marketing automation</span>
            </li>
          </ul>

          <h3>
            <b>Project Management</b>
          </h3>
          <ul className="cv-skills-ul">
            <li>
              <b>Kanban</b>
              <span className="cv-skill-desc"> - Visual workflow management method</span>
            </li>
            <li>
              <b>Trello</b>
              <span className="cv-skill-desc"> - Task management and collaboration tool</span>
            </li>
            <li>
              <b>Jira</b>
              <span className="cv-skill-desc"> - Issue and project tracking software</span>
            </li>
            <li>
              <b>GitHub Projects</b>
              <span className="cv-skill-desc">
                {" "}
                - GH integrated project management tool for organizing tasks, tracking progress, and collaborating on
                projects.
              </span>
            </li>
          </ul>
        </div>

        <div className="grid_container_inner_right">
          <h2>My profile</h2>
          <p>
            Dedicated QA Engineer with a strong focus on delivering clear, concrete, and concise results. Passionate
            about leveraging new technologies to enhance testing processes and continuously expanding my tech stack.
            Driven by a love for video games and a commitment to ensuring exceptional quality in every project.
          </p>
          <h2>Education</h2>
          <p>2015, Bachelor in Electromechanics, UTU Arroyo Seco, Uruguay.</p>
          <h2>Training &amp; Courses</h2>
          <ul>
            <li>2025 - Still learning new stuff!</li>
            <li>2025 - Professional video games&apos; narrative &amp; character design (Udemy)</li>
            <li>2024 - Game Development in Playdate SDK (Playdate Dev, Self taught)</li>
            <li>2024 - Digital Products &amp; Video Games Marketing (Udemy, Self taught)</li>
            <li>2024 - Game Development in Godot (Udemy, Self taught)</li>
            <li>2023 - Full-Stack Web Dev Bootcamp (Hack A Boss Spain)</li>
            <li>2022 - Full-Stack Web Dev Bootcamp (Codecademy, Udemy)</li>
            <li>2022 - Automation QA with Appium (Udemy)</li>
            <li>2021 - Game Development in Unity (Unity Learn, Udemy)</li>
            <li>2018 - Game Design (BIOS Uruguay, Udemy)</li>
            <li>2017 - QA Engineering (Udemy)</li>
            <li>2016 - Graphic Design (BIOS Uruguay)</li>
          </ul>
          <h2>Languages</h2>
          <ul>
            <li>
              <b>Spanish</b>: Native
            </li>
            <li>
              <b>English</b>: Advanced (Bilingual proficiency)
            </li>
            <li>
              <b>Portuguese</b>: Intermediate (Conversational proficiency)
            </li>
            <li>
              <b>Japanese</b>: Pre-intermediate (Basic conversational)
            </li>
          </ul>
        </div>
      </div>

      <h3>Contact &amp; Media</h3>
      <div className="grid_container_outer cv-contact-outer">
        <div className="grid_container_inner_left">
          <p>Phone number - (+34) 652 538 151</p>
          <p>
            email (Professional Contact &amp; Work Related) -{" "}
            <a href="mailto:martin.rosa@carcamusalabs.com">martin.rosa@carcamusalabs.com</a>
          </p>
          <p>
            email (For inquiries or shoutouts to the tribe) -{" "}
            <a href="mailto:nitram@carcamusalabs.com">nitram@carcamusalabs.com</a>
          </p>
          <p>Toledo, Spain (All Spain &amp; EU work permits in order)</p>
        </div>
        <div className="grid_container_inner_right">
          <h3>
            <b>You can also find me on...</b>
          </h3>
          <p>
            LinkedIn - <a href="https://www.linkedin.com/in/martin-rosa/">in/martin-rosa/</a>
          </p>
          <p>
            Instagram (for projects&apos; updates) -{" "}
            <a href="https://www.instagram.com/carcamusa_labs/">@carcamusa_labs</a>
          </p>
          <p>
            Itch.io - <a href="https://carcamusa-labs.itch.io">carcamusa-labs.itch.io</a>
          </p>
        </div>
      </div>
    </InnerPageLayout>
  );
}
