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
    const c1 = await CompanyService.insert(testCustomer);
    const c2 = await CompanyService.insert(testNonProfit);
    const response = await request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("inserts a company", async () => {
    await request(app)
      .post("/")
      .send(testCustomer)
      .expect("Content-Type", /json/)
      .expect(201);
  });
  it("returns 400 on duplicate company insert", async () => {
    await request(app).post("/").send(testCustomer);
    await request(app).post("/").send(testCustomer).expect(400);
  });
});
