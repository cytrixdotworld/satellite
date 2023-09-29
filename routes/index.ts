import { Route } from "../types/route.ts";

export default {
  async GET(req) {
    console.log(req);
    const res = await (async () => {
      return new Response("Hello World!");
    })();
    return res;
  },
} satisfies Route;
