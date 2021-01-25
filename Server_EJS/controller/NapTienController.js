const { DbUrl, DbName } = require('../config/constant');
const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');
const bcrypt = require('bcrypt');//thu vien
const jwt = require('jsonwebtoken');//token

module.exports = {
    LayDanhSachNapTien: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBuyEx = db.collection('AccountUser');
        let allBuyEx = await colBuyEx.find({vaitro : 2}).toArray();
        console.log(allBuyEx);
        client.close();

        res.status(200).json({
            status: 'success',
            data: allBuyEx
        });
    },
    DuyetNapTien: async function (req, res) {
        let id= req.query.id;
        let tongtien = parseInt(req.body.TienNap); // TienNap sai 3900
        console.log("tong tien can nap"+tongtien);
        console.log("idkhach hang nap tien : "+id);
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        
        
        await client.connect();
       
        
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('AccountUser');

        let result = await colProduct.updateOne({_id:ObjectID(id)},{ $set:{Amount: tongtien}});//amount1 là total
        console.log(result);
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Duyệt nạp tiền thành công !'
        });

    },
    LayChiTietTienTheoID: async function (req, res) {   
        const id = req.query.id;
        console.log(id); // dung
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(DbName); // lay ten database
        const coluser = col.collection('AccountUser');
        const userA = await coluser.findOne({ _id: ObjectID(id) });
        console.log("nguoi dung can nap tien "+userA);
        client.close();
        if (userA === null) {
            res.json({
                status: 'thatbai',
                message: 'Khong co user nay'
            })
        } else {
            res.json({
                status: 'thanhcong',
                message: 'Chúc mừng đăng nhập thành công ',
                data: userA
            })
        }
    }
}