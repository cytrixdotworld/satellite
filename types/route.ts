type Handler = (req: Request) => Response | Promise<Response>;

type Methods =
  | "CONNECT"
  | "DELETE"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PUT"
  | "TRACE";

type Route = {
  [method in Methods]?: Handler;
};

export type { Route };
