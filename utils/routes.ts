import { existsSync } from "$std/fs/exists.ts";
import { type Route } from "../types/route.ts";
import logger from "./logger.ts";

class Routes {
  #routes: { path: string }[] = [];

  constructor(prod?: boolean) {
    if (prod) {
      if (!existsSync("routes.json")) {
        throw Error("routes.json does not exist");
      }
      logger.routes.info("loading routes from routes.json");
      this.#routes = JSON.parse(Deno.readTextFileSync("routes.json"));
      return;
    }
    logger.routes.info("loading routes from routes directory");
    this.loadRoutes().then(() => {
      logger.routes.info("loaded all routes");
      this.save();
    });
  }

  get routes() {
    return this.#routes;
  }

  add(path: string) {
    logger.routes.info(`found route at ${path}`);
    this.#routes.push({
      path,
    });
  }

  async save() {
    logger.routes.info("saving routes to routes.json");
    await Deno.writeTextFile("routes.json", JSON.stringify(this.#routes));
  }

  async loadRoutes(routesDir = "routes") {
    await Promise.all([...Deno.readDirSync(routesDir)].map(async (route) => {
      if (route.isDirectory) {
        await this.loadRoutes(`${routesDir}/${route.name}`);
      } else {
        this.add(`${routesDir}/${route.name}`);
      }
    }));
  }
}

export default Routes;
