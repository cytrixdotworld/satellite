import { Route } from "../types/route.ts";
import logger from "../utils/logger.ts";
import Routes from "../utils/routes.ts";

interface ServeOptions {
  prod: boolean;
}

export default function serve(opts: ServeOptions) {
  const routes = new Routes(opts.prod);

  routes.routes.forEach(async (route) => {
    const module = (await import(`../${route.path}`)).default as Route;
    if (!module || !Object.keys(module).length) {
      logger.routes.warn(`route ${route.path} has no methods`);
      return;
    }
    logger.routes.info(`loaded route ${route.path}`);
  });
}
