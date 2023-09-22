import minimist from "minimist";
import serve from "./modules/serve.ts";

const args = minimist(Deno.args);

const env = {
  prod: Deno.env.get("DENO_DEPLOYMENT_ID") ? true : false,
};

switch (args._[0]) {
  case "serve": {
    serve({ prod: env.prod });
  }
}
