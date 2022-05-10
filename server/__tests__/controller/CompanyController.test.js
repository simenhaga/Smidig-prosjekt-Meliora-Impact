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
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterEach(async () => {
    await CompanyService.deleteMany();
  });

  it("fetches companies", async () => {
    await CompanyService.insert(testCustomer);
    await CompanyService.insert(testNonProfit);
    const response = await request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.all).toEqual(
      expect.arrayContaining([
        expect.objectContaining(testCustomer),
        expect.objectContaining(testNonProfit),
      ])
    );
  });

  it("inserts a company", async () => {
    const result = await request(app)
      .post("/")
      .send(testCustomer)
      .expect("Content-Type", /json/)
      .expect(201);
    expect(result.body).toEqual(expect.objectContaining(testCustomer));
  });

  it("returns 400 on duplicate company insert", async () => {
    await request(app).post("/").send(testCustomer);
    await request(app).post("/").send(testCustomer).expect(400);
  });
});
