import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { UserService } from "../../service/UserService";

describe("User controller", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterEach(async () => {
    await UserService.deleteMany();
    expect(await UserService.find()).toHaveLength(0);
  });

  it("gets all users", async () => {});
});
