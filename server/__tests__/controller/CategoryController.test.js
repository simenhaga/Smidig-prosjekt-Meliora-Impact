import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import { CategoryController } from "../../routes/CategoryController";
import { CategoryService } from "../../service/CategoryService";

const app = express();
app.use(bodyParser.json());
app.use("/", CategoryController());

const testCategory = {
  name: "Test category",
};

describe("Category controller", () => {
  it("fetches categories", async () => {
    await CategoryService.insert(testCategory);
    const res = await request(app)
      .get("/all")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining(testCategory)])
    );
  });

  it("inserts a category", async () => {
    const res = await request(app)
      .post("/create")
      .send(testCategory)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toEqual(expect.objectContaining(testCategory));
  });

  it("deletes a category or returns 404 if it doesn't exist", async () => {
    await CategoryService.insert(testCategory);
    await request(app).delete("/delete").send(testCategory).expect(200);
    expect(await CategoryService.find()).toHaveLength(0);
    await request(app).delete("/delete").send(testCategory).expect(404);
  });

  it("returns 400 on duplicate category insert", async () => {
    await request(app).post("/create").send(testCategory);
    await request(app).post("/create").send(testCategory).expect(400);
  });
});
