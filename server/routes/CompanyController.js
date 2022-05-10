import { Router } from "express";
import { CompanyService } from "../service/CompanyService.js";
import bodyParser from "body-parser";

export function CompanyController() {
  const router = new Router();
  router.use(bodyParser.json());

  router.get("/", async (req, res) => {
    try {
      const all = await CompanyService.find();
      res.statusCode = 200;
      res.json({ all });
    } catch (e) {
      res.json(e);
    }
  });

  router.post("/", async (req, res) => {
    const { name, orgNr, type } = req.body;
    try {
      if (!(await CompanyService.exists({ orgNr }))) {
        const result = await CompanyService.insert({ name, orgNr, type });
        res.statusCode = 201;
        res.body = result;
      } else {
        res.statusCode = 400;
        res.body = "duplicate";
      }
    } catch (e) {
      res.body = e;
    } finally {
      res.contentType("application/json");
      res.send();
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
