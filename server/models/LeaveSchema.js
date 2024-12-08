//Leave Schema
// this is for apply leave (not for admin)

const mongoose = require('mongoose')
const {Schema} = mongoose

const LeaveSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    reason: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    reviewedAt: {
        type: Date,
        default: null
    },
    reviewComments: {
        type: String,
        default: ''
    },
    created_at: {
        type: Date,
        default: Date.now,
        immutable: true,
    }
})

const Leave = mongoose.model('leave', LeaveSchema)
module.exports = Leave