const { DbUrl, DbName } = require('../config/constant');
const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');
const bcrypt = require('bcrypt');//thu vien
const jwt = require('jsonwebtoken');//token

module.exports = {
    LayDanhSachTransactionAll: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colTransaction = db.collection('TransactionHistory');
        let allTransaction = await colTransaction.find().toArray();
        console.log(allTransaction);
        client.close();

        res.status(200).json({
            status: 'success',
            data: allTransaction
        });
    },
    XoaGiaoDich: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let id = req.query.id;


        console.log(id)
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('TransactionHistory');
        let result = await colCategory.deleteOne({ _id: ObjectID(id) });
        console.log(result);
    },
    LayDataGiaoDichTheoIDAdmin: async function (req, res) {
        const id = req.query.id;

        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(DbName); // lay ten database
        const coldonhang = col.collection('TransactionHistory');
        // const dsdh = await coldonhang.find({ idThangMua: id }).toArray();
        const dsdh = await coldonhang.findOne({ _id: ObjectID(id) });
        client.close();
        res.json({
            status: 'success',
            data: dsdh
        })
    },
    SuaGiaoDich: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let categorySua = {
            id: req.body.id,
            tenBan: req.body.tenBan,
            tenMua: req.body.tenMua,
            theLoaiTien: req.body.theLoaiTien,
            soLuong: req.body.soLuong,
            trangThai: req.body.trangThai,
            viTien: req.body.viTien,
            tongMua: req.body.tongMua,

        }
        console.log(categorySua);
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('TransactionHistory');
        let result = await colCategory.updateOne({ _id: ObjectID(categorySua.id) }, {
            $set: {
                id: categorySua.id,

                tenBan: categorySua.tenBan,
                tenMua: categorySua.tenMua,
                theLoaiTien: category.theLoaiTien,
                soLuong: categorySua.soLuong,
                trangThai: categorySua.trangThai,
                viTien: categorySua.viTien,
                tongMua: categorySua.tongMua,
    


            }
        });

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });
    },
    ThemGiaoDich: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let categoryThem = {
            tenBan: req.body.tenBan,
            tenMua: req.body.tenMua,
            theLoaiTien: req.body.theLoaiTien,
            soLuong: req.body.soLuong,
            trangThai: req.body.trangThai,
            viTien: req.body.viTien,
            tongMua: req.body.tongMua,
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('TransactionHistory');
        let result = await colCategory.insertOne(categoryThem);
        client.close();
        if (result.insertedCount > 0) {
            res.status(200).json({
                status: 'success',
                message: 'Thêm thành công'
            });
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Thêm thất bại!'
            })
        }
    },
}