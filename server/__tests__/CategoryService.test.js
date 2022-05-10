import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import Category from "../model/Category.js";
import { CategoryService } from "../service/CategoryService";

describe("Category service", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterEach(async () => {
    await Category.deleteMany();
    const result = await Category.find();
    expect(result).toHaveLength(0);
  });

  it("inserts and retrieves category", async () => {
    const category = await CategoryService.insert({ name: "Test category" });
    expect(await CategoryService.find({ name: "Test category" })).toBeDefined();
  });

  it("update category", async function () {
    const category = await CategoryService.insert({ name: "Test category" });
    await CategoryService.update(
      { name: "Test category" },
      { name: "Test category with new name" }
    );
    expect(
      await CategoryService.find({ name: "Test category with new name" })
    ).toBeDefined();
  });
});
