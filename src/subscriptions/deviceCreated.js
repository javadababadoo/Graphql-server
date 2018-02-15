const socket = require('../../socket')
const DeviceType = require('../types/device')

module.exports = {
  type: DeviceType,
  subscribe: () => socket.asyncIterator('DEVICE_CREATED')
}