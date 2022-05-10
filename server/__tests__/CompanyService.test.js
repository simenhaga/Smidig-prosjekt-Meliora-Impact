import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import Company from "../model/Company.js";
import { CompanyService } from "../service/CompanyService";

describe("Company service", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterEach(async () => {
    await Company.deleteMany();
    const result = await Company.find();
    expect(result).toHaveLength(0);
  });

  it("inserts and retrieves company", async () => {
    const company = await CompanyService.insert({ name: "Test company" });
    expect(await CompanyService.find({ name: "Test company" })).toBeDefined();
  });

  it("update company", async function () {
    const company = await CompanyService.insert({ name: "Test company" });
    await CompanyService.update(
      { name: "Test company" },
      { name: "Test company with new name" }
    );
    expect(
      await CompanyService.find({ name: "Test company with new name" })
    ).toBeDefined();
  });
});
