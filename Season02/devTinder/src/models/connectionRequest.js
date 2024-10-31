const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: String,
        ref: "user",// this builds the relation with other mongoose model 
        required: true
    },
    toUserId: {
        type: String,
        ref: "user",
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ['interested', 'ignored', 'accepted', 'rejected'],
            message: '{VALUE} is not supported'
        }
    }
}, { timestamps: true })

// Compound indexes
connectionRequestSchema.index({
    fromUserId: 1, toUserId: 1
})

// DEMO pre middleware for validation in model
connectionRequestSchema.pre('save', function (next) {
    const connectionRequest = this;
    console.log('req', connectionRequest)
    if (connectionRequest.fromUserId == connectionRequest.toUserId) {
        throw new Error("Invalid Connection Request, Can't send connection to yourself.")
    }
    next();
})

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = { ConnectionRequest }