import { Router } from "express";
import { CategoryService } from "../service/CategoryService.js";

export function CategoryController() {
  const router = new Router();

  router.get("/", async (req, res) => {});

  router.get("/all", async (req, res) => {
    try {
      const all = await CategoryService.find();
      res.json({ all });
    } catch (e) {
      res.json(e);
    }
  });

  router.post("/create", async (req, res) => {
    try {
      const { name } = req.body;
      const result = await CategoryService.insert({ name: name });
      console.log(result);
      res.json(await CategoryService.find({ name: name }));
    } catch (e) {
      res.json(e);
    }
  });

  router.put("/update", async (req, res) => {
    const { name, updated } = req.body;
    try {
      const result = await CategoryService.update(
        { name: name },
        { name: updated }
      );
      console.log({ result });
    } catch (e) {
      res.body = e;
    } finally {
      res.send();
    }
  });

  router.delete("/delete", (req, res) => {
    throw new Error("not implemented");
  });

  return router;
}
