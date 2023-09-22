type ReqToRes = (req: Request) => Response;

type Route = {
  GET?: ReqToRes;
  POST?: ReqToRes;
  PUT?: ReqToRes;
  DELETE?: ReqToRes;
};

export type { Route };
