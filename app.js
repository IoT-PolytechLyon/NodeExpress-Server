import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {signUp, signIn} from './src/controllers/UserController.js'
import {newConnectedDevice, getAllConnectedDevices, getConnectedDeviceById, putConnectedDeviceById} from './src/controllers/ConnectedDeviceController.js'

const app = express();

app.use(bodyParser.json());

const url = 'mongodb://127.0.0.1:27017/iot-2a';

mongoose.connect(url, {useUnifiedTopology:true, useNewUrlParser:true});
mongoose.connection
.on('error', console.error.bind(console, 'connection error:'))
.once('open', () =>
{
    console.log("Connecté à Mongoose")
});

app.listen(8081, () =>
{
    console.log("Server is running");
});


app.post('/sign-up', signUp);

app.post('/sign-in', signIn);

app.post('/connected-devices', newConnectedDevice);

app.get('/connected-devices', getAllConnectedDevices);

app.get('/connected-devices/:id', getConnectedDeviceById)

app.put('/connected-devices/:id', putConnectedDeviceById)