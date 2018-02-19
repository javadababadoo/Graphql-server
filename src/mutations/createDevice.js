const { GraphQLNonNull, GraphQLString } = require('graphql')
const DeviceType = require('../types/device')
const socket = require('../../socket')

module.exports = {
    type: DeviceType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (value, { id, name, description, type }, { db: { Device } }) => {
        return new Promise((resolve, reject) => {
            const data = { id, name, description, type };
            const newDevice = new Device(data)

            newDevice
                .save()
                .then(data => {
                    console.log('Data created -> ', data);
                    socket.publish('DEVICE_CREATED', {
                        deviceCreated: data
                    });
                    resolve(data);
                })
                .catch(errors => reject(errors))



            // const new_device = new Device();
            // new_device.name = name;
            // new_device.type = type;
            // new_device.description = description;
            // const device = new_device.save();

            // if (!device) {
            //     throw new Error('Error');
            // }
            // console.log('Device_created', device);
            // socket.publish('DEVICE_CREATED', {
            //     deviceCreated: device
            // });
            // return device;
        })
    }
}