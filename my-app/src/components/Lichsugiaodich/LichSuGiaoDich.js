import React, { useState, Fragment, useEffect } from 'react';
import { axios } from '../../config/constant';
import { message } from 'antd';
import { Menutrangchu, Footertrangchu } from '../allJS';
import { Table,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'


import {useSelector} from 'react-redux'

export default function LichSuGiaoDich(props) {
   
    //lay id trang chhu truyen qua 
    // const CoinID = props.match.params.id;
    const user = useSelector(state =>state.user);
    const [dataGiaoDich, setDataGiaoDich] = useState([]);
   
       async function LayDataGiaoDichTheoID() {
        let res = await axios.get('/laygiaodichtheo?id=' + user.email);

        if (res.data.status === 'success') {
            setDataGiaoDich(res.data.data);
        } else {
            message.error(res.data.message);
        }

    }
   



   
    useEffect(() => {
        LayDataGiaoDichTheoID();
    }, [])
    return (
        <Fragment>
            <div className="wrapper row1" >
                <Menutrangchu></Menutrangchu>
            </div>
           
            <div className="container mt-4">
                <h1 className="display-4 text-center">
                    Lịch Sử  Giao Dịch của Khách Hàng
                </h1>
          
                <div className="col" style={{ width: '100%', marginTop: 20,textAlign:'center'}}>
                <Table  striped bordered hover >
                    {/* <ReactDatatable> */}
                    <thead >
                        <tr >
                            <th style={{color:'white'}}> Tên Bán </th>
                            <th style={{color:'white'}}> Tên Mua </th>
                           
                            <th style={{color:'white'}}> Thể loại tiền </th>
                            
                            <th style={{color:'white'}}> Trạng thái </th>
                            <th style={{color:'white'}}> Số lượng </th>
                         
                            <th style={{color:'white'}}> Đơn giá mua </th>
                            <th style={{color:'white'}}> Ví tiền </th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {dataGiaoDich.map((data, index) => (
                            <tr key={data._id} >
                                <td>
                                        {data.tenBan}
                                </td>
                                <td>
                                    {data.tenMua}
                                </td>
                              
                                <td>
                                    {data.theLoaiTien} 
                                </td>
                                <td>
                                    {data.trangThai}
                                </td>
                               
                                <td>
                                    {data.soLuong}
                                </td>
                               
                                <td>
                                    {data.donGiaMua}
                                </td>
                                <td>
                                    {data.viTien}
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
} 