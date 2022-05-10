import { Router } from "express";

export function CompanyController(database) {
  const router = new Router();

  router.get("/all", async (req, res) => {
    //TODO: Create get all users
  });

  router.post("/new", async (req, res) => {
    const { id, username } = req.body;
    try {
      //TODO: Create post user
    } catch (e) {}
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
