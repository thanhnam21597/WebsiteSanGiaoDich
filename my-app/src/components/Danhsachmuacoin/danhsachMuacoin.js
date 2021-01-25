import React, { useState, Fragment, useEffect } from 'react';
import { axios } from '../../config/constant';
import { message } from 'antd';
import { Menutrangchu, Footertrangchu } from '../allJS';
import { Table,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'


import {useSelector} from 'react-redux'

function DanhsachMuacoin(props) {
   
    //lay id trang chhu truyen qua 
    // const CoinID = props.match.params.id;
    const [Bitcoin, setBitcoin] = useState([]);
    const user = useSelector(state =>state.user);

    async function LayDanhSachBitcoin() {
        let res = await axios.get('/danhsachmuaCoin');
        if (res.data.status === 'success') {
            setBitcoin(res.data.data);
        } else {
            message.error("Load fail");
        }
    }
    // const KiemTraLogin = () => {
    //     if (cookies.userID === undefined) {
            
    //         window.location.pathname = "/Dangnhap";
            
    //     } 
    // }
    const KiemTraLogin = () => {
       

        window.location.pathname = "/Dangnhap";

     
    }



    console.log(Bitcoin);
    useEffect(() => {
        LayDanhSachBitcoin();
    }, [])
    return (
        <Fragment>
            <div className="wrapper row1" >
                <Menutrangchu></Menutrangchu>
            </div>
           
            <div className="container mt-4">
                <h1 className="display-4 text-center">
                    DANH SÁCH ĐĂNG MUA COIN
                </h1>
          
                <div className="col" style={{ width: '100%', marginTop: 20,textAlign:'center'}}>
                <Table  striped bordered hover >
                    {/* <ReactDatatable> */}
                    <thead >
                        <tr >
                            <th style={{color:'white'}}> Tên Khách hàng </th>
                            <th style={{color:'white'}}> Loại Coin</th>
                           
                            <th style={{color:'white'}}> Số lượng </th>
                            <th style={{color:'white'}}> Đơn giá </th>
                           
                          
                         
                            <th style={{color:'white'}}> Thực hiện chức năng </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Bitcoin.map((coin, index) => (
                            <tr key={coin._id} >
                                <td>
                                        {coin.ten}
                                </td>
                                <td>
                                    {coin.name}
                                </td>
                              
                                <td>
                                    {coin.Quantity} 
                                </td>
                                <td>
                                    {coin.Buyrate} 
                                </td>
                              
                               
                        
                               
                                <td style={{ textAlign: 'center' }}>
                                    <Link to={"/getbitcoin/" + coin._id +"/"+coin.idBan}>
                                        <button className="btn btn-primary btn-sm" style={{ marginRight: '5px' }} onClick={(e)=>{
                                           if (user === null) {
                                         
                                            e.preventDefault();
                                            KiemTraLogin();
                                        }
                                        }}> Mua Coin</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </div>
            </div>

            

            <div className="footer" style={{backgroundColor: 'brown'}}><Footertrangchu> </Footertrangchu></div>
        </Fragment >


    )
} export default DanhsachMuacoin