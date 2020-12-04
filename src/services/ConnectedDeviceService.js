import ConnectedDevice from '../models/connectedDevice.js';

function createNewConnectedDevice(req, res) {

    const connectedDevice = new ConnectedDevice({
        name: req.body.name, 
        description: req.body.description,
        router: req.body.router,
        state: 
        {
            pir_state:
            {
                detected_something: req.body.state.pir_state.detected_something
            },
            nfc_state:
            {
                is_activated: req.body.state.nfc_state.is_activated
            },
            led_state:
            {
                is_on: req.body.state.led_state.is_on,
                red_value: req.body.state.led_state.red_value,
                green_value: req.body.state.led_state.green_value,
                blue_value: req.body.state.led_state.blue_value
            }
        }
    })

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

function updateConnectedDeviceById(req, res) {

    ConnectedDevice.findById(req.params.id, function(err, connectedDevice) {

        if (err) {
            return res.status(404).json({message: "Connected device n°" + req.params.id + " is not found."});
        }
        else {
            connectedDevice.state.pir_state.detected_something = req.body.state.pir_state.detected_something;
            connectedDevice.state.nfc_state.is_activated = req.body.state.nfc_state.is_activated;
            connectedDevice.state.led_state.is_on = req.body.state.led_state.is_on;
            connectedDevice.state.led_state.red_value = req.body.state.led_state.red_value;
            connectedDevice.state.led_state.green_value = req.body.state.led_state.green_value;
            connectedDevice.state.led_state.blue_value = req.body.state.led_state.blue_value;
            connectedDevice.name = req.body.name;
            connectedDevice.description = req.body.description;
            connectedDevice.router = req.body.router;
            connectedDevice.__v = req.body.__v;

            //save the connected device and check for errors
            connectedDevice.save(function (err) {
                if(err) {
                    res.json(err);
                }
                res.json({
                    message: 'Connected Device updated.',
                    data: connectedDevice
                });
            })
        }

    });

}


export {createNewConnectedDevice, findAllConnectedDevices, findConnectedDevicesById, updateConnectedDeviceById};