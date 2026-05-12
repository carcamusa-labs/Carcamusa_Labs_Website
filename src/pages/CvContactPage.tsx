import { InnerPageLayout } from "../components/InnerPageLayout";

export function CvContactPage() {
  return (
    <InnerPageLayout title="2. Contact & Media">
      <h2>[ CV &amp; CONTACT ]</h2>
      <h3>CV Download</h3>
      <a
        href="/assets/visuals/downloadables/CV-Martin-Rosa_QA-Engineer_(EN).pdf"
        className="download_a"
        download
      >
        <div className="download_button">CV Download (PDF - 2mb)</div>
      </a>
      <h3>CV Preview</h3>
      <embed
        className="cv"
        src="/assets/visuals/downloadables/CV-Martin-Rosa_QA-Engineer_(EN).pdf"
        width="100%"
        height="700px"
        type="application/pdf"
      />
      <h3>More detailed information</h3>
      <div className="grid_container_outer">
        <div className="grid_container_inner_left">
          <h2>Skills &amp; Stack</h2>
          <h3>
            <b>Programming &amp; Tools</b>
          </h3>
          <ul>
            <li>
              <b>Git</b> - Version control system for tracking code changes
            </li>
            <li>
              <b>GitHub</b> - Cloud-based platform for code hosting and collaboration
            </li>
            <li>
              <b>GitLab</b> - DevOps platform for code repository management
            </li>
            <li>
              <b>HTML</b> - Markup language for structuring web content
            </li>
            <li>
              <b>CSS</b> - Stylesheet language for web design
            </li>
            <li>
              <b>Java</b> - Object-oriented programming language (I&apos;ve been using it with <b>Gradle</b> for QA
              Automation frameworks&apos; development)
            </li>
            <li>
              <b>JavaScript</b> - Programming language for web interactivity
            </li>
            <li>
              <b>TypeScript</b> - Typed superset of JavaScript for scalable development
            </li>
            <li>
              <b>Lua</b> - Lightweight scripting language for game development
            </li>
            <li>
              <b>Godot Scripting (GDS)</b> - Custom language for Godot engine
            </li>
          </ul>

          <h3>
            <b>QA Tools &amp; Methodologies</b>
          </h3>
          <ul>
            <li>
              <b>Appium</b> - Mobile app automation testing tool
            </li>
            <li>
              <b>Cucumber</b> - Tool for behavior-driven development (BDD)
            </li>
            <li>
              <b>WebdriverIO</b> - Automation framework for web testing
            </li>
            <li>
              <b>Gradle</b> - Build automation tool for Java projects
            </li>
            <li>
              <b>Gherkin</b> - Language for writing BDD test cases
            </li>
            <li>
              <b>TestLodge</b> - Test case management tool
            </li>
            <li>
              <b>BrowserStack</b> - Cross-browser testing platform
            </li>
            <li>
              <b>Issue tracking (e.g., Jira, Trello, Github Projects)</b> - Tools for tracking bugs and tasks
            </li>
            <li>
              <b>Test plan creation</b> - Writing structured test strategies
            </li>
            <li>
              <b>Agile methodologies</b> - Framework for iterative project management
            </li>
            <li>
              <b>Regression &amp; unit testing</b> - Techniques to validate code functionality
            </li>
            <li>
              <b>Localisation QA</b> - Testing for language and regional correctness
            </li>
          </ul>

          <h3>
            <b>Game Dev Frameworks, Engines &amp; SDKs</b>
          </h3>
          <ul>
            <li>
              <b>Unity</b> - Game engine for 2D/3D development with C#
            </li>
            <li>
              <b>Godot</b> - Game engine with GDScript support
            </li>
            <li>
              <b>Playdate</b> - Game dev SDK for the Playdate console with Lua and/or C
            </li>
            <li>
              <b>LÖVE2D</b> - Game engine with Lua
            </li>
          </ul>

          <h3>
            <b>Design &amp; Multimedia</b>
          </h3>
          <ul>
            <li>
              <b>Adobe Illustrator</b> - Vector graphic design software
            </li>
            <li>
              <b>Photoshop</b> - Image editing and design software
            </li>
            <li>
              <b>Aseprite</b> - Pixel art tool for sprite creation
            </li>
            <li>
              <b>Krita</b> - Free image editing and design software
            </li>
            <li>
              <b>Blender</b> - 3D modeling and animation tool
            </li>
            <li>
              <b>GIMP</b> - Open-source image manipulation program
            </li>
            <li>
              <b>Prepress preparation</b> - Setup for print production
            </li>
          </ul>

          <h3>
            <b>Data Analytics &amp; Product Tools</b>
          </h3>
          <ul>
            <li>
              <b>Amplitude</b> - Analytics platform for product insights
            </li>
            <li>
              <b>Braze</b> - Customer engagement platform for marketing automation
            </li>
          </ul>

          <h3>
            <b>Project Management</b>
          </h3>
          <ul>
            <li>
              <b>Kanban</b> - Visual workflow management method
            </li>
            <li>
              <b>Trello</b> - Task management and collaboration tool
            </li>
            <li>
              <b>Jira</b> - Issue and project tracking software
            </li>
            <li>
              <b>GitHub Projects</b> - GH integrated project management tool for organizing tasks, tracking progress,
              and collaborating on projects.
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
            <li>2016 - Graphic Design (BIOS Uruguay)</li>
            <li>2017 - QA Engineering (Udemy)</li>
            <li>2018 - Game Design (BIOS Uruguay, Udemy)</li>
            <li>2021 - Game Development in Unity (Unity Learn, Udemy)</li>
            <li>2022 - Automation QA with Appium (Udemy)</li>
            <li>2022 - Full-Stack Web Dev Bootcamp (Codecademy, Udemy)</li>
            <li>2023 - Full-Stack Web Dev Bootcamp (Hack A Boss Spain)</li>
            <li>2024 - Game Development in Godot (Udemy, Self taught)</li>
            <li>2024 - Digital Products &amp; Video Games Marketing (Udemy, Self taught)</li>
            <li>2024 - Game Development in Playdate SDK (Playdate Dev, Self taught)</li>
            <li>2025 - Professional video games&apos; narrative &amp; character design (Udemy)</li>
            <li>2025 - Still learning new stuff!</li>
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
      <div className="grid_container_outer">
        <div className="grid_container_inner_left">
          <p>Phone number - (+34) 652 538 151</p>
          <p>
            email (Professional Contact &amp; Work Related) -{" "}
            <a href="mailto:martin.rosa@carcamusalabs.com">martin.rosa@carcamusalabs.com</a>
          </p>
          <p>
            email (For inquiries or shoutouts to the tribe) - <a href="mailto:nitram@carcamusalabs.com">nitram@carcamusalabs.com</a>
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
