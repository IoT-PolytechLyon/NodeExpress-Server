import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {default as User} from './src/models/user.js';

const Schema = mongoose.Schema;

//import {default as ConnectedDevice} from './src/models/connectedDevice.js';


// const ConnectedDeviceSchema = new Schema({
//     name: String,
//     description: String,
//     router: String,
//     state: 
//     {
//         pir_state:
//         {
//             detected_something: Boolean
//         },
//         nfc_state:
//         {
//             is_activated: Boolean
//         },
//         led_state:
//         {
//             is_on: Boolean,
//             red_value: Number,
//             green_value: Number,
//             blue_value: Number
//         }
//     }
// })

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

const connectedDeviceSchema = new Schema({
    name: String,
    description: String,
    router: String,
    state: 
    {
        pir_state:
        {
            detected_something: Boolean
        },
        nfc_state:
        {
            is_activated: Boolean
        },
        led_state:
        {
            is_on: Boolean,
            red_value: Number,
            green_value: Number,
            blue_value: Number
        }
    }
})

 let connectedDeviceModel = mongoose.model('ConnectedDevice', connectedDeviceSchema);

const createConnectedDevice = () =>
{
    let esp32 = new connectedDeviceModel
    ({
        name:'connectedDevice',
        description:'that device links one esp32 microCPU with 1 NFC reader, 1 motion sensor and 3 LEDs.',
        router:'192.168.0.19',
        state:
        {
            pir_state:
            {
                detected_something:false
            },
            nfc_state:
            {
                is_activated: false
            },
            led_state:
            {
                is_on: false,
                red_value: 12,
                green_value: 120,
                blue_value: 130
            }
        }
    });

//     esp32.save( (err) =>
//     {
//         if(err)
//         {
//             //console.log("could note save : ", err);
//             return handleError(err);
//         }
//     })

    esp32.save( function(err)
    {
        console.log("in sve");
        if(err)
        {
            console.log(err);
            return err;
        }
    });
}



app.get('/connected-devices', (req,res) => {
    res.send("Enregistrement de l'esp32")
    createConnectedDevice();
    console.log("enregistré");
})

app.listen(8081, () =>
{
    console.log("Server is running");
    //console.log(ConnectedDevice);
});


app.get('/users', async (req, res) => {

    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.json({message: err});
    }

});

app.post('/sign-up', (req, res) => {

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
                res.status(200).json({message: "L'utilisateur " + req.body.firstName + " " + req.body.lastName + " (" + req.body.email + ") a bien été ajouté."});
                console.log("L'utilisateur " + req.body.firstName + " " + req.body.lastName + " (" + req.body.email + ") a bien été ajouté.");
            })
            .catch(err => {
                res.json({message :err});
            })

        }

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
});

