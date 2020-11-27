import mongoose from 'mongoose';
const { Schema } = mongoose;

const ConnectedDeviceSchema = new Schema({
    name: String,
    description: String,
    router: String,
    state: 
    {
        pir_state:
        {
            detected_something: Boolean
        },
        nfc_state:
        {
            is_activated: Boolean
        },
        led_state:
        {
            is_on: Boolean,
            red_value: Number,
            green_value: Number,
            blue_value: Number
        }
    }
})

export default mongoose.model('ConnectedDevice', ConnectedDeviceSchema);