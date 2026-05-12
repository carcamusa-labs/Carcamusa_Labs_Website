import { InnerPageLayout } from "../components/InnerPageLayout";

export function ProjectsPage() {
  return (
    <InnerPageLayout title="3. Projects">
      <h2>[ PROJECTS ]</h2>
      <h3>List of projects I&apos;ve been working on</h3>
      <div className="projects_grid_container_outer">
        <div className="grid_container_inner_left">
          <div className="grid_container_imageslot">
            <img src="/assets/visuals/projects_images/projects_kazoku.PNG" alt="" />
          </div>
          <div className="grid_container_textswrap">
            <div className="grid_container_bigtext">
              <h3 className="projects_project_title">
                <b>
                  <a href="https://carcamusa-labs.itch.io/kazoku">「Kazoku」</a>
                </b>
              </h3>
              <h4 className="projects_project_platform">Playdate Console</h4>
              <h5 className="projects_project_stack">Lua · Playdate SDK</h5>
            </div>
            <div className="grid_container_smalltext">
              <p>
                Fast paced Arena Boss Fighter Game for the (1bit) Playdate Console, made with the Playdate SDK,
                entirely in Lua. With this project I intend to showcase knowledge and skills to develop games in
                non-visual engines from scratch, as well as artwork and animations.
              </p>
              <p>2025</p>
            </div>
          </div>
        </div>

        <div className="grid_container_inner_right">
          <div className="grid_container_imageslot">
            <img src="/assets/visuals/projects_images/projects_drumpad.PNG" alt="" />
          </div>
          <div className="grid_container_textswrap">
            <div className="grid_container_bigtext">
              <h3 className="projects_project_title">
                <b>
                  <a href="https://github.com/carcamusa-labs/WEB_HTML-CSS-JavaScript_Drumkit">Drumpad</a>
                </b>
              </h3>
              <h4 className="projects_project_platform">Web</h4>
              <h5 className="projects_project_stack">HTML · CSS · JavaScript</h5>
            </div>
            <div className="grid_container_smalltext">
              <p>
                Web Drumpad machine with sounds, 2023 Hack A Boss Spain bootcamp project. Showcases usage of
                Vanilla HTML, CSS and JS to develop a functional webpage.
              </p>
              <p>Use either the mouse or keyboard to play some sounds on the pad.</p>
              <p>2023</p>
            </div>
          </div>
        </div>

        <div className="grid_container_inner_left">
          <div className="grid_container_imageslot">
            <img src="/assets/visuals/projects_images/projects_shashin.png" alt="" />
          </div>
          <div className="grid_container_textswrap">
            <div className="grid_container_bigtext">
              <h3 className="projects_project_title">
                <b>
                  <a href="https://github.com/carcamusa-labs/WEB_Saisho_Shashin">最初写真 (Saisho Shashin)</a>
                </b>
              </h3>
              <h4 className="projects_project_platform">Web</h4>
              <h5 className="projects_project_stack">HTML · CSS</h5>
            </div>
            <div className="grid_container_smalltext">
              <p>
                Simple web page design in Japanese using Vanilla HTML and CSS. JavaScript was not used in this
                project, as no complex logic was needed. Assets and images were edited using Photoshop and
                Illustrator.
              </p>
              <p>2023</p>
            </div>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
}
