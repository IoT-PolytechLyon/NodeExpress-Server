import {createNewConnectedDevice, findAllConnectedDevices, findConnectedDevicesById, findConnectedDeviceByName, updateConnectedDeviceById} from '../services/ConnectedDeviceService.js';

/**
 * Adds a new connected device - POST method
 * @param {*} req request
 * @param {*} res result
 */
function  newConnectedDevice(req, res) {
    return createNewConnectedDevice(req, res);
}

/**
 * Gets all the connected devices - GET method
 * @param {*} req request
 * @param {*} res result
 */
function getAllConnectedDevices(req, res) {
    return findAllConnectedDevices(req, res);
}

/**
 * Gets connected device by id - GET method
 * @param {*} req 
 * @param {*} res 
 */
function getConnectedDeviceById(req, res) {
    return findConnectedDevicesById(req, res);
}

/**
 * Gets connected device by name - GET method
 * @param {*} req request
 * @param {*} res result
 */
function getConnectedDeviceByName(req, res)
{
    return findConnectedDeviceByName(req, res);
}

/**
 * Updating a spectific connected device by id - PUT method
 * @param {*} req request
 * @param {*} res result
 */
function putConnectedDeviceById(req, res) {
    return updateConnectedDeviceById(req, res);
}



export {newConnectedDevice, getAllConnectedDevices, getConnectedDeviceById, getConnectedDeviceByName, putConnectedDeviceById};