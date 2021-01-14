import {insertNfcBadges, findAllNfcBadges} from '../services/NfcService.js';

/**
 * Insert NFC badges into the database
 */
function initBadges()
{
    return insertNfcBadges();
}

/**
 * Gets all the NFC badges - GET method
 * @param {*} req request
 * @param {*} res result
 */
function findAllNfc(req, res)
{
    return findAllNfcBadges(req, res);
}

export {initBadges, findAllNfc}