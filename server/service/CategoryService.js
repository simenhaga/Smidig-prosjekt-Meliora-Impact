import { Category } from "../model/Category.js";

const CategoryService = (function () {
  return {
    insert: async function (document) {
      const category = new Category(document);
      await category.save();
      return category;
    },
    find: async function (query) {
      return await Category.find(query);
    },
    delete: async function (query) {
      return await Category.deleteOne(query);
    },
    update: async function (filter, query) {
      return await Category.updateOne(filter, query);
    },
  };
})();

export { CategoryService };
