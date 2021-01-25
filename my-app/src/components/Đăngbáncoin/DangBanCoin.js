import React, { Fragment, useState, useEffect } from 'react';
import { Menutrangchu, Footertrangchu, } from '../allJS';
import { axios } from '../../config/constant';
import {Button} from 'antd';

import {useSelector} from 'react-redux'
import { toast } from 'react-toastify';
export default function DangBanCoin(props) {
    const user = useSelector(state=> state.user);

    const [dangBan, setDangBan] = useState({
        ten:'',
        name: '',
        Quantity: '', // 2
        Sellrate: '',
        Total: '',
        isAccept : false 
        

    });
    
    
    async function DangBanCoin() {
        let res = await axios.post('/dangbanCoin', {
            idThangBan : user.email,//SUA ID DANG BAN
            ten:user.ten,
            name: dangBan.name,
            Quantity: dangBan.Quantity,  // gui qua api
            Sellrate: dangBan.Sellrate,
            Total: dangBan.Quantity * dangBan.Sellrate,
            isAccept : dangBan.isAccept
        });
        console.log(res);
        if (res.data.status === 'thanhcong') {
            toast.success(`Đăng bán coin thành công `);
        } else {
            toast.error(`Đăng mua không thành công`);
        }
    }
 
    function TinhTongTien() {
        dangBan.Quantity = document.getElementById("soluongid").value;
        dangBan.Sellrate = document.getElementById("dongia").value;
        dangBan.Total = (Math.round(dangBan.Quantity * dangBan.Sellrate * 100) / 100).toFixed(2);
        
        document.getElementById("isbn").innerHTML=dangBan.Total;
        // dangBan.TongTien =  document.getElementById("isbn").value;
        console.log("Tiền"+dangBan.Total);
        // dangBan.Tongtien = dangBan.soluong * dangBan.dongia;
        // return dangBan.TongTien = (Math.round(dangBan.TongTien * 100) / 100).toFixed(2);
    }
    function KiemTraNhapLieu()
    {
        var soluongid = document.getElementById("soluongid").value;
        var dongiaid = document.getElementById("dongia").value;

        var b= "";
        

        if(soluongid===b  && dongiaid===b ){
            document.getElementById("errSoLuong").innerHTML='Vui lòng nhập số lượng';
            document.getElementById("errDongia").innerHTML='Vui lòng nhập đơn giá';
        }else if(soluongid===b && dongiaid !== b)
        {
            document.getElementById("errSoLuong").innerHTML='Vui lòng nhập số lượng';
            document.getElementById("errDongia").innerHTML='';
        }else if(soluongid !==b && dongiaid === b)
        {
            document.getElementById("errSoLuong").innerHTML='';
            document.getElementById("errDongia").innerHTML='Vui lòng nhập đơn giá';
        }else if(soluongid !==b  && dongiaid !==b)
        {
            document.getElementById("errSoLuong").innerHTML='';
            document.getElementById("errDongia").innerHTML='';
            DangBanCoin();
        }
    }
 
    return (
        <Fragment>
            <div className="wrapper row1" >
                <Menutrangchu></Menutrangchu>
            </div>
            <div className="container mt-4">
                <h1 className="display-4 text-center">

                    ĐĂNG BÁN COIN
                </h1>
                <form id="book-form">
                    <div className="form-book" >
                        <label htmlFor="title" ><h5>Tên Coin</h5></label>
                        <select className="custom-select mr-sm-2" onChange={(e) => {
                            setDangBan({
                                ...dangBan,
                                name: e.target.value
                            })
                        }}>
                           
                            <option value="USDT" >USDT</option>
                            <option value="LIT" defaultValue>LIT</option>
                            <option value="ETH" >ETH</option>
                            <option value="BTC" >BTC</option>
                        </select>
                    </div>
                    <div className="form-book">
                        <label htmlFor="tacgia"><h5>Số lượng</h5></label>
                        <input type="number" name="soluong" id="soluongid"
                        className="form-control" min="0.1" max="100000" 
                 
                        step="1" onChange={(e) => {
                            setDangBan({
                                ...dangBan,
                                Quantity: e.target.value
                            })
                        }} />
                        <i id="errSoLuong"></i>
                    </div>

                    <div className="form-book">
                        <label htmlFor="tacgia"><h5>Đơn giá(USD)</h5></label>
                        <input type="number" id="dongia" className="form-control"
                        step="1000000" min="1000000" onChange={(e) => {
                            setDangBan({
                                ...dangBan,
                                Sellrate: e.target.value
                            })
                            TinhTongTien() 
                        }} />
                         <i id="errDongia"></i>
                    </div>
                    <div className="form-book">
                        <label htmlFor="isbn" ><h5>Tổng Tiền (USD)</h5></label>
                    <p id="isbn"  ></p>               
                    </div>

                
                    <Button type="primary"  onClick={(e) => {
                        e.preventDefault();
                        KiemTraNhapLieu();              
                    }}>Đăng Bán</Button>
                </form>
              
            </div>
            <div class="footer" style={{ backgroundColor: '#3366FF' }}>
                <Footertrangchu> </Footertrangchu>
            </div>
        </Fragment >





    );
}
