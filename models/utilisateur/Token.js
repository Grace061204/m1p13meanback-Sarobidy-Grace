const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {type: String, required: true},
    cle: {type: String, required: true},
    dateCreation: { 
        type: Date, 
        default: Date.now 
    },
    dateExpiration: {
        type: Date,
        default: function () {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        }
    },
}, { timestamps: true });
module.exports = mongoose.model('token', tokenSchema);