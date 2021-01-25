//hàm MUA

const { DbUrl, DbName } = require('../config/constant');
const { MongoClient, ObjectID } = require('mongodb');

module.exports = {
    LayDanhSachBitcoinTheoKhachhangtrangchu: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBuyEx = db.collection('BuyExchanged');
        let allBuyEx = await colBuyEx.find({ isAccept: true }).toArray();
        
        console.log(allBuyEx);
        client.close();

        res.status(200).json({
            status: 'success',
            data: allBuyEx
        });
    },



    LayDanhSachBitcoinTheoadmin: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBuyEx = db.collection('BuyExchanged');
        let allBuyEx = await colBuyEx.find({}).toArray();
        
        console.log(allBuyEx);
        client.close();

        res.status(200).json({
            status: 'success',
            data: allBuyEx
        });
    },

    LayBitcoinTheoID2: async function (req, res) {

        const id = req.query.id3;
        console.log(id);
        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(DbName); // lay ten database
        const colsanpham = col.collection('BuyExchanged'); // dang mua (bán)
        const sp = await colsanpham.findOne({ _id: ObjectID(id) });
        
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

    MuaBitcoin: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let categoryThem = {

            tenBan: req.body.ten, //tên thang bán
            tenMua:req.body.Tenmua, //tên thang mua
            theLoaiTien:req.body.name, //tên the loai tien
            soLuong: req.body.Quantity, // quantity
            idThangMua:req.body.idThangMua, // Ban coin sua idThangBan 
            donGiaMua:req.body.Buyrate, // Ban coin sua Sellrate
            tienphaitra: req.body.tienphaitra, // 
            viTien:req.body.Amount, // Amount cua thang dang nhap
            trangThai:"mua"


        }
        console.log(categoryThem);
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('TransactionHistory');
        let result = await colCategory.insertOne(categoryThem);
        console.log(result);
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

    DangMuaCoin: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let dangMuaCoin = {
            idBan:req.body.idBan,
            name: req.body.name,
            Quantity: req.body.Quantity,
            Buyrate: req.body.Buyrate,
            // Tongtien: req.body.Tongtien(),
            ten:req.body.ten,
            Total: req.body.Total,
            isAccept: req.body.isAccept
        }
        console.log(dangMuaCoin);
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const dangban = db.collection('BuyExchanged');
        let result = await dangban.insertOne(dangMuaCoin);
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
    DuyetDangMua: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let BuyExchangedID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('BuyExchanged');
        let result = await colProduct.updateOne({ _id: ObjectID(BuyExchangedID) },
            { $set: { isAccept: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Duyệt sản phẩm thành công !'
        });

    },
    KhongDuyetDangMua: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let BuyExchangedID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('BuyExchanged');
        let result = await colProduct.updateOne({ _id: ObjectID(BuyExchangedID) },
            { $set: { isAccept:false } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Duyệt sản phẩm thành công !'
        });

    },
    
    XoaDangMua: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let id = req.query.id;


        console.log(id)
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('BuyExchanged');
        let result = await colCategory.deleteOne({ _id: ObjectID(id) });
        console.log(result);
    },
    SuaDangMua: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let categorySua = {
            id: req.body.id,
            BuyExchangedID: req.body.BuyExchangedID,
            status: req.body.status,
            Buyrate: req.body.Buyrate,
            Quantity:req.body.Quantity,
            Total: req.body.Total
        }
        console.log(categorySua);
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('BuyExchanged');
        let result = await colCategory.updateOne({ _id: ObjectID(categorySua.id) }, {
            $set: {
                BuyExchangedID: categorySua.BuyExchangedID,
                isAccept: categorySua.status,
                Buyrate: categorySua.Buyrate,
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
    LayDataDangMuaTheoID: async function (req, res) {
        const id = req.query.id;

        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(DbName); // lay ten database
        const colsanpham = col.collection('BuyExchanged');
        const sp = await colsanpham.findOne({ _id: ObjectID(id) });
        client.close();
        res.json({
            status: 'success',
            data: sp
        })
    },

    CapNhatMuaCoin: async function (req, res) {
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

    CapNhatSoluong : async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let UserID = req.query.id;
        let Quantity = req.body.Quantity;
        console.log(Quantity);
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('BuyExchanged');
        let result = await colProduct.updateOne({ idBan : UserID },
            { $set: { Quantity: Quantity } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Duyệt sản phẩm thành công !'
        });

    },
    
    
}