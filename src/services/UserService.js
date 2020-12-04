import User from '../models/user.js';

function createNewUserAccount(req, res) {

    emailAlreadyExist(req.body.email).then(function(alreadyExist) {

        if(alreadyExist == true) {
            res.json({message :"The email already exist."});
            console.log("The email already exist.");
            //throw "The email already exist";
        }
        else {
            const user = new User({
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                sex: req.body.sex,
                age: req.body.age,
                adress: req.body.adress,
                city: req.body.city,
                country: req.body.country
            });
        
            user.save().then(data => {
                res.status(201).json({message: "L'utilisateur " + req.body.firstName + " " + req.body.lastName + " (" + req.body.email + ") a bien été ajouté."});
                console.log("L'utilisateur " + req.body.firstName + " " + req.body.lastName + " (" + req.body.email + ") a bien été ajouté.");
            })
            .catch(err => {
                res.json({message :err});
            })

        }

    })
}

function userConnection(req, res) {
    User.findOne({email: req.body.email}, function(err, specificUser) {

        if(specificUser == null) {
            res.status(404).json({message: "The user ( " + req.body.email + ") does not exist."});
            console.log("The user ( " + req.body.email + ") does not exist.");
            
        }
        else {

            if(specificUser.password == req.body.password) {
                res.status(200).json({message: "The user ( " + req.body.email + ") is well authenticated."});
                console.log("The user ( " + req.body.email + ") is well authenticated.");

            }
            else {
                res.json({message: "The password is wrong."})
                console.log("The password is wrong.");
                //throw "The password is wrong";
            }
        }
        
    });
}


function emailAlreadyExist(email) {
    return User.findOne({email: email}).then(function(result) {
        return result != null;
    });
}

export {createNewUserAccount, userConnection};