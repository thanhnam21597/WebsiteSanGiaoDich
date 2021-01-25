import React, { Fragment, Suspense } from 'react';

import '../src/styles/layout.css';

import {   TrangChu,   DangKy,
  DulieuthitruongA,danhsachBancoin,danhsachMuacoin,DangNhap
} from '../src/components/allJS';

import { Switch, Route, } from "react-router-dom";

import{ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

 //--------------------CUSTOMER---------------------------
import{DangmuaCoin,thongtinvi,DangbanBitcoin,MuaCoin,NapTien,BanCoin,Lichsugiaodich,RutTien,
  ChinhSuaTaiKhoan

}from '../src/components/allJS';

 //----------------------ADMIN---------------------------  
import{QuanLytaikhoan,QuanLyKhachHang,QuanLyDangMua,QuanLyDangBan,QuanLyGiaoDich


}from '../src/components/allJS';



function App() {

  return (
    <Fragment>
      <ToastContainer></ToastContainer>
    <Switch>
      <Suspense>
      <Route exact path="/" component={TrangChu}></Route>
     

      {/*  //--------------------CUSTOMER--------------------------- */}

      <Route path= "/thongtinvi" component={thongtinvi}></Route>
      <Route path= "/dangbancoin" component={DangbanBitcoin}></Route>
      <Route path= "/dangmuaCoin" component={DangmuaCoin}></Route>
     
      <Route path="/getbitcoin/:id/:idBan" component={MuaCoin}></Route>
      <Route path="/BanCoin/:id" component={BanCoin}></Route>
      <Route path="/LayThongtinTaiKhoanID" component={ChinhSuaTaiKhoan}></Route>
    

      {/*  //--------------------CHUNG---------------------------  */}
      <Route path="/DulieuthitruongA" component={DulieuthitruongA}></Route>
      <Route path="/Dangky" component={DangKy}></Route>
      <Route path="/Dangnhap" component={DangNhap}></Route>
      <Route path="/danhsachbancoin" component={danhsachBancoin}></Route>
      <Route path="/danhsachmuaCoin" component={danhsachMuacoin}></Route>
      <Route path="/laygiaodichtheo" component={Lichsugiaodich}></Route>
     
      

      {/*  //----------------------ADMIN---------------------------   */}
      <Route path="/quanlitaikhoan" component={QuanLytaikhoan}></Route>
      <Route path="/thongtinkhachhang" component={QuanLyKhachHang}></Route>
      <Route path="/manage-transaction" component={QuanLyGiaoDich}></Route>
      <Route path="/danhsachbitcoin" component={QuanLyDangMua}></Route>
      <Route path="/quanlydangban" component={QuanLyDangBan}></Route>
      <Route path= "/naptien" component={NapTien}></Route>
      <Route path= "/RutTien" component={RutTien}></Route>
   

      </Suspense>
    </Switch>
    
  </Fragment>
  );
}

export default App;
