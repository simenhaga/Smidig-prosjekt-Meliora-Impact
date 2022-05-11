import { User } from "../model/User.js";

const UserService = (function () {
  return {
    insert: async function (document) {
      const user = new User(document);
      await user.save();
      return user;
    },
    update: async function (filter, query) {
      return await User.updateOne(filter, query);
    },
    find: async function (query) {
      return await User.find(query);
    },
    deleteOne: async function (query) {
      return await User.deleteOne(query);
    },
    deleteMany: async function (query) {
      return await User.deleteMany(query);
    },
    exists: async function (query) {
      return await User.exists(query);
    },
  };
})();

export { UserService };
