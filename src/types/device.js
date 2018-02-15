let {
    // These are the basic GraphQL types need in this tutorial
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    // This is used to create required fileds and arguments
    GraphQLNonNull,
    // This is the class we need to create the schema
    GraphQLSchema,
  } = require('graphql');

module.exports = new GraphQLObjectType({
    name: "Device",
    description: "This represent a device",
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      type: { type: new GraphQLNonNull(GraphQLString) }
    })
  });