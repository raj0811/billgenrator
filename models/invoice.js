const mongoose = require('mongoose');


const invoiceSchema = mongoose.Schema({
    productName:{
        type: String,
        require: true
    },
    productDSIN:{
        type: String,
        require: true
    },
    productPrice:{
        type: mongoose.Decimal128,
        require: true
    },
    productHSNCode:{
        type: Number,
        require: true
    },
    productGST:{
        type: mongoose.Decimal128,
        require: true
    },
   

},
{
    timestamps: true
})

const Invoice = mongoose.model('Invoice',invoiceSchema);

module.exports = Invoice