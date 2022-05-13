import { Router } from "express";
import { CompanyService } from "../service/CompanyService.js";
import bodyParser from "body-parser";

export function CompanyController() {
  const router = new Router();
  router.use(bodyParser.json());

  router.get("/all", async (req, res) => {
    res.json(await CompanyService.find());
  });

  router.post("/create", async (req, res) => {
    const { name, orgNr, type } = req.body;
    let result;
    if (!(await CompanyService.exists({ orgNr }))) {
      result = await CompanyService.insert({ name, orgNr, type });
      res.statusCode = 201;
      res.json(result);
    } else {
      res.sendStatus(400);
    }
  });

  router.put("/update", async (req, res) => {
    const { orgNr, name } = req.body;
    const result = await CompanyService.update({ orgNr }, { name });
    if (result.modifiedCount === 0) {
      if (result.matchedCount === 1) {
        res.statusCode = 409;
        res.send("Can't update with same value as before");
      } else {
        console.log(result);
        res.statusCode = 404;
        res.send("Resource not found");
      }
    } else {
      res.statusCode = 201;
      res.json(await CompanyService.find({ orgNr }));
    }
  });

  router.delete("/delete", async (req, res) => {
    const { orgNr } = req.body;
    const result = await CompanyService.deleteOne({ orgNr });
    if (result.deletedCount === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });

  return router;
}
