import {createNewConnectedDevice, findAllConnectedDevices, findConnectedDevicesById, updateConnectedDeviceById} from '../services/ConnectedDeviceService.js';

function  newConnectedDevice(req, res) {
    return createNewConnectedDevice(req, res);
}

function getAllConnectedDevices(req, res) {
    return findAllConnectedDevices(req, res);
}

function getConnectedDeviceById(req, res) {
    return findConnectedDevicesById(req, res);
}

function putConnectedDeviceById(req, res) {
    return updateConnectedDeviceById(req, res);
}

export {newConnectedDevice, getAllConnectedDevices, getConnectedDeviceById, putConnectedDeviceById};