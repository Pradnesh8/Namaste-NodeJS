const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    'fromUserId': {
        type: String,
        required: true
    },
    'toUserId': {
        type: String,
        required: true
    },
    'status': {
        type: String,
        enum: {
            values: ['interested', 'ignored', 'accepted', 'rejected'],
            message: '{VALUE} is not supported'
        }
    }
}, { timestamps: true })

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = { ConnectionRequest }