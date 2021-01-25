var express = require('express');
var router = express.Router();



const SellExchangesController=require('../controller/Sell_ExchangeController');
const Bitcoin_Controller =require('../controller/Bitcoin_Controller');
const AuthController = require('../controller/authoController');
const WalletController =require('../controller/ThongtinViController');
const authoController = require('../controller/authoController');
const TransactionHistoryController=require('../controller/TransactionHistoryController');
const CustomerController=require('../controller/CustomerController');
const NapTienController = require ('../controller/NapTienController');
const GiaoDichAdminController = require('../controller/GiaodichadminController');
const { route } = require('.');
const GiaodichadminController = require('../controller/GiaodichadminController');
const RutTienController = require('../controller/RutTienController');
const ChinhSuaThongtintaikhoanController = require('../controller/Chinhsuathongtintaikhoan')
//const DangKyController = require('../controller/DangkiController');



                        //-------------CHUNG---------------------------



// Phần xử lý Bán  Database SellExchanged_Controller
router.get('/danhsachbancoin',SellExchangesController.LayDanhSachALL_SellExchange); // dang ban
router.get('/danhsachbancoin1',SellExchangesController.LayDanhSachALL_SellExchange);
router.get('/manage-sellexchange', SellExchangesController.LayDanhSachSellAllAdmin);
//HÀM BÁN coin
router.get('/danhsachChitietbancoin',SellExchangesController.LayBitcoinTheoIDBan); 
router.post('/bancoin', SellExchangesController.BanCoin);


// Phần xử lý  MUA  Database Buy_Exchange
router.get('/danhsachmuaCoin',Bitcoin_Controller.LayDanhSachBitcoinTheoKhachhangtrangchu);
//hàm mua coin
router.get('/danhsachbitcoin2',Bitcoin_Controller.LayBitcoinTheoID2); // lay id thang ban
router.post('/muabitcoin', Bitcoin_Controller.MuaBitcoin);

//hàm duyệt
// router.put('/Dangmua-duyet', Bitcoin_Controller.DuyetDangMua);

 //Đăng nhập-đăng kí
router.post('/dangky', AuthController.ThemUser);
router.post('/dangnhap', AuthController.KiemTraAccount);
router.get('/users-item', AuthController.LayThongTinMotUserTheoID); //


                    //--------------------CUSTOMER---------------------------
//thong tin vi
router.get('/thongtinvi',WalletController.LayDanhSachVitheoID);
//dang bán coin
router.post('/dangbanCoin',SellExchangesController.DangBanCoin); // dang ban
//đăng mua coin
router.post('/dangmuaCoin',Bitcoin_Controller.DangMuaCoin);
//Lich su giao dich
router.get('/laygiaodichtheo',TransactionHistoryController.LayDataGiaoDichTheoID);

//chỉnh sửa thông tin khách Hàng
router.get('/LayThongtinTaiKhoanID',ChinhSuaThongtintaikhoanController.ChinhsuaThongtintaikhoanID);
router.put('/ChinhsuataikhoanID',ChinhSuaThongtintaikhoanController.ChinhSuaTaiKhoan);





                    //----------------------Quản lý---------------------------    
//Bán Bitcoin        
router.get('/quanlydangban',SellExchangesController.LayDanhSachALL_SellExchange);
router.get('/laydangbantheo',SellExchangesController.LayDataDangBanTheoID);
router.put('/suadangban',SellExchangesController.SuaDangBan);
router.delete('/xoadangban',SellExchangesController.XoaDangBan);
router.put('/Dangban-duyet', SellExchangesController.DuyetDangBan);
router.put('/Dangban-khongduyet', SellExchangesController.KhongDuyetDangBan);

//cập nhật ví tiền khách hàng bán
router.put('/CapNhatvitienbankhachhangban', SellExchangesController.CapNhatBanCoin);

//cập nhật ví tiền số lượng khách hàng bán
router.put('/SoLuongSauBan', SellExchangesController.CapNhatSoluongBan);

// mua bitcoin
router.get('/danhsachbitcoin',Bitcoin_Controller.LayDanhSachBitcoinTheoadmin);
router.get('/laydangmuatheo',Bitcoin_Controller.LayDataDangMuaTheoID);
router.put('/suadangmua',Bitcoin_Controller.SuaDangMua);
router.delete('/xoadangmua',Bitcoin_Controller.XoaDangMua);
router.put('/Dangmua-duyet', Bitcoin_Controller.DuyetDangMua);
router.put('/Dangmua-khongduyet', Bitcoin_Controller.KhongDuyetDangMua);

//cập nhật ví tiền khách hàng mua
router.put('/CapNhatvitienmuakhachhang', Bitcoin_Controller.CapNhatMuaCoin);

//capnhatsoluongkhimua
router.put('/SoLuongSauMua',Bitcoin_Controller.CapNhatSoluong);

// Phần xử lý Database Account
router.get('/quanlitaikhoan',authoController.LayDanhSachTaiKhoan)
router.get('/laytaikhoantheo',authoController.LayThongTinMotUserTheoID);
router.put('/suataikhoan',authoController.SuaTaiKhoan);
router.delete('/xoataikhoan',authoController.XoaTaiKhoan);

// Phần xử lý Database Customer
router.get('/thongtinkhachhang',CustomerController.LayDanhSachKhachhang);
router.get('/laykhachhangtheo',CustomerController.LayDataKhachHangTheoID);
router.put('/suakhachhang',CustomerController.SuaKhachHang);
router.delete('/xoakhachhang',CustomerController.XoaKhachHang);
router.post('/themkhachhang',CustomerController.ThemKhachHang);

// Phần xử lý Lich su giao dich
router.get('/laygiaodichtheo',TransactionHistoryController.LayDataGiaoDichTheoID);

//Phần xử lý Quan3 ly1 giao dich
// router.get('/laygiaodichtheo',TransactionHistoryController.LayDataGiaoDichTheoID);
router.get('/manage-transaction',GiaodichadminController.LayDanhSachTransactionAll);
router.get('/LaydatagiaodichtheoIDADmin',GiaoDichAdminController.LayDataGiaoDichTheoIDAdmin);
router.put('/suagiaodich',GiaoDichAdminController.SuaGiaoDich);
router.delete('/xoagiaodich',GiaoDichAdminController.XoaGiaoDich);
router.post('/themgiaodich',GiaoDichAdminController.ThemGiaoDich);

//NapTien
router.get('/naptien',NapTienController.LayDanhSachNapTien);
router.put('/NapTienDuyet', NapTienController.DuyetNapTien);
router.get('/laythongtinchitietnapID',NapTienController.LayChiTietTienTheoID);

//Rút tiền
//NapTien
router.get('/RutTien',RutTienController.LayDanhSachRutTien);
router.put('/RutTienDuyet', RutTienController.DuyetRutTien);
router.get('/laythongtinchitietRutTienID',RutTienController.LayChiTietRutTienTheoID);



module.exports = router;
