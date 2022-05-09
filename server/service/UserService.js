import { User } from "../model/User.js";

const UserService = (function () {
  return {
    insert: async function (document) {
      const user = new User(document);
      await user.save();
      return user;
    },
    find: async function (query) {
      return await User.find(query);
    },
    delete: async function (query) {
      return await User.deleteOne(query);
    },
    update: async function (filter, query) {
      return await User.updateOne(filter, query);
    },
  };
})();

export { UserService };
