const { DbUrl, DbName} = require('../config/constant');
const { MongoClient, ObjectID } = require('mongodb');

module.exports={
    // LayDanhSachVitheoID: async function (req, res) {   
    //     const id = req.query.id;
    //     console.log(id);//dung
    //     const client = new MongoClient(DbUrl);
    //     await client.connect();
    //     console.log('ket noi mongodb thanh cong');
    //     const col = client.db(DbName); // lay ten database
    //     const coluser = col.collection('TransactionHistory');
    //     const userA = await coluser.findOne({ _id: ObjectID(id) });
    //     console.log(userA);// null
    //     client.close();
    //     if (userA === null) {
    //         res.json({
    //             status: 'thatbai',
    //             message: 'Khong co user nay'
    //         })
    //     } else {
    //         res.json({
    //             status: 'thanhcong',
    //             message: 'Chúc mừng đăng nhập thành công ',
    //             data: userA
    //         })
    //     }
    // }
    LayDanhSachVitheoID: async function (req, res) {   
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
    }
    

}