import {createNewUserAccount, userConnection} from '../services/UserService.js';

function  signUp(req, res) {
    return createNewUserAccount(req, res);
}

function signIn(req, res) {
    return userConnection(req, res);
}  

export {signUp, signIn};