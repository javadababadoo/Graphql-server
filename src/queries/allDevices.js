DeviceModel = require('../api/models/deviceListModel');
const { GraphQLList, GraphQLInt } = require('graphql')
const DeviceType = require('../types/device')

module.exports = {
  type: new GraphQLList(DeviceType),
  resolve: (root, args, ctx, fieldASTs) => {
    return new Promise((resolve, reject) => {
        var projections = getProjection(fieldASTs);
        var foundItems = new Promise((resolve, reject) => {
          DeviceModel.find({}, projections, (err, devices) => {
            err ? reject(err) : resolve(devices)
          })
        });
        return foundItems;
    })
  }
}

function getProjection(fieldASTs) {
    return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
      projections[selection.name.value] = true;
      return projections;
    }, {});
}
