import { Company } from "../model/Company.js";

const CompanyService = (function () {
  return {
    insert: async function (document) {
      const company = new Company(document);
      await company.save();
      return company;
    },
    find: async function (query) {
      return Company.find(query);
    },
    findOne: async function (query) {
      return Company.findOne(query);
    },
    deleteOne: async function (query) {
      return Company.deleteOne(query);
    },
    update: async function (filter, query) {
      return Company.updateOne(filter, query);
    },
    deleteMany: async function (query) {
      return Company.deleteMany(query);
    },
    exists: async function (query) {
      return Company.exists(query);
    },
  };
})();

export { CompanyService };
