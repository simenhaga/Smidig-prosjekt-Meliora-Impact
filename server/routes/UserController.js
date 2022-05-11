import { Router } from "express";
import { UserService } from "../service/UserService.js";

export function UserController(database) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const { googleToken } = req.signedCookies;
    try {
      const signedInUser = await UserService.find({ googleToken });
      res.statusCode = 200;
      res.json({ signedInUser });
    } catch (e) {
      res.json(e);
    }
  });

  router.get("/all", async (req, res) => {
    try {
      const all = await UserService.find();
      res.statusCode = 200;
      res.json({ all });
    } catch (e) {
      res.json(e);
    }
  });

  router.post("/createFromGoogle", async (req, res) => {
    //TODO: Its fake, because needs to authenticate with google/cookie
    const { name, email, googleToken } = req.body;
    let result;
    try {
      if (
        await UserService.exists(
          { googleToken } || (await UserService.exists({ email }))
        )
      ) {
        res.statusCode = 400;
        result = {
          err: "user already exists. please log in with another google account.",
        };
      } else if (!googleToken || !email) {
        res.statusCode = 400;
        result = {
          err: "please log in with a googleaccount.",
        };
      } else {
        result = await UserService.insert({ name, email, googleToken });
        res.statusCode = 201;
      }
    } catch (e) {
      res.body = e;
    } finally {
      res.send(result);
    }
  });

  router.put("/updateFromGoogle", async (req, res) => {
    //TODO: Its fake, because needs to authenticate with google/cookie
    const { email, updated } = req.body;
    let result;
    try {
      if (!(await UserService.exists({ email }))) {
        res.statusCode = 400;
        result = { err: "bad request" };
      } else {
        await UserService.update({ email }, { name: updated });
        result = await UserService.find({ name: updated });
        res.statusCode = 201;
      }
    } catch (e) {
      result = { err: e };
    } finally {
      res.send(result);
    }
  });

  router.delete("/deleteFromGoogle", async (req, res) => {
    //TODO: Its fake, because needs to authenticate with google/cookie
    const { email } = req.body;
    let result;
    try {
      result = await UserService.deleteOne({ email });
      if (result.deletedCount === 0) {
        res.statusCode = 400;
      } else {
        res.statusCode = 200;
      }
    } catch (e) {
      res.body = e;
    } finally {
      res.send(result);
    }
  });

  return router;
}
