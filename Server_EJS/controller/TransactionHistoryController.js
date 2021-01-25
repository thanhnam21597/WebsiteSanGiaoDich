const { DbUrl, DbName } = require('../config/constant');
const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');
const bcrypt = require('bcrypt');//thu vien
const jwt = require('jsonwebtoken');//token

module.exports = {
    //     LayDanhSachTransactionAll: async function (req, res) {
    //         const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    //         await client.connect();
    //         console.log("Connected correctly to server");
    //         const db = client.db(DbName);
    //         const colTransaction = db.collection('TransactionHistory');
    //         let allTransaction = await colTransaction.find().toArray();
    //         console.log(allTransaction);
    //         client.close();

    //         res.status(200).json({
    //             status: 'success',
    //             data: allTransaction
    //         });
    //     },
    //     XoaGiaoDich: async function (req, res) {
    //         const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    //         let id = req.query.id;


    //         console.log(id)
    //         await client.connect();
    //         console.log("Connected correctly to server");
    //         const db = client.db(DbName);
    //         const colCategory = db.collection('TransactionHistory');
    //         let result = await colCategory.deleteOne({ _id: ObjectId(id) });
    //         console.log(result);
    //     },
    LayDataGiaoDichTheoID: async function (req, res) {
        const id = req.query.id;

        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(DbName); // lay ten database
        const coldonhang = col.collection('TransactionHistory');
        const dsdh = await coldonhang.find({  idThangMua : id }).toArray();
        client.close();
        res.json({
            status: 'success',
            data: dsdh
        })
    },
    //     SuaGiaoDich: async function (req, res) {
    //         const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    //         let categorySua = {
    //             id: req.body.id,
    //             ten: req.body.ten,
    //             tenmua: req.body.tenmua,
    //             name: req.body.name,
    //             Quantity: req.body.Quantity,
    //             // status: req.body.status,
    //             Amount: req.body.Amount,
    //             Total:req.body.Total
    //         }
    //         console.log(categorySua);
    //         await client.connect();
    //         console.log("Connected correctly to server");
    //         const db = client.db(DbName);
    //         const colCategory = db.collection('TransactionHistory');
    //         let result = await colCategory.updateOne({ _id: ObjectId(categorySua.id) }, {
    //             $set: {
    //                 // SendTo: categorySua.SendTo,
    //                 // Rate: categorySua.Rate,
    //                 // Quantity: categorySua.Quantity,
    //                 // Total:categorySua.Total
    //                 id: categorySua.id,
    //                 ten: categorySua.ten,
    //                 tenmua: categorySua.tenmua,
    //                 name: categorySua.name,
    //                 Quantity: categorySua.Quantity,
    //                 // status: req.body.status,
    //                 Amount: categorySua.Amount,
    //                 Total:categorySua.Total
    //             }
    //         });

    //         client.close();

    //         res.status(200).json({
    //             status: 'success',
    //             message: 'Sửa thành công'
    //         });
    //     },
    //     ThemGiaoDich: async function (req, res) {
    //         const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    //         let categoryThem = {
    //             ten: req.body.ten,
    //             tenmua: req.body.tenmua,
    //             name: req.body.name,
    //             Quantity: req.body.Quantity,
    //             // status: req.body.status,
    //             Amount: req.body.Amount,
    //             Total:req.body.Total
    //         }

    //         await client.connect();
    //         console.log("Connected correctly to server");
    //         const db = client.db(DbName);
    //         const colCategory = db.collection('TransactionHistory');
    //         let result = await colCategory.insertOne(categoryThem);
    //         client.close();
    //         if (result.insertedCount > 0) {
    //             res.status(200).json({
    //                 status: 'success',
    //                 message: 'Thêm thành công'
    //             });
    //         } else {
    //             res.status(200).json({
    //                 status: 'fail',
    //                 message: 'Thêm thất bại!'
    //             })
    //         }
    //     },
}