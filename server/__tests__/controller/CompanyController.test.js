import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { CompanyController } from "../../routes/CompanyController";
import { CompanyService } from "../../service/CompanyService";

const app = express();
app.use(bodyParser.json());
app.use("/", CompanyController());

const testCustomer = {
  name: "Test customer",
  orgNr: 1234,
  type: "customer",
};
const testNonProfit = {
  name: "Test non-profit",
  orgNr: 5678,
  type: "non-profit",
};

describe("Company controller", () => {
  it("fetches companies", async () => {
    await CompanyService.insert(testCustomer);
    await CompanyService.insert(testNonProfit);

    const response = await request(app)
      .get("/all")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(testCustomer),
        expect.objectContaining(testNonProfit),
      ])
    );
  });

  it("inserts a company", async () => {
    const result = await request(app)
      .post("/create")
      .send(testCustomer)
      .expect(201)
      .expect("Content-Type", /json/);

    //Has the company in the body of the result
    console.log(result.body);
    expect(result.body).toEqual(expect.objectContaining(testCustomer));
    //The service has the object stored
    expect(await CompanyService.find()).toEqual(
      expect.arrayContaining([expect.objectContaining(testCustomer)])
    );
  });

  it("updates a company by org. number or returns 404 if it doesn't exist", async () => {
    await CompanyService.insert(testNonProfit);
    await request(app)
      .put("/update")
      .send({ orgNr: testNonProfit.orgNr, name: "Updated name" })
      .expect(201);

    expect(await CompanyService.find()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Updated name" }),
      ])
    );

    await request(app)
      .put("/update")
      .send({ orgNr: 4444, name: "Test" })
      .expect(404);
  });

  it("returns 400 on duplicate company insert", async () => {
    await request(app).post("/create").send(testCustomer);
    await request(app).post("/create").send(testCustomer).expect(400);
  });

  it("deletes a company", async () => {
    await CompanyService.insert(testCustomer);
    await request(app).delete("/delete").send(testCustomer).expect(200);
    await request(app).delete("/delete").send(testNonProfit).expect(404);

    expect(await CompanyService.find()).toEqual([]);
  });
});
