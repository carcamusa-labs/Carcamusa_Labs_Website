import { InnerPageLayout } from "../components/InnerPageLayout";

export function StorePage() {
  return (
    <InnerPageLayout title="5. Unplugged">
      <h2>[ STORE ]</h2>
      <h3>[ UNDER CONSTRUCTION ]</h3>
      <h3>Hi, and welcome to Carcamusa_Labs&apos; Store section.</h3>
      <p>Still under construction here, but at some point I&apos;ll be uploading my own games&apos; merch or something.</p>
      <p>
        Meanwhile though, here&apos;s a picture of me &amp; <b>John Romero</b>, the legend behind <b>Doom</b>, and
        other titles like <b>Wolfenstein 3D</b> and <b>Quake</b>. No Photoshop!
        <br />
      </p>
      <div className="store_romero_wrap">
        <img
          className="store_romero_photo"
          src="/assets/visuals/other/romero&me.jpeg"
          alt="Martin Rosa with John Romero"
        />
      </div>
    </InnerPageLayout>
  );
}
