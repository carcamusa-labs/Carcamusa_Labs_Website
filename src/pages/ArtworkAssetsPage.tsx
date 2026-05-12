import { useEffect, useState } from "react";
import { InnerPageLayout } from "../components/InnerPageLayout";
import { assetUrl } from "../utils/assetUrl";

interface ArtworkItem {
  src: string;
  used_in: string;
  stack: string;
}

interface ToolItem {
  imgSrc: string;
  name: string;
  description: string;
}

export function ArtworkAssetsPage() {
  const [images, setImages] = useState<ArtworkItem[]>([]);
  const [tools, setTools] = useState<ToolItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [imagesResponse, toolsResponse] = await Promise.all([
          fetch(assetUrl("assets/json/artworks_assets_list.json")),
          fetch(assetUrl("assets/json/artworks_assets_tools_list.json")),
        ]);
        const imgs = (await imagesResponse.json()) as ArtworkItem[];
        const tls = (await toolsResponse.json()) as ToolItem[];
        if (!cancelled) {
          setImages(imgs);
          setTools(tls);
        }
      } catch (e) {
        console.error("Error loading data:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <InnerPageLayout title="4. Artwork & Assets">
      <h2>[ ARTWORKS &amp; ASSETS ]</h2>
      <h3>List of artworks and assets I create, sometimes to use in my projects, sometimes just for fun.</h3>
      <div className="artworks_assets_grid_container">
        {images.map((image) => (
          <div key={image.src} className="artworks_assets_grid_card">
            <div className="artworks_assets_card_imageslot">
              <img src={assetUrl(image.src)} alt={image.used_in} />
            </div>
            <div className="artworks_assets_card_text">
              <h3 className="artworks_assets_used_in">{image.used_in}</h3>
              <h5 className="artworks_assets_stack">{image.stack}</h5>
            </div>
          </div>
        ))}
      </div>

      <h2>[ TOOLS &amp; OTHER THINGS I USE ]</h2>
      <h3>Some tools and other things I use to make my work more efficient, fun, and useful.</h3>

      <div className="tools_container">
        {tools.map((tool, index) => (
          <div key={tool.imgSrc + tool.name} className="tool_card">
            {index % 2 === 0 ? (
              <>
                <div className="tool_card_imageslot">
                  <img src={assetUrl(tool.imgSrc)} alt={tool.name} />
                </div>
                <div className="tools_text_wrapper">
                  <h3 className="tools_name">{tool.name}</h3>
                  <p className="tools_description">{tool.description}</p>
                </div>
              </>
            ) : (
              <>
                <div className="tools_text_wrapper">
                  <h3 className="tools_name">{tool.name}</h3>
                  <p className="tools_description">{tool.description}</p>
                </div>
                <div className="tool_card_imageslot">
                  <img src={assetUrl(tool.imgSrc)} alt={tool.name} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </InnerPageLayout>
  );
}
