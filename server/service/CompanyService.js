import { Company } from "../model/Company.js";

const CompanyService = (function () {
  return {
    insert: async function (document) {
      const company = new Company(document);
      await company.save();
      return company;
    },
    find: async function (query) {
      return await Company.find(query).then();
    },
    deleteOne: async function (query) {
      return await Company.deleteOne(query);
    },
    update: async function (filter, query) {
      return await Company.updateOne(filter, query);
    },
    deleteMany: async function (query) {
      return await Company.deleteMany(query);
    },
    exists: async function (query) {
      return await Company.exists(query);
    },
  };
})();

export { CompanyService };
