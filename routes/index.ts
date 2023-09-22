import { Route } from "../types/route.ts";

export default {
  GET(req) {
    console.log(req);
    return new Response("Hello World!");
  },
} satisfies Route;
