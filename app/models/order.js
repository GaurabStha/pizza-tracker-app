const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type: Object,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    paymentType: {
        type: String,
        default: 'Cash on delivery'
    },
    Status: {
        type: String,
        default: 'Order placed'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);