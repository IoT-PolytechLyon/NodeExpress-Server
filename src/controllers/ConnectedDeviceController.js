import {createNewConnectedDevice, findAllConnectedDevices, findConnectedDevicesById, findConnectedDeviceByName, updateConnectedDeviceById} from '../services/ConnectedDeviceService.js';

function  newConnectedDevice(req, res) {
    return createNewConnectedDevice(req, res);
}

function getAllConnectedDevices(req, res) {
    return findAllConnectedDevices(req, res);
}

function getConnectedDeviceById(req, res) {
    return findConnectedDevicesById(req, res);
}

function getConnectedDeviceByName(req, res)
{
    return findConnectedDeviceByName(req, res);
}

function putConnectedDeviceById(req, res) {
    return updateConnectedDeviceById(req, res);
}



export {newConnectedDevice, getAllConnectedDevices, getConnectedDeviceById, getConnectedDeviceByName, putConnectedDeviceById};