import { CompanyService } from "../service/CompanyService";

const testNonProfit = {
  name: "Test company",
  orgNr: 1245,
  description: "Company 1",
  type: "non-profit",
};
describe("Company service", () => {
  it("inserts and retrieves company", async () => {
    await CompanyService.insert(testNonProfit);
    expect(await CompanyService.find(testNonProfit)).toEqual(
      expect.arrayContaining([expect.objectContaining(testNonProfit)])
    );
  });

  it("finds a single company", async () => {
    await CompanyService.insert(testNonProfit);
    expect(await CompanyService.findOne(testNonProfit)).toEqual(
      expect.objectContaining(testNonProfit)
    );
  });

  it("update company", async function () {
    const company = await CompanyService.insert({
      name: "Test company",
      orgNr: 1245,
      description: "Company 1",
      type: "customer",
    });
    await CompanyService.update(
      { name: "Test company" },
      { name: "Test company with new name" }
    );
    expect(
      await CompanyService.find({ name: "Test company with new name" })
    ).toBeDefined();
  });

  it("deletes single company", async () => {
    const company = await CompanyService.insert({
      name: "Test company",
      orgNr: 1245,
      description: "Company 1",
      type: "non-profit",
    });
    expect(await CompanyService.find({ name: "Test company" })).toHaveLength(1);
    await CompanyService.deleteOne({ company });
    expect(await CompanyService.find()).toHaveLength(0);
  });

  it("deletes all companies", async () => {
    await CompanyService.insert({
      name: "Test company one",
      orgNr: 1245,
      description: "Company 1",
      type: "non-profit",
    });
    await CompanyService.insert({
      name: "Test company two",
      orgNr: 12346,
      description: "Company 2",
      type: "non-profit",
    });
    expect(await CompanyService.find()).toHaveLength(2);
    await CompanyService.deleteMany();
    expect(await CompanyService.find()).toHaveLength(0);
  });
});
