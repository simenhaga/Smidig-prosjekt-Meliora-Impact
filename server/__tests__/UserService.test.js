import { UserService } from "../service/UserService";
import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

describe("User service", () => {
  let mongoServer;
  let connection;
  let dataSource;
  let collection;
  const collectionName = "user";

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    connection = await MongoClient.connect(mongoServer.getUri());
    dataSource = connection.db(mongoServer.instanceInfo.dbName);
    expect(dataSource).toBeDefined();

    collection = await dataSource.createCollection(collectionName);
    UserService.init({
      dataSource: dataSource,
      collectionName: collectionName,
    });
  });
  it("Should list users", async () => {
    await dataSource.collection(collectionName).insertOne({ name: "User 1" });
    const array = await dataSource.collection(collectionName).find().toArray();
    expect(array).toHaveLength(1);

    const users = await UserService.get().listAll();
    expect(users.map(({ name }) => ({ name }))).toEqual(
      expect.arrayContaining([{ name: "User 1" }])
    );
  });
  afterEach(async () => {
    await collection.deleteMany();
    expect(await collection.find().toArray()).toHaveLength(0);
  });
});
