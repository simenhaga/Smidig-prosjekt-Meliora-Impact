import { CategoryService } from "../service/CategoryService";

describe("Category service", () => {
  it("inserts and retrieves category", async () => {
    await CategoryService.insert({ name: "Test category" });
    expect(await CategoryService.find({ name: "Test category" })).toBeDefined();
  });

  it("updates category", async () => {
    await CategoryService.insert({ name: "Test category" });
    await CategoryService.update(
      { name: "Test category" },
      { name: "Test category with new name" }
    );
    expect(
      await CategoryService.findOne({ name: "Test category with new name" })
    ).toEqual(expect.objectContaining({ name: "Test category with new name" }));
  });

  it("finds a single category", async () => {
    await CategoryService.insert({ name: "Test category" });
    expect(await CategoryService.findOne({ name: "Test category" })).toEqual(
      expect.objectContaining({ name: "Test category" })
    );
  });

  it("deletes single category", async () => {
    const category = await CategoryService.insert({ name: "Test category" });
    expect(await CategoryService.find({ name: "Test category" })).toHaveLength(
      1
    );
    await CategoryService.deleteOne({ category });
    expect(await CategoryService.find()).toHaveLength(0);
  });

  it("deletes all categories", async () => {
    await CategoryService.insert({ name: "Test category 1" });
    await CategoryService.insert({ name: "Test category 2" });
    expect(await CategoryService.find()).toHaveLength(2);
    await CategoryService.deleteMany();
    expect(await CategoryService.find()).toHaveLength(0);
  });
});
