'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DeviceSchema = new Schema({
  name: {
    type: String,
    required: 'Enter the name of the device'
  },
  type: {
    type: String,
    required: 'Enter the type of device'
  },
  description: {
    type: String,
    required: 'Enter the description of the device'
  },
});

var deviceModel = mongoose.model('Device', DeviceSchema);

module.exports = deviceModel;