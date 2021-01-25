const { DbUrl, DbName } = require('../config/constant');
const { MongoClient, ObjectId } = require('mongodb');
const assert = require('assert');
const bcrypt = require('bcrypt');//thu vien
const jwt = require('jsonwebtoken');//token

module.exports = {
    LayDanhSachKhachhang: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBuyEx = db.collection('Customer');
        let allBuyEx = await colBuyEx.find({}).toArray();
        console.log(allBuyEx);
        client.close();

        res.status(200).json({
            status: 'success',
            data: allBuyEx
        });
    },
    XoaKhachHang: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let id = req.query.id;


        console.log(id)
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('AccountUser');
        let result = await colCategory.deleteOne({ _id: ObjectId(id) });
        console.log(result);
    },
    LayDataKhachHangTheoID: async function (req, res) {
        const id = req.query.id;

        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(DbName); // lay ten database
        const colsanpham = col.collection('Customer');
        const sp = await colsanpham.findOne({ _id: ObjectId(id) });
        client.close();
        res.json({
            status: 'success',
            data: sp
        })
    },
    SuaKhachHang: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let categorySua = {
            id: req.body.id,
            Email: req.body.Email,
            Name: req.body.Name,
            PhoneNum: req.body.PhoneNum,
        }
        console.log(categorySua);
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('Customer');
        let result = await colCategory.updateOne({ _id: ObjectId(categorySua.id) }, {
            $set: {
                Email: categorySua.Email,
                Name: categorySua.Name,
                PhoneNum: categorySua.PhoneNum,
                
            }
        });

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });
    },
    ThemKhachHang: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let categoryThem = {

            Email: req.body.Name,
            Name: req.body.NameType,
            PhoneNum: req.body.AmountCode,
         

        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('Customer');
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