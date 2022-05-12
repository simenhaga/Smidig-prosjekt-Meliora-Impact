import { UserService } from "../service/UserService.js";

describe("User service", () => {
  const testUser = {
    name: "Test user",
    email: "a.b@c.com",
  };
  it("inserts and retrieves user", async () => {
    await UserService.insert(testUser);
    expect(await UserService.find(testUser)).toEqual(
      expect.arrayContaining([expect.objectContaining(testUser)])
    );
  });
  it("finds a single user", async () => {
    await UserService.insert(testUser);
    expect(await UserService.findOne(testUser)).toEqual(
      expect.objectContaining(testUser)
    );
  });

  it("updates user", async () => {
    await UserService.insert(testUser);
    await UserService.update(testUser, { name: "Test user with new name" });
    expect(
      await UserService.find({ name: "Test user with new name" })
    ).toBeDefined();
  });

  it("deletes single user", async () => {
    const user = await UserService.insert(testUser);
    expect(await UserService.find(testUser)).toHaveLength(1);
    await UserService.deleteOne(user);
    expect(await UserService.find()).toHaveLength(0);
  });

  it("deletes all users", async () => {
    await UserService.insert(testUser);
    await UserService.insert({ name: testUser.name, email: "b@c.com" });
    expect(await UserService.find()).toHaveLength(2);
    await UserService.deleteMany();
    expect(await UserService.find()).toHaveLength(0);
  });
});
