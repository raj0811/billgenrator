const Invoice = require('../models/invoice');

module.exports.addData=function(req,res){
    return res.render('input')
}

module.exports.home=function(req,res){
    return res.render('home')
}


module.exports.insert= function(req,res){

    Invoice.create({
        productName: req.body.name,
        productDSIN: req.body.dsin,
        productPrice: req.body.price,
        productHSNCode: req.body.code,
        productGST: req.body.gst
    },function(err,newInvoice){
        if(err){
            console.log("err in creating invoice DB",err);
            return

        }

        console.log("invoice created",newInvoice);
        return res.redirect('back');


    });
   


}