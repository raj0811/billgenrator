var pdf        = require('html-pdf');
var fs         = require('fs');
var option    = {format:'A4'};
const Invoice = require('../models/invoice');


const puppeteer= require('puppeteer')

// console.log(Invoice.count,"lll");
var billData = [{
    // billName:"",
    // billAddress:"",
    // billCity:"",
    // billPin:"",
    // billMail:"",
    // billPhone: "",
    // billGST:""

}]

var shipData =[{
    // shipName:"",
    // shipAddress:"",
    // shipCity:"",
    // shipPin:"",
    // shipMail:"",
    // shipPhone: "",
    // shipGST:""
}]

var productData=[{
    productName:"",
    productQty:'',
    productDiscount:'',
    productGST:'',
    productHNS:'',
    productPrice:''
}]

module.exports.home=function(req,res){

    console.log(productData);

    Invoice.find({},function(err,invoice){

        if(err){
            console.log("Error in finding DB",err);
        }

        return res.render('home',{
            title: "home",
            invoice_data: invoice,
            bill_data: billData,
            ship_data: shipData,
            product_data: productData
        })
    })
   
}

var gst=8;
var hns,price

module.exports.addData=function(req,res){

  Invoice.find({},function(err,invoice){

    for(let i of invoice){
        if(req.body.product_list == i.productName){
            console.log(i._id,"hiiii");
            gst=i.productGST
            hns=i.productHSNCode
            price=i.productPrice
        }
        
    }


billData.push({
    billName:req.body.billName,
    billAddress:req.body.billAddress,
    billCity:req.body.billCity,
    billPin:req.body.billPin,
    billMail:req.body.billMail,
    billPhone: req.body.billPhone,
    billGST: req.body.billGST
})

shipData.push({
    shipName:req.body.shipName,
    shipAddress:req.body.shipAddress,
    shipCity:req.body.shipCity,
    shipPin:req.body.shipPin,
    shipMail:req.body.shipMail,
    shipPhone: req.body.shipPhone,
    shipGST: req.body.shipGST
})
    // console.log(disc,"discount");
    // console.log(pname);
//    console.log(req.body.billName);
productData.push({
        productName:req.body.product_list,
        productQty:req.body.Qty,
        productDiscount:req.body.disc,
        productGST:gst,
        productHNS:hns,
        productPrice:price
    })

    console.log(productData,"tempdata");
    return res.redirect('back')
    
  })
    
//   console.log(disc);
//     // console.log(pname);
// //    console.log(req.body.billName);
// productData.push({
//         productName:req.body.product_list,
//         productQty:req.body.Qty,
//         productDiscount:req.body.disc
//     })
//     console.log(productData,"tempdata");
//     return res.redirect('back')
}

module.exports.genrateInvoice=function(req,res){


    
    Invoice.find({},function(err,invoice){
        for(let i of invoice){
            if(req.body.product_list == i.productName){
                // console.log(i._id,"hiiii");
                
            }
            
        }
        return res.render('genrate',{
            bill_data: billData,
            ship_data: shipData,
            product_data: productData,
            // discount:disc
    })
    })
   
}

module.exports.deleteItem=function(req,res){


    let id=req.query.id;
    let prodoctdelete = req.query.productDel
    // console.log(req.query.productName);
    let productIndex= productData.findIndex(product => product.productName == prodoctdelete);
    if(productIndex != -1){
        console.log("llll");
        productData.splice(productIndex,1)
    }
    return res.redirect('back')


}

module.exports.pdf = async function(req,res){

    const browser = await puppeteer.launch();

    const webpage = await browser.newPage();

    await webpage.goto('https://3.86.114.75/genrate',{
        waitUntil: "networkidle0"
    })


    await webpage.pdf({
        printBackground: true,
        displayHeaderFooter: false,
        path:"assets/webpage.pdf",
        format: "tabloid",
        landscape: true
    }).then(_=>{
        // return res.render('webpage.pdf')
        // window.alert("downloaded")
        console.log("Downloaded");
    }).catch(e=>{
        console.log(e);
    })

    await browser.close();
    return res.redirect('back')


}