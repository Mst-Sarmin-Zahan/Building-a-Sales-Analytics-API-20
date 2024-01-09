const SalesModel = require("../models/SalesModel");

// Create

exports.createSalesList = async (req, res) => {
    try {
        const reqBody = req.body;
        const data = await SalesModel.create(reqBody);
        res.status(200).json({ status: "Success", data: data });
    } catch (err) {
        res.status(400).json({ status: "fail", data: err.message || err });
    }
};


//Read
exports.ReadSalesList = async (req, res) => {
    try {
        const query ={};

        const data = await SalesModel.find(query);
        res.status(200).json({ status: "Success", data: data });
    } catch (err) {
        res.status(400).json({ status: "fail", data: err.message || err });
    }
};

//Read by ID
exports.ReadByID = async (req, res) => {
    try {
        const id = req.params.id;
        let query = {_id:id};
        const data = await SalesModel.find(query);
        res.status(200).json({ status: "Success", data: data });
    } catch (err) {
        res.status(400).json({ status: "fail", data: err.message || err });
    }
};


//Delete

/*exports.deleteStudentList = async (req, res) => {
    try {
        const id = req.params.id;
        const query = {_id:id};
        const data = await studentModel.deleteOne(query);
        res.status(200).json({ status: "Success", data: data });
    } catch (err) {
        res.status(400).json({ status: "fail", data: err.message || err });
    }
};*/

exports.deleteSalesList = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: id };
        const result = await SalesModel.deleteOne(query);

        if (result.deletedCount === 1) {
            res.status(200).json({ status: "Success", message: "Sales List deleted successfully" });
        } else {
            res.status(404).json({ status: "fail", message: "Sales List not found" });
        }
    } catch (err) {
        res.status(500).json({ status: "fail", message: err.message || err });
    }
};

//Update
exports.updateSalesList = async (req, res) => {
    try {
        const id = req.params.id;
        const query = {_id:id};
        const reqBody = req.body;
        const data = await SalesModel.updateOne(query,reqBody);
        res.status(200).json({ status: "Success", data: data });
    } catch (err) {
        res.status(400).json({ status: "fail", data: err.message || err });
    }
};


