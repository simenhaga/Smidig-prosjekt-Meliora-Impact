import { User } from "../model/User.js";

const UserService = (function () {
  return {
    insert: async function (document) {
      const user = new User(document);
      await user.save();
      return user;
    },
    update: async function (filter, query) {
      return User.updateOne(filter, query);
    },
    find: async function (query) {
      return User.find(query);
    },
    findOne: async function (query) {
      return User.findOne(query);
    },
    deleteOne: async function (query) {
      return User.deleteOne(query);
    },
    deleteMany: async function (query) {
      return User.deleteMany(query);
    },
    exists: async function (query) {
      return User.exists(query);
    },
  };
})();

export { UserService };
