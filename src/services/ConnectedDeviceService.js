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
        console.log(req.params.id)
        ConnectedDevice.findById(req.params.id, function(err, connectedDevice) {
            if (err){ 
                console.log(err); 
                return res.status(404).json({message: "Connected device n°" + req.params.id + " is not found."});
            } 
            else{  
                res.status(200).json(connectedDevice);
            } 
        });

    } catch(err) {
        console.log("err")
        res.status(500).json({message: err.message});
    }
}

function updateConnectedDeviceById(req, res) {

    const connectedDevice = ConnectedDevice.findById(req.params.id);

    if (!connectedDevice) {
        return res.status(404).json({message: "Erreur"});
    }

    res.status(200).json(connectedDevice);

}


export {createNewConnectedDevice, findAllConnectedDevices, findConnectedDevicesById, updateConnectedDeviceById};