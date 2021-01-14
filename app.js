import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {signUp, signIn} from './src/controllers/UserController.js'
import {newConnectedDevice, getAllConnectedDevices, getConnectedDeviceById, getConnectedDeviceByName, putConnectedDeviceById} from './src/controllers/ConnectedDeviceController.js'
import {initBadges, findAllNfc} from './src/controllers/NfcController.js';

const app = express();

app.use(bodyParser.json());

const url = 'mongodb://127.0.0.1:27017/iot-2a';

// Connecting to Mongoose
mongoose.connect(url, {useUnifiedTopology:true, useNewUrlParser:true});
mongoose.connection
.on('error', console.error.bind(console, 'connection error:'))
.once('open', () =>
{
    console.log("Connecté à Mongoose")
});

// Starts listening on port 8081
app.listen(8081, () =>
{
    console.log("Server is running");
});

// Adding NFC badges into the database
initBadges();

// User sign in
app.post('/sign-in', signIn);

// User sign up
app.post('/sign-up', signUp);

// Retrieving all connected devices
app.get('/connected-devices', getAllConnectedDevices);

// Retrieving a connected device by id
app.get('/connected-devices/:id', getConnectedDeviceById);

// Retrieving a connected device by name
app.get('/connected-devices/by-name/:name', getConnectedDeviceByName);

// Adding a new connected device
app.post('/connected-devices', newConnectedDevice);

// Updating a connected device by id
app.put('/connected-devices/:id', putConnectedDeviceById);

// Retrieving all NFC badges
app.get('/badges', findAllNfc);
