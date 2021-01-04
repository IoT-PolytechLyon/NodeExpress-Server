import mongoose from 'mongoose';
const { Schema } = mongoose;

var validateRouter = function(router) {
    var format = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return format.test(router);
}

const ConnectedDeviceSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    router: {
        type: String,
        validate: [validateRouter, "Please fill a valid router"]
    },
    port: {
        type: Number,
    },
    state: 
    {
        pir_state:
        {
            detected_something: {
                type: Boolean,
                required: true
            }
        },
        nfc_state:
        {
            is_activated: {
                type: Boolean,
                default: false,
                required: true
            }
        },
        led_state:
        {
            is_on: {
                type: Boolean,
                default: false,
                required: true
            },
            red_value: {
                type: Number,
                min: 0,
                max: 255,
                required: true
            },
            green_value: {
                type: Number,
                min: 0,
                max: 255,
                required: true
            },
            blue_value: {
                type: Number,
                min: 0,
                max: 255,
                required: true
            }
        }
    }
})

export default mongoose.model('ConnectedDevice', ConnectedDeviceSchema);