import { InnerPageLayout } from "../components/InnerPageLayout";

export function AboutPage() {
  return (
    <InnerPageLayout title="1. About">
      <div className="temp_announcement_container">
        <div className="temp_announcement_img_container">
          <img src="/assets/visuals/logos/thanks_website_asset.PNG" alt="Thanks for all the support!" />
        </div>
        <div className="temp_announcement_text_container">
          <h1 className="quick_announcement_h1">Quick announcement!</h1>
          <p>
            Hey there! Thanks a lot for taking a moment to read this. I just wanted to share some exciting
            news—my first game for the <b>Playdate</b> console, <b>「Kazoku」 (v1.0.0)</b>, was just released!
          </p>
          <p>
            You can get it on{" "}
            <b>
              <a href="https://carcamusa-labs.itch.io/kazoku">itch.io</a>
            </b>
            .
          </p>
          <p>
            It was also sent to review, in order to see if I can have it published on the <b>Playdate Store</b> too!
          </p>
          <p>
            If you&apos;re interested, feel free to check out my{" "}
            <b>
              <a href="https://www.instagram.com/carcamusa_labs/">Instagram page</a>
            </b>
            , where I regularly post updates, progress &amp; news about current and upcoming projects.
          </p>
          <p>
            <b>Thanks so much for your support — stay awesome!</b>
          </p>
        </div>
      </div>

      <h2>[ ABOUT ]</h2>
      <p className="indented_p">
        {" "}
        Hi, I&apos;m Martin Rosa, the one-dude behind <b>Carcamusa_Labs</b>.
      </p>
      <img src="/assets/visuals/other/its_a_me.jpeg" alt="It's a me Martin" id="about_selfie" />

      <p className="indented_p">
        {" "}
        I&apos;m a QA Engineer – both manual and automation, with a deep love for programming and the development of
        all sorts of stuff, seeking to become a full-time Web developer. Whether it&apos;s websites or videogames,
        I&apos;m all in. Oh, and I&apos;m also a (really bad) design enthusiast, and synthetizer-musician-wannabe, just
        to throw that in there.
      </p>
      <p className="indented_p">
        {" "}
        <b>Carcamusa_Labs</b> started as a project, but it quickly became my personal (and hopefully professional
        enough) webpage where I could showcase my work, experiences, insights, CV, artwork, and the priceless lessons
        I&apos;ve learned from awesome people who kindly took the time to teach me. It&apos;s a space where I can share
        what I&apos;ve been working on and what I&apos;ve learned along the way.
      </p>
      <p className="indented_p">
        {" "}
        You&apos;ll find six main sections on this page, each one covering a different area of my journey. Feel free to
        explore:
      </p>
      <ul>
        <li>
          <b>1. About Carcamusa_Labs</b> – Well, where you are now. More about who I am and why I do what I do.
        </li>
        <li>
          <b>2. CV &amp; Contact</b> – A quick look at my professional experience and how to reach me.
        </li>
        <li>
          <b>3. Projects</b> – A showcase of some of the projects I&apos;ve worked on. They may not be perfect, some of
          them unfinished maybe, but I really put effort and love into each line I start.
        </li>
        <li>
          <b>4. Artwork &amp; Other Assets</b> – Because I like to dabble in some designs (badly), and some other stuff.
        </li>
        <li>
          <b>5. Store</b> – [Under construction] - But, at some point I&apos;ll probably be uploading my own games&apos;
          merch or something. Meanwhile though, you&apos;ll find a cool pic if you access this section, I promise.{" "}
        </li>
        <li>
          <b>6. Referrals &amp; Mentors</b> – A place to give credit to the people who&apos;ve helped me grow and who I
          really appreciate, and are sure enough of themselves teaching me, as to recommend my work and skills.
          Top-professionals them all, you can be sure ;)
        </li>
      </ul>

      <h2>SOME BACKGROUND AND MY PERSONAL JOURNEY</h2>
      <p className="indented_p">
        I was born in Uruguay in 1997 and raised in the vibrant city of Montevideo. From a very young age, I was
        captivated by anything that moved – mechanical games, wheels, fans, planes, bikes – you name it. At 3 years
        old, I discovered a Famicom bootleg in my house, and that&apos;s when my passion for videogames and all things
        digital really kicked off.
      </p>
      <p className="indented_p">
        Throughout my childhood and adolescence, I was constantly immersed in videogames across a variety of platforms,
        though I mostly played on emulators since I only had a PC. When I turned 16 and landed my first &quot;formal&quot;
        job at McDonald&apos;s, I started collecting retro consoles I couldn&apos;t have as a child, like the NES,
        SNES, Genesis/Mega Drive, PSOne, PS2, PS3, Saturn, N64, GameCube, Dreamcast, and even handhelds like Gameboy,
        GB Color, GB Advance, and Game &amp; Watch.
      </p>
      <p className="indented_p">
        As a kid, I discovered there were people who made a living testing videogames, and I was immediately fascinated
        by the idea. However, I knew that in Uruguay, where the market was small, it would be difficult to pursue a
        career in that field. Still, it remained a dream in the back of my mind.
      </p>
      <p className="indented_p">
        During high school, I studied Electromechanical Engineering and graduated with a Bachelor&apos;s degree,
        although I never really put that education to use. At 18-19, I started working as a cook, with the intention
        of moving to New Zealand to work in hotels and restaurants as a cook or bartender. But after realizing that it
        wasn&apos;t my path, I decided to take a more serious approach to QA and Game Testing. This led me to change my
        plans and move to Spain to try and build my career as a QA professional.
      </p>
      <p className="indented_p">
        After a while working in various jobs in Spain, while building my resume and gaining experience by testing indie
        games just to see my name in the credits, I landed my first full-time QA role in 2020 with a permanent contract.
      </p>
      <p className="indented_p">
        In November 2024, after four years of working as a Manual and Automation QA, I decided to leave my job to seek
        a new environment. I also wanted to dedicate my free time to strengthening my skills as a web developer and
        independent game developer. Nowadays, I feel more settled and calm, but I continue to be eager to expand my
        horizons and take on any challenging project that comes my way. I&apos;m always looking to develop new skills
        and strengthen my knowledge in both automation testing and web/game development.
      </p>
      <p className="indented_p">
        In addition to my technical work, I sometimes dabble in drawing, and I hope to one day be able to have some time
        also to work on a personal comic project that I&apos;ve had in mind for a while.
      </p>
      <p className="indented_p">
        I love studying languages. I speak <b>Spanish</b> as my native language, am fluent in <b>English</b> and{" "}
        <b>Portuguese</b>, and am currently learning <b>Japanese</b>, <b>Finnish</b> and <b>Polish</b>.
      </p>
      <p className="last_p">
        I enjoy reading, still collect retro consoles and games, and, of course, whenever I can, I make sure to carve out
        some time to play a few rounds on a CRT!
      </p>

      <p className="last_p">
        I have just finished <strong>「Kazoku」 (v1.0.0)</strong>, my very first &apos;serious&apos; game, to be published
        on the{" "}
        <strong>
          <a href="https://play.date">Playdate</a>
        </strong>{" "}
        console. If you&apos;re interested in taking a quick look, please check my:
      </p>
      <p>
        {" "}
        - <b>Instagram</b> page{" "}
        <a href="https://www.instagram.com/carcamusa_labs/">
          <strong>HERE</strong>
        </a>
        , and/or
      </p>
      <p className="last_p">
        {" "}
        - <b>Itch.io</b> page{" "}
        <a href="https://carcamusa-labs.itch.io">
          <strong>HERE</strong>
        </a>
        !
      </p>
      <p className="last_p">
        <b>Thank you very much for reading!</b>
      </p>
    </InnerPageLayout>
  );
}
