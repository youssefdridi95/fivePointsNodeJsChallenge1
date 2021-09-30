const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    todos: [{ type: Schema.Types.ObjectId, ref: 'todo'}]
    },
    {
        timestamps: true
    });

const userModel = mongoose.model('user', UserSchema);
module.exports = userModel;