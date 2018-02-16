const { GraphQLList, GraphQLInt } = require('graphql')
const DeviceType = require('../types/device')

module.exports = {
  type: new GraphQLList(DeviceType),
  args:{
    first: {
      name: 'first',
      type: GraphQLInt
    },
    skip: {
      name: 'skip',
      type: GraphQLInt
    }
  },
  resolve: (root,
    { first = null, skip = null },
    { db: { Device } },
    fieldASTs
  ) => {
    return new Promise((resolve, reject) => {
      var projections = getProjection(fieldASTs);

      Device.find({})
        .select(projections)
        .skip(skip)
        .limit(first)
        .exec()
        .then(data => resolve(data))
        .catch(errors => reject(errors));
    })
  }
}

function getProjection(fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}
