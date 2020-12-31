import {insertNfcBadges, findAllNfcBadges} from '../services/NfcService.js';

function initBadges()
{
    return insertNfcBadges();
}

function findAllNfc(req, res)
{
    return findAllNfcBadges(req, res);
}

export {initBadges, findAllNfc}