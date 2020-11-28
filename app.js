import express from 'express';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import user, {default as User} from './src/model/user.js';

const app = express();

export default app.listen(8080, () =>
{
    console.log("server is running");
});


mongoose.connect('mongodb://localhost:27017/iot-2a', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection
.on('error', console.error.bind(console, 'Erreur de connection :'))
.once('open', function() {
    console.log("Connecté à Mongoose");
});


app.use(bodyParser.json());

app.get('/users', async (req, res) => {

    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.json({message: err})
    }

});

app.post('/sign-up', (req, res) => {

    if(emailAlreadyExist(req.body.email) == true) {
        res.json({message :"The email already exist"});
        throw "The email already exist";
    }

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
        res.status(200).json({message: "L'utilisateur " + req.body.firstName + " " + req.body.lastName + " a bien été ajouté"})
    })
    .catch(err => {
        res.json({message :err})
    })
    

});

function emailAlreadyExist(email) {
    return User.findOne({email: email}).then(function(result) {
        return result != null;
    });
}

app.post('/sign-in', (req, res) => {

        User.findOne({email: req.body.email}, function(err, specificUser) {

            if(specificUser == null) {
                res.status(404).json({message: "The user ( " + req.body.email + ") does not exist."});
            }
            else {

                if(specificUser.password == req.body.password) {
                    res.status(200).json({message: "The user ( " + req.body.email + ") is well authenticated."});
                }
                else {
                    res.json({message: "The password is wrong."})
                    //throw "The password is wrong";
                }
            }
            
        });
});
