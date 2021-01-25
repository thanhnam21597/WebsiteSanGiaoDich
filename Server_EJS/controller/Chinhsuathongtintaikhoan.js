const { DbUrl, DbName} = require('../config/constant');
const { MongoClient, ObjectID } = require('mongodb');

module.exports={
    ChinhsuaThongtintaikhoanID: async function (req, res) {   
        const id = req.query.id;
        console.log(id);
        const client = new MongoClient(DbUrl);
        await client.connect();
        console.log('ket noi mongodb thanh cong');
        const col = client.db(DbName); // lay ten database
        const coluser = col.collection('AccountUser');
        const userA = await coluser.findOne({ _id: ObjectID(id) });
        console.log(userA);
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
    },
    ChinhSuaTaiKhoan: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let categorySua = {
            id: req.body.id,
            Name: req.body.Name,
            email: req.body.email,
            password: req.body.password,
            vaitro: req.body.vaitro
        }
        console.log(categorySua);
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('AccountUser');
        let result = await colCategory.updateOne({ _id: ObjectID(categorySua.id) }, {
            $set: {
                ten: categorySua.Name,
                email: categorySua.email,
                password: categorySua.password,
                vaitro: categorySua.vaitro
            }
        });

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });
    },
    

}