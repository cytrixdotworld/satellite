import * as esbuild from "esbuild";
import logger from "../utils/logger.ts";

const start = performance.now();
try {
  await esbuild.build({
    //outdir: "dist",
  });
} catch {
  const end = performance.now();
  logger.build.error(`☄️ Build failed in ${end - start}ms.`);
}

const end = performance.now();
logger.build.info(`🛰️ Build finished in ${end - start}ms.`);
