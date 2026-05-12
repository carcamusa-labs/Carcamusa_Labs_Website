import { cpSync, copyFileSync, existsSync, createReadStream, statSync } from "node:fs";
import { join, normalize } from "node:path";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vite";

function copyStaticAndSpaFallback(): Plugin {
  return {
    name: "copy-static-spa-fallback",
    apply: "build",
    closeBundle() {
      const root = process.cwd();
      const dist = join(root, "dist");
      const assetsSrc = join(root, "assets");
      if (existsSync(assetsSrc)) {
        cpSync(assetsSrc, join(dist, "assets"), { recursive: true });
      }
      const cname = join(root, "CNAME");
      if (existsSync(cname)) {
        copyFileSync(cname, join(dist, "CNAME"));
      }
      const www = join(root, "www");
      if (existsSync(www)) {
        cpSync(www, join(dist, "www"), { recursive: true });
      }
      const indexHtml = join(dist, "index.html");
      if (existsSync(indexHtml)) {
        copyFileSync(indexHtml, join(dist, "404.html"));
      }
    },
  };
}

function serveAssetsFromRoot(): Plugin {
  const rootAssets = normalize(join(process.cwd(), "assets"));
  return {
    name: "serve-assets-from-repo-root",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? "").split("?")[0];
        if (!url?.startsWith("/assets/")) {
          next();
          return;
        }
        const filePath = normalize(join(process.cwd(), url.slice(1)));
        const assetsPrefix =
          process.platform === "win32"
            ? rootAssets.toLowerCase()
            : rootAssets;
        const fpCheck =
          process.platform === "win32" ? filePath.toLowerCase() : filePath;
        if (!fpCheck.startsWith(assetsPrefix)) {
          next();
          return;
        }
        if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
          next();
          return;
        }
        if (url.endsWith(".css")) res.setHeader("Content-Type", "text/css");
        else if (url.endsWith(".js")) res.setHeader("Content-Type", "application/javascript");
        else if (url.endsWith(".json")) res.setHeader("Content-Type", "application/json");
        else if (url.endsWith(".svg")) res.setHeader("Content-Type", "image/svg+xml");
        else if (url.endsWith(".png")) res.setHeader("Content-Type", "image/png");
        else if (url.endsWith(".jpg") || url.endsWith(".jpeg")) res.setHeader("Content-Type", "image/jpeg");
        else if (url.endsWith(".webp")) res.setHeader("Content-Type", "image/webp");
        else if (url.endsWith(".pdf")) res.setHeader("Content-Type", "application/pdf");
        else if (url.endsWith(".ico")) res.setHeader("Content-Type", "image/x-icon");
        createReadStream(filePath)
          .on("error", () => next())
          .pipe(res);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), serveAssetsFromRoot(), copyStaticAndSpaFallback()],
  base: "/",
});
