export const typeDefs = `
  type Query {
    hello: String
    users: [User]
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    updateUser(_id: ID!, name: String, email: String): User
    deleteUser(_id: ID!): User
  }

  type User {
    _id: ID!
    name: String!
    email: String!
  }
`;
