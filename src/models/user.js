import mongoose from 'mongoose';

var validateEmail = function(email) {
    var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return format.test(email);
}

var  userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: [validateEmail, "Please fill a valid email adress"]
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 32
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    sex: {
        type: Boolean,
        required: true
    },
    age: {
        type: Number,
        min: 0,
        max: 150,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

export default mongoose.model('User', userSchema);

 