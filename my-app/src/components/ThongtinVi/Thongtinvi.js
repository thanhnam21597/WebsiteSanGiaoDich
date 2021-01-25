import React, { Fragment, useState, useEffect } from 'react';
import { Menutrangchu, Footertrangchu } from '../allJS';
import { axios } from '../../config/constant';
import { Modal, Button } from 'antd';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
export default function ThongTinvi(props) {
    const [cookies] = useCookies();
    const WalletID = props.match.params.id;
    const user = useSelector(state => state.user);
    
    const [ThongTinvi, setThongtinVi] = useState({
        _id: '',
        NameType: '',
        Amount: '',
        AmoutCode: ''
    });

   
    async function LayDanhSachThongTinVi() {
        let res = await axios.get('/thongtinvi?id=' + user.email);

        if (res.data.status === 'thanhcong') {

            setThongtinVi({
                _id: res.data.data._id,
                NameType: res.data.data.NameType,
                Amount: res.data.data.Amount,
                AmoutCode: res.data.data.AmountCode
            })
        } else {
            alert(res.data.message);
        }
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    console.log(ThongTinvi)
    useEffect(() => {
        LayDanhSachThongTinVi(WalletID);
    }, [])


    return (
        <Fragment>
            <div className="wrapper row1" >

                <Menutrangchu></Menutrangchu>
            </div>
            <div className="container mt-5">
                <h4 style={{ color: 'red', fontFamily: "sans-serif", textAlign: 'center' }}>Thong tin vi</h4>
                <table className="table table-striped table-hover" style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                           
                            <th style={{ color: 'white' }}>Họ và tên khách hàng</th>
                            <th style={{ color: 'white' }}>Thể loại Tiền</th>
                            <th style={{ color: 'white' }}>Số tiền trong ví</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                         
                            <td>{user.ten}</td>
                            <td>{ThongTinvi.NameType}</td>
                            <td>{ThongTinvi.Amount}</td>

                           
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="wrapper row4">
                <Footertrangchu> </Footertrangchu>
            </div>
        </Fragment >
    );
}
