import { Router } from "express";
import { CompanyService } from "../service/CompanyService.js";
import bodyParser from "body-parser";

export function CompanyController() {
  const router = new Router();
  router.use(bodyParser.json());

  router.get("/all", async (req, res) => {
    try {
      const all = await CompanyService.find();
      res.statusCode = 200;
      res.json({ all });
    } catch (e) {
      res.json(e);
    }
  });

  router.post("/create", async (req, res) => {
    const { name, orgNr, type } = req.body;
    let result;
    try {
      if (!(await CompanyService.exists({ orgNr }))) {
        result = await CompanyService.insert({ name, orgNr, type });
        res.statusCode = 201;
      } else {
        res.statusCode = 400;
        result = { err: "Duplicate" };
      }
    } catch (e) {
      res.body = e;
    } finally {
      res.contentType("application/json").send(result);
    }
  });

  router.put("/update", async (req, res) => {
    const { orgNr, name } = req.body;
    let result;
    try {
      result = await CompanyService.update({ orgNr }, { name });
      if (result.modifiedCount === 0) {
        if (result.matchedCount === 1) {
          res.statusCode = 409;
          result = "Can't update with same value as before";
        } else {
          console.log(result);
          res.statusCode = 404;
          result = "Resource not found";
        }
      } else {
        res.statusCode = 201;
        result = await CompanyService.find({ orgNr });
      }
    } catch (e) {
      res.body = e;
    } finally {
      res.send(result);
    }
  });

  router.delete("/delete", async (req, res) => {
    const { orgNr } = req.body;
    let result;
    try {
      result = await CompanyService.deleteOne({ orgNr });
      if (result.deletedCount === 0) {
        res.statusCode = 404;
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
