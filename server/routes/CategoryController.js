import { Router } from "express";
import { CategoryService } from "../service/CategoryService.js";

export function CategoryController() {
  const router = new Router();

  router.get("/all", async (req, res) => {
    res.json(await CategoryService.find());
  });

  router.post("/create", async (req, res) => {
    const { name } = req.body;
    if (await CategoryService.exists({ name })) {
      res.sendStatus(400);
    } else {
      const result = await CategoryService.insert({ name });
      res.json(result);
    }
  });

  router.put("/update", async (req, res) => {
    const { name, newName } = req.body;
    if (await CategoryService.exists({ name })) {
      const result = await CategoryService.update(
        { name: name },
        { name: newName }
      );
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

  router.delete("/delete", async (req, res) => {
    const { name } = req.body;
    const result = await CategoryService.deleteOne({ name });
    if (result.deletedCount === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

  return router;
}
