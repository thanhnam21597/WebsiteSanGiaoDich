import React, { Fragment, useState} from 'react';
import { Menutrangchu, Footertrangchu, } from '../allJS';
import { axios } from '../../config/constant';
import {useSelector} from 'react-redux'
import { message,Button } from 'antd';
import { toast } from 'react-toastify';
export default function DangMuaCoin(props) {
    const user = useSelector(state=> state.user);
   
     
    const [dangMua, setDangMua] = useState({
        ten:'',
        name1: '',
        Quantity1: '', // 2
        Buyrate1: '',
        Total1: '',
        isAccept : false // gan bang false

    });

    async function DangMuaCoin() {
        let res = await axios.post('/dangmuaCoin', {
            idBan : user.email, 
            ten:user.ten,
            name: dangMua.name1,
            Quantity: dangMua.Quantity1,  // gui qua api
            Buyrate: dangMua.Buyrate1,
            Total: dangMua.Quantity1 * dangMua.Buyrate1,
            isAccept : dangMua.isAccept
        });
       
        if (res.data.status === 'thanhcong') {
            toast.success(`Đăng mua coin thành công `);
        } else {
            toast.error(`Đăng mua không thành công`);
        }
    }
 
    function TinhTongTien() {
        dangMua.Quantity1 = document.getElementById("soluongid").value;
        dangMua.Buyrate1 = document.getElementById("dongia").value;
        dangMua.Total1 = (Math.round(dangMua.Quantity1 * dangMua.Buyrate1 * 100) / 100).toFixed(2);
        
        document.getElementById("isbn").innerHTML=dangMua.Total1;
        // dangBan.TongTien =  document.getElementById("isbn").value;
        console.log("Tiền"+dangMua.Total1);
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
            DangMuaCoin();
        }
        // warning();
    }
    // useEffect(() => {
       
    // }, [dangMua]);
    return (
        <Fragment>
            <div className="wrapper row1" >
                <Menutrangchu></Menutrangchu>
            </div>
            <div className="container mt-4">
                <h1 className="display-4 text-center">

                    ĐĂNG Mua COIN
                </h1>
                <form id="book-form">
                    <div className="form-book" >
                        <label htmlFor="title" ><h5>Tên Coin</h5></label>
                        <select className="custom-select mr-sm-2" onChange={(e) => {
                            setDangMua({
                                ...dangMua,
                                name1: e.target.value
                            })
                        }}>
                            {/* <option selected>Choose...</option> */}
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
                 
                        step="0.1" onChange={(e) => {
                            setDangMua({
                                ...dangMua,
                                Quantity1: e.target.value
                            })
                        }} />
                        <i id="errSoLuong"></i>

                        {/* {_.get("soluongid.type", errors) === "required" && (
                            <p>This field is required</p>
                        )} */}
                    </div>

                    <div className="form-book">
                        <label htmlFor="tacgia"><h5>Đơn giá(USD)</h5></label>
                        <input type="number" id="dongia" className="form-control"
                         step="1000000" min="1000000" onChange={(e) => {
                            setDangMua({
                                ...dangMua,
                                Buyrate1: e.target.value
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
                       
                     
                    }}>Đăng Mua</Button>
                </form>
               
            </div>
            
            <div className="footer" style={{ backgroundColor: '#3366FF' }}>
                <Footertrangchu> </Footertrangchu>
            </div>
        </Fragment >





    );
}
