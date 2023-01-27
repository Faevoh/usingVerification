const addBags = require("../models/addBags");

exports.newBags = async(req,res)=>{
    try{
       const created =  await addBags.create(req.body);
        res.status(201).json({
            message: "New Bag Added",
            data: created
        });
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};

exports.getAllBags = async(req,res)=>{
    try{
        const allBags = await addBags.find();
        res.status(201).json({
            message: "All Bags",
            length: allBags.length,
            data: allBags
        });    
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};

exports.deleteBags = async(req,res)=>{
    try{
        const productid = req.params.productid
        await addBags.findByIdAndDelete(productid);
        res.send  ("Successfully Deleted")
    }catch(e){
        res.status(404).json({
            message: e.message
        });
    }
};