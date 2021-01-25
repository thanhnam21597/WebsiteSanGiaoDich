const { DbUrl, DbName } = require('../config/constant');
const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');
const bcrypt = require('bcrypt');//thu vien
const jwt = require('jsonwebtoken');//token

module.exports = {
    LayDanhSachTaiKhoan: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBuyEx = db.collection('AccountUser');
        let allBuyEx = await colBuyEx.find({}).toArray();
        console.log(allBuyEx);
        client.close();

        res.status(200).json({
            status: 'success',
            data: allBuyEx
        });
    },

    ThemUser: async function (req, res) {
        let NguoiDung1 = {
            ten: req.body.ten,
            taikhoan: {
                email: req.body.email,
                password: req.body.password
            },
            vaitro: 2
        }
        const saltRounds = 10;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection('AccountUser');
        const allUser = await colUser.find({}).toArray();
        let trungTaiKhoan = false;
        for (let index = 0; index < allUser.length; index++) {
            if (allUser[index].taikhoan.email === NguoiDung1.taikhoan.email) {
                trungTaiKhoan = true;
                break;
            }
        }

        let result;

        if (trungTaiKhoan === false) {
            bcrypt.hash(NguoiDung1.taikhoan.password, saltRounds, async function (err, hash) {
                NguoiDung1.taikhoan.password = hash;
                result = await colUser.insertOne(NguoiDung1);
                client.close();
                if (result.insertedCount > 0) {
                    res.status(200).json({
                        status: 'successs',
                        message: 'Thêm user thành công',
                    })
                } else {
                    res.status(300).json({
                        status: 'thatbai',
                        message: 'Thêm user thất bại',
                    });
                }

            });
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'Email này đã tồn tại. Vui lòng chọn email khác để đăng ký tài khoản',
            })
        }
    },
    KiemTraAccount: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        var tenTaiKhoan = req.body.email;
        var matKhau = req.body.password;

        console.log(tenTaiKhoan);
        console.log(matKhau);

        await client.connect(async function (error, client) {//callback kiem soat bat dong bo
            assert.equal(null, error);
            console.log("Connected correctly to server");
            /**
             * TODO : NguoiDung là 1 collection(bảng) của mongodb
             */
            const col = client.db(DbName).collection("AccountUser");

            var resultUser = await col.find({ "taikhoan.email": tenTaiKhoan }).next();

            if (resultUser === null) {
                res.status(200).json({
                    status: 'fail',
                    message: 'Tài khoản không tồnd tại'
                });
            } else {

                bcrypt.compare(matKhau, resultUser.taikhoan.password, function (err, result) {

                    if (result === true) {
                        var secretKey = 'namjustin1';

                        var payload = {
                            userID: resultUser._id,
                            vaiTro: resultUser.vaitro,
                            Amount : resultUser.Amount,
                            TenNguoiDung:resultUser.ten
                        };

                        //7 ngày hết hạn token
                        var token = jwt.sign({ payload }, secretKey, { expiresIn: 60 * 1220 * 14 });
                        console.log(JSON.stringify(payload));
                        res.status(200).json({
                            status: 'thanhcong',
                            //message: 'Chức mửng đăng nhập thành công ^^',
                            data: payload
                        });
                    } else {
                        res.status(200).json({
                            status: "thatbai",
                            message: "Tài khoản hoặc mật khẩu không hợp lệ",
                        });
                    }
                })

            }
        });
    },

    KiemTraTokenAdmin: async function (req, res, next) {
        var token = req.header('token');
        let resultToken = await jwt.verify(token, 'namjustin1');
        if (resultToken.payload.vaiTro === 0) {
            res.status(200).json({
                status: "thanhcong",
                message: 'Token hợp lệ',
            });
        } else {
            res.status(200).json({
                status: "fail",
                message: 'Token không hợp lệ !',
            });
        }
    },

    KiemTraTokenChuShop: function (req, res, next) {
        var token = req.header('token');
        jwt.verify(token, 'namjustin1', function (err, payload) {
            if (payload.payload.vaiTro === 1) {
                res.status(200).json({
                    status: "thanhcong",
                    message: 'Token hợp lệ',
                });
                next();
            } else {
                res.status(200).json({
                    status: "fail",
                    message: 'Token không hợp lệ !',
                });
            }
        });
    },

    KiemTraTokenNormal: function (req, res, next) {
        var token = req.header('token');
        jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
            if (payload.payload.vaiTro === 2) {
                next();
            } else {
                res.status(200).json({
                    status: "fail",
                    message: 'Token không hợp lệ !',
                });
            }
        });
    },
    LayThongTinMotUserTheoID: async function (req, res) {
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
    XoaTaiKhoan: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let id = req.query.id;


        console.log(id)
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('AccountUser');
        let result = await colCategory.deleteOne({ _id: ObjectID(id) });
        console.log(result);
    },
    SuaTaiKhoan: async function (req, res) {
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