import ConnectedDevice from '../models/connectedDevice.js';

import axios from 'axios';
import esp32 from '../config/esp32.conf.js';

function createNewConnectedDevice(req, res) {

    const connectedDevice = new ConnectedDevice(req.body);

    connectedDevice.save().then(data => {
        res.status(201).json({message: "The connected device (" + req.body.name + ") has been created."});
        console.log("The connected device (" + req.body.name + ") has been created.");
    })
    .catch(err => {
        res.json({message :err});
    })

}


async function findAllConnectedDevices(req, res) {
    try {
        const connectedDevices = await ConnectedDevice.find();
        res.status(200).json(connectedDevices);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

function findConnectedDevicesById(req, res) {
    try {
        ConnectedDevice.findById(req.params.id, function(err, connectedDevice) {
            if (err) { 
                console.log(err); 
                return res.status(404).json({message: "Connected device n°" + req.params.id + " is not found."});
            } 
            else {  
                res.status(200).json(connectedDevice);
            } 
        });

    } catch(err) {
        console.log("err")
        res.status(500).json({message: err.message});
    }
}

function findConnectedDeviceByName(req, res)
{
    try {
        ConnectedDevice.find({name: req.params.name}, function(err, connectedDevice) {
            if (err) { 
                console.log(err); 
                return res.status(404).json({message: "Connected device with name" + req.params.name + " is not found."});
            } 
            else {  
                res.status(200).json(connectedDevice);
            } 
        });

    } catch(err) {
        console.log("err")
        res.status(500).json({message: err.message});
    }
}

function updateConnectedDeviceById(req, res) {

    ConnectedDevice.findById(req.params.id, function(err1, connectedDevice) {
        if (err1) {
            return res.status(404).json({message: "Connected device n°" + req.params.id + " is not found."});
        }
        else {
            connectedDevice.state.pir_state.detected_something = req.body.state.pir_state.detected_something;
            connectedDevice.state.nfc_state.is_activated = req.body.state.nfc_state.is_activated;
            connectedDevice.state.led_state.is_on = req.body.state.led_state.is_on;
            connectedDevice.state.led_state.red_value = req.body.state.led_state.red_value;
            connectedDevice.state.led_state.green_value = req.body.state.led_state.green_value;
            connectedDevice.state.led_state.blue_value = req.body.state.led_state.blue_value;

            //save the connected device and check for errors
            connectedDevice.save(function (err2) {
                if(err2) {
                    console.log(err2);
                    res.status(400).json(err2);
                }
                else
                {
                    console.log("Sending POST to esp32 : ")
                    console.log(connectedDevice);
                    axios.post("http://" + esp32.ip + ":" + esp32.port + esp32.post_led_endpoint, connectedDevice).then(res =>
                    {
                        console.log(res);
                    }).catch(error =>
                    {
                        console.log(error);
                    })
                    res.status(200).json({
                        message: 'Connected Device updated.',
                        data: connectedDevice
                    });

                }
            });
        }

    });

}


export {createNewConnectedDevice, findAllConnectedDevices, findConnectedDevicesById, findConnectedDeviceByName, updateConnectedDeviceById};