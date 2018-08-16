const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        unique: [true, 'valid number required'],
        required: [true, 'field should not be empty'],
        match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please enter a valid mobile number"]
    },
    email: {
        type: String,
        unique:[true, 'email already exists!'],
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address"
          ] 
    },
    password: {
        type: String,
        required: true,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
        "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"]
    }

});

const Data = mongoose.model('ths',FormSchema,'thsdata');

module.exports = Data;