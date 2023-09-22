import logger from "pino";

const _logger = logger({});

export default {
  main: _logger.child({ module: "main" }),
  routes: _logger.child({ module: "routes" }),
};
