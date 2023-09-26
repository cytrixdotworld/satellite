import logger from "../utils/logger.ts";
import routes from "../utils/routes.ts";
import { Route } from "../types/route.ts";

interface ServeOptions {
  prod: boolean;
}

export default async function serve(opts: ServeOptions) {
  const loaded = await routes(opts.prod);

  Deno.serve({
    onListen() {
      logger.serve.info("Listening on http://localhost:8000");
    },
  }, (req) => {
    const path = new URL(req.url).pathname;
    const route = loaded.find((route) => route.path === path.slice(1));

    if (!route) {
      logger.serve.warn(`no route found for ${req.url}`);
      return new Response("Not Found", { status: 404 });
    }

    return route.module[req.method as keyof Route]!(req);
  });
}
