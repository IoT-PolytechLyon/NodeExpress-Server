import mongoose from 'mongoose';
const { Schema } = mongoose;

var validateRouter = function(router) {
    var format = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return format.test(router);
}

const ConnectedDeviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    router: {
        type: String,
        validate: [validateRouter, "Please fill a valid router"],
        required: true
    },
    port: {
        type: Number,
        default: 8080
    },
    state: 
    {
        pir_state:
        {
            detected_something: {
                type: Boolean,
                default: false
            }
        },
        nfc_state:
        {
            is_activated: {
                type: Boolean,
                default: false,
            }
        },
        led_state:
        {
            is_on: {
                type: Boolean,
                default: false,
            },
            red_value: {
                type: Number,
                min: 0,
                max: 255,
                default: 0,
            },
            green_value: {
                type: Number,
                min: 0,
                max: 255,
                default: 0,
            },
            blue_value: {
                type: Number,
                min: 0,
                max: 255,
                default: 0,
            }
        }
    }
})

export default mongoose.model('ConnectedDevice', ConnectedDeviceSchema);