import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import * as GLOBALS from "../src/globals.ts";

const router = new Router();
router
  .get("/users", (context) => {
    context.response.body = "Users";
  })
  .get("/recipes", (context) => {
    context.response.body = "Recipes";
  })
  .post("/addrecipe", (context) => {
    console.log(context.request.body);
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.use(oakCors({
  origin: `${GLOBALS.HOSTNAME}:${GLOBALS.PORT}`,
}));

await app.listen({ hostname: `${GLOBALS.HOSTNAME}`, port: GLOBALS.PORT });
