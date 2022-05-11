import { CategoryService } from "../service/CategoryService";

describe("Category service", function () {
  it("inserts and retrieves category", async function () {
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

  it("deletes single category", async function () {
    const category = await CategoryService.insert({ name: "Test category" });
    expect(await CategoryService.find({ name: "Test category" })).toHaveLength(
      1
    );
    await CategoryService.deleteOne({ category });
    expect(await CategoryService.find()).toHaveLength(0);
  });

  it("deletes all categories", async function () {
    await CategoryService.insert({ name: "Test category 1" });
    await CategoryService.insert({ name: "Test category 2" });
    expect(await CategoryService.find()).toHaveLength(2);
    await CategoryService.deleteMany();
    expect(await CategoryService.find()).toHaveLength(0);
  });
});
