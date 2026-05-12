import { useCallback, useEffect, useState } from "react";
import { InnerPageLayout } from "../components/InnerPageLayout";
import { assetUrl } from "../utils/assetUrl";
import { useIsMobile768 } from "../hooks/useMediaQuery";

interface ArtworkItem {
  src: string;
  used_in: string;
  stack: string;
}

interface ToolItem {
  imgSrc: string;
  name: string;
  description?: string;
}

export function ArtworkAssetsPage() {
  const [images, setImages] = useState<ArtworkItem[]>([]);
  const [tools, setTools] = useState<ToolItem[]>([]);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const isMobile = useIsMobile768();

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

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox || !isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, isMobile, closeLightbox]);

  return (
    <InnerPageLayout title="4. Artwork & Assets">
      <h2>[ ARTWORKS &amp; ASSETS ]</h2>
      <h3>List of artworks and assets I create, sometimes to use in my projects, sometimes just for fun.</h3>
      <div className="artworks_assets_grid_container">
        {images.map((image) => {
          const src = assetUrl(image.src);
          return (
            <div key={image.src} className="artworks_assets_grid_card">
              <div
                className={`artworks_assets_card_imageslot${isMobile ? " artworks_assets_card_imageslot--tap" : ""}`}
                role={isMobile ? "button" : undefined}
                tabIndex={isMobile ? 0 : undefined}
                onClick={
                  isMobile
                    ? () => setLightbox({ src, alt: image.used_in })
                    : undefined
                }
                onKeyDown={
                  isMobile
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setLightbox({ src, alt: image.used_in });
                        }
                      }
                    : undefined
                }
              >
                <img src={src} alt={image.used_in} />
              </div>
              <div className="artworks_assets_card_text">
                <h3 className="artworks_assets_used_in">{image.used_in}</h3>
                <h5 className="artworks_assets_stack">{image.stack}</h5>
              </div>
            </div>
          );
        })}
      </div>

      {isMobile && lightbox ? (
        <div
          className="art-lightbox-backdrop"
          role="presentation"
          onClick={closeLightbox}
        >
          <div
            className="art-lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="art-lightbox-close" onClick={closeLightbox} aria-label="Close preview">
              ×
            </button>
            <img className="art-lightbox-img" src={lightbox.src} alt={lightbox.alt} />
          </div>
        </div>
      ) : null}

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
                  {tool.description ? <p className="tools_description">{tool.description}</p> : null}
                </div>
              </>
            ) : (
              <>
                <div className="tools_text_wrapper">
                  <h3 className="tools_name">{tool.name}</h3>
                  {tool.description ? <p className="tools_description">{tool.description}</p> : null}
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
