export const newUserValidation = {
  $jsonSchema: {
    required: ["_id", "username", "password"],
    properties: {
      _id: {
        bsonType: "objectId",
        description: "must be a int",
      },
      username: {
        bsonType: "string",
        description: "must be a string",
      },
      password: {
        bsonType: "string",
        description: "must be a string",
      },
    },
  },
};
