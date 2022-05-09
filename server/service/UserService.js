import { MongoClient } from "mongodb";

let UserService = (function () {
  let _dataSource;
  let instance;
  let _collectionName;

  function createInstance() {
    return {
      listAll: async () => {
        return await _dataSource.collection(_collectionName).find().toArray();
      },
    };
  }

  return {
    init: ({ dataSource, collectionName }) => {
      if (!dataSource || !collectionName) {
        throw new SyntaxError("Wrong number of parameters passed");
      }
      if (!instance) {
        _collectionName = collectionName;
        _dataSource = dataSource;
        instance = createInstance();
      }
    },
    get: () => {
      if (!_dataSource || !instance)
        throw new Error("Singleton not initialised");
      return instance;
    },
  };
})();

export { UserService };
