import { Router } from "express";
import { UserService } from "../service/UserService.js";
import { CompanyService } from "../service/CompanyService";

export function UserController(database) {
  const router = new Router();

  router.get("/all", async (req, res) => {
    try {
      const all = await UserService.find();
      res.statusCode = 200;
      res.json({ all });
    } catch (e) {
      res.json(e);
    }
  });

  router.post("/create", async (req, res) => {
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

  router.put("/update", async (req, res) => {
    const { id, username } = req.body;
    try {
      //TODO: Create update user
    } catch (e) {}
  });

  router.delete("/delete", (req, res) => {
    //TODO: Delete user
  });

  return router;
}
