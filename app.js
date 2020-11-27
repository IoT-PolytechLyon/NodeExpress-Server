import express from 'express';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
//import {default as ConnectedDevice} from './src/models/connectedDevice.js';


// const ConnectedDeviceSchema = new Schema({
//     name: String,
//     description: String,
//     router: String,
//     state: 
//     {
//         pir_state:
//         {
//             detected_something: Boolean
//         },
//         nfc_state:
//         {
//             is_activated: Boolean
//         },
//         led_state:
//         {
//             is_on: Boolean,
//             red_value: Number,
//             green_value: Number,
//             blue_value: Number
//         }
//     }
// })

const app = express();

const url = 'mongodb://127.0.0.1:27017/iot-2a';

mongoose.connect(url, {useUnifiedTopology:true, useNewUrlParser:true});
mongoose.connection
.on('error', console.error.bind(console, 'connection error:'))
.once('open', () =>
{
    console.log("connecté à Mongoose")
});

const connectedDeviceSchema = new Schema({
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

 let connectedDeviceModel = mongoose.model('ConnectedDevice', connectedDeviceSchema);

const createConnectedDevice = () =>
{
    let esp32 = new connectedDeviceModel
    ({
        name:'connectedDevice',
        description:'that device links one esp32 microCPU with 1 NFC reader, 1 motion sensor and 3 LEDs.',
        router:'192.168.0.19',
        state:
        {
            pir_state:
            {
                detected_something:false
            },
            nfc_state:
            {
                is_activated: false
            },
            led_state:
            {
                is_on: false,
                red_value: 12,
                green_value: 120,
                blue_value: 130
            }
        }
    });

//     esp32.save( (err) =>
//     {
//         if(err)
//         {
//             //console.log("could note save : ", err);
//             return handleError(err);
//         }
//     })

    esp32.save( function(err)
    {
        console.log("in sve");
        if(err)
        {
            console.log(err);
            return err;
        }
    });
}



app.get('/connected-devices', (req,res) => {
    res.send("Enregistrement de l'esp32")
    createConnectedDevice();
    console.log("enregistré");
})

app.listen(8081, () =>
{
    console.log("server is running");
    //console.log(ConnectedDevice);
});

