//hàm bán
const { DbUrl, DbName, soItemMoiPageAdmin, soItemMoiPage, soItemMoiPageCategory } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');

module.exports={
    LayDanhSachALL_SellExchange: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true }); // ket noi mongo

        await client.connect(); // 
        console.log("Connected correctly to server");
        const db = client.db(DbName); // ten banag
        const colSell = db.collection('SellExchanged'); // ten collection
        let allSell = await colSell.find({}).toArray(); // tao thanh 1 mang // allsell 1 mang SellExchange
        console.log(allSell);
        client.close();

        res.status(200).json({
            //no lay du lieu truyen sang client
            status: 'success',
            data: allSell
        });
    },
   
    
    LayDanhSachSellAllAdmin: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colSell = db.collection('SellExchanged');
        let allSell = await colSell.find().toArray();
        console.log(allSell);
        client.close();

        res.status(200).json({
            status: 'success',
            data: allSell
        });
        
    },
    DangBanCoin: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let dangBanCoin = {
            idThangBan:req.body.idThangBan,
            name: req.body.name,
            Quantity: req.body.Quantity,
            Sellrate:req.body.Sellrate,
            // Tongtien: req.body.Tongtien(),
            ten:req.body.ten,
            Total: req.body.Total,
            isAccept: req.body.isAccept
            
        }
        console.log(dangBanCoin);
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const dangban = db.collection('SellExchanged');
        let result = await dangban.insertOne(dangBanCoin);
        client.close();
        if (result.insertedCount > 0) {
            res.status(200).json({
                status: 'thanhcong',
                message: 'Thêm thành công'
            });
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Thêm thất bại!'
            })
        }
    },
    //bán coin
    LayBitcoinTheoIDBan: async function (req, res) {

        const id = req.query.id1;
        console.log(id);
        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(DbName); // lay ten database
        const colsanpham = col.collection('SellExchanged');
        const sp = await colsanpham.findOne({ _id: ObjectId(id) });
        client.close();
        if (sp === null) {
            res.json({
                status: 'thatbai'
            })
        } else {
            res.json({
                status: 'thanhcong',
                data: sp
            })
        }
    },
    BanCoin: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let categoryThem = {
            tenMua: req.body.ten,

            theLoaiTien: req.body.name,
            tenBan:req.body.Tenban,
            soLuong: req.body.Quantity,
            idThangMua:req.body.idThangMua,
            donGiaMua:req.body.Sellrate,
            tienphaitra: req.body.tienphaitra,
            trangThai:"bán",
            viTien:req.body.Amount

        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('TransactionHistory');
        let result = await colCategory.insertOne(categoryThem);
        client.close();
        if (result.insertedCount > 0) {
            res.status(200).json({
                status: 'thanhcong',
                message: 'Thêm thành công'
            });
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Thêm thất bại!'
            })
        }
    },
    DuyetDangBan: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let SellExchangedID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('SellExchanged');
        let result = await colProduct.updateOne({ _id: ObjectId(SellExchangedID) },
            { $set: { isAccept: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Duyệt sản phẩm thành công !'
        });

    },
    KhongDuyetDangBan: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let SellExchangedID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('SellExchanged');
        let result = await colProduct.updateOne({ _id: ObjectId(SellExchangedID) },
            { $set: { isAccept:false } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Duyệt sản phẩm thành công !'
        });

    },
    XoaDangBan: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let id = req.query.id;


        console.log(id)
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('SellExchanged');
        let result = await colCategory.deleteOne({ _id: ObjectId(id) });
        console.log(result);
    },
    SuaDangBan: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let categorySua = {
            id: req.body.id,
            SellExchangedID: req.body.SellExchangedID,
            status: req.body.status,
            Sellrate: req.body.Sellrate,
            Quantity:req.body.Quantity,
            Total: req.body.Total
        }
        console.log(categorySua);
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('SellExchanged');
        let result = await colCategory.updateOne({ _id: ObjectId(categorySua.id) }, {
            $set: {
                SellExchangedID: categorySua.SellExchangedID,
                isAccept: categorySua.status,
                Sellrate: categorySua.Sellrate,
                Quantity:categorySua.Quantity,
                Total: categorySua.Total
            }
        });

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });
    },
    LayDataDangBanTheoID: async function (req, res) {
        const id = req.query.id;

        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(DbName); // lay ten database
        const colsanpham = col.collection('SellExchanged');
        const sp = await colsanpham.findOne({ _id: ObjectId(id) });
        client.close();
        res.json({
            status: 'success',
            data: sp
        })
    },
    CapNhatBanCoin: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let UserID = req.query.id;
        let Amount = req.body.Amount;
        console.log(Amount);
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('AccountUser');
        let result = await colProduct.updateOne({ _id: ObjectID(UserID) },
            { $set: { Amount: Amount } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Duyệt sản phẩm thành công !'
        });

    },
    CapNhatSoluongBan : async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let UserID = req.query.id;
        let Quantity = req.body.Quantity;
        console.log(Quantity);
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('SellExchanged');
        let result = await colProduct.updateOne({ idBan : UserID },
            { $set: { Quantity: Quantity } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Duyệt sản phẩm thành công !'
        });

    },
   
    

}