import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { User } from "../model/User.js";
import { UserService } from "../service/UserService.js";

describe("User service", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterEach(async () => {
    await User.deleteMany();
    const result = await User.find();
    expect(result).toHaveLength(0);
  });

  it("inserts and retrieves user", async () => {
    const user = await UserService.insert({ name: "Test user" });
    expect(await UserService.find({ name: "Test user" })).toBeDefined();
  });

  it("updates user", async () => {
    const user = await UserService.insert({ name: "Test user" });
    await UserService.update(
      { name: "Test user" },
      { name: "Test user with new name" }
    );
    expect(
      await UserService.find({ name: "Test user with new name" })
    ).toBeDefined();
  });

  it("deletes single user", async () => {
    const user = await UserService.insert({ name: "Test user" });
    expect(await UserService.find({ name: "Test user" })).toHaveLength(1);
    await UserService.deleteOne(user);
    expect(await UserService.find()).toHaveLength(0);
  });

  it("deletes all users", async () => {
    await UserService.insert({ name: "Test user 1" });
    await UserService.insert({ name: "Test user 2" });
    expect(await UserService.find()).toHaveLength(2);
    await UserService.deleteMany();
    expect(await UserService.find()).toHaveLength(0);
  });
});
