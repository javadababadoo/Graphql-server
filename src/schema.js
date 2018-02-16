const _ = require('lodash');
const Authors = require('./data/authors'); // This is to make available authors.json file
const Posts = require('./data/posts'); // This is to make available post.json file
const socket = require('../socket');
const {PubSub, withFilter } = require('graphql-subscriptions');
const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const queries = require('./queries');
const mutations = require('./mutations');
const subscriptions = require('./subscriptions');


function getProjection(fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}

const DeviceQueryRootType = new GraphQLObjectType({
  name: 'Queries',
  fields: queries
});

const DeviceMutationRootType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation to create devices',
  fields: mutations
});


const DeviceSubscriptionRootType = new GraphQLObjectType({
  name: 'Subscription',
  fields: subscriptions
});

// This is the schema declaration
const BlogAppSchema = new GraphQLSchema({
  query: DeviceQueryRootType,
  mutation: DeviceMutationRootType,
  subscription: DeviceSubscriptionRootType,
});

module.exports = BlogAppSchema;