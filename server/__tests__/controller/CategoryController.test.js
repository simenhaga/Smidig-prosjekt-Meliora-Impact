import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { CategoryController } from "../../routes/CategoryController";
import { CategoryService } from "../../service/CategoryService";

const app = express();
app.use(bodyParser.json());
app.use("/", CategoryController());

const testCategory = {
  name: "Test category",
};

describe("Category controller", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterEach(async () => {
    await CategoryService.deleteMany();
  });

  it("fetches categories", async () => {
    await CategoryService.insert(testCategory);
    const response = await request(app)
      .get("/all")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.all).toEqual(
      expect.arrayContaining([expect.objectContaining(testCategory)])
    );
  });

  it("inserts a category", async () => {
    await request(app)
      .post("/create")
      .send(testCategory)
      .expect("Content-Type", /json/)
      .expect(testCategory)
      .expect(200);
  });

  it("deletes a category", async () => {
    await CategoryService.insert(testCategory);
    await request(app).delete("/delete").send(testCategory).expect(200);
    expect(CategoryService.find()).toHaveLength(0);
  });

  it("returns 400 on duplicate category insert", async () => {
    await request(app).post("/create").send(testCategory);
    await request(app).post("/create").send(testCategory).expect(400);
  });
});
