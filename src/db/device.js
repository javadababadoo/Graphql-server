const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'Device',
  Schema({
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
  })
);