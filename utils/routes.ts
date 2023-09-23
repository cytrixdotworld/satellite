import { existsSync } from "$std/fs/exists.ts";
import { Route } from "../types/route.ts";
import logger from "./logger.ts";

let routeList: { path: string; module: Route }[] = [];

export default async function routes(prod?: boolean) {
  if (prod) {
    if (!existsSync("routes.json")) {
      throw Error("routes.json does not exist");
    }
    logger.routes.info("loading routes from routes.json");
    routeList = JSON.parse(Deno.readTextFileSync("routes.json"));
    return routeList;
  }
  logger.routes.info("loading routes from routes directory");
  await loadRoutes();
  await save();
  return routeList;
}

async function loadRoutes(routesDir = "routes") {
  await Promise.all([...Deno.readDirSync(routesDir)].map(async (route) => {
    if (route.isDirectory) {
      await loadRoutes(`${routesDir}/${route.name}`);
    } else {
      await add(`${routesDir}/${route.name}`);
    }
  }));
}

async function save() {
  logger.routes.info("saving routes to routes.json");
  await Deno.writeTextFile("routes.json", JSON.stringify(routeList));
}

async function add(path: string) {
  logger.routes.info(`found route at ${path}`);
  let module: Route;
  try {
    module = (await import(`../${path}`)).default;
    if (!module || !Object.keys(module).length) {
      logger.routes.warn(`route ${path} has no methods, skipping`);
      return;
    }
  } catch (e) {
    logger.routes.error(`failed to load route ${path}: ${e}`);
    return;
  }
  routeList.push({
    path,
    module,
  });
  logger.routes.info(`loaded route ${path}`);
}
