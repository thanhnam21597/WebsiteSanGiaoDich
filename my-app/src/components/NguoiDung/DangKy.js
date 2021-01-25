import React, { Fragment, useState } from 'react';

import { axios } from '../../config/constant';
import { Menutrangchu, Footertrangchu } from '../allJS';


import { Button,Modal } from 'antd'
import {
    ArrowRightOutlined,
    CloseOutlined,
} from '@ant-design/icons';

export default function DangKy() {





    const [dangkytaikhoan, setdangkytaikhoan] = useState({
        ten: '',
        taikhoan: {
            email: '',
            password: ''
        },
        vaitro: ''
    });
    async function KiemTraDangKy() {
        let res = await axios.post('/dangky', {
            ten: dangkytaikhoan.ten,
            email: dangkytaikhoan.email,
            password: dangkytaikhoan.password
        })
        if (res.data.status === 'successs') {
            // alert('dang ky thanh cong');
         
              
         
            window.location.pathname = '/';
        } else {
            // alert('dang ky that bai');
           
        }
    }
    function myReset() {
        document.getElementById("myform").reset();

    }

    var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var regexHoten = /^[a-zA-Z]+$/;

    //hiện modal
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

    return (
        <Fragment>
            <div className="wrapper row1" >

                <Menutrangchu></Menutrangchu>
            </div>

            <div className="container p-5" >
                <form id="row" >
                    <div className="col-md-6 offset-md-3">
                        <div className="signin-image">

                            <h1><strong>Đăng kí tài khoản</strong></h1>
                        </div>
                        {/* form dang nhap */}

                        <form id="myform">
                            <div className="form-group row">
                                <strong style={{ fontSize: '15px' }} htmlFor="inputEmail3" className="col-sm-3 col-form-label"> Họ và Tên  </strong>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control form-control-lg" id="HoTenId" placeholder="Vui lòng nhập Họ Tên" onChange={(e) => {
                                        setdangkytaikhoan({
                                            ...dangkytaikhoan,
                                            ten: e.target.value
                                        })
                                    }} />

                                    <i id="errHoTen" style={{ color: 'red' }}></i>

                                </div>
                            </div>
                            <div className="form-group row" style={{ paddingTop: '10px' }}>
                                <strong style={{ fontSize: '15px' }} htmlFor="inputEmail3" className="col-sm-3 col-form-label">Tài khoản  </strong>
                                <div className="col-sm-9">
                                    <input type="email" className="form-control form-control-lg" id="EmailID" placeholder="Vui lòng nhập email tài khoản" onChange={(e) => {
                                        setdangkytaikhoan({
                                            ...dangkytaikhoan,
                                            email: e.target.value
                                        })
                                    }} />

                                    <i id="errEmail" style={{ color: 'red' }}></i>

                                </div>
                            </div>
                            <div className="form-group row" style={{ paddingTop: '10px' }}>
                                <strong style={{ fontSize: '15px' }} htmlFor="inputPassword3" className="col-sm-3 col-form-label" > Mật khẩu  </strong>
                                <div className="col-sm-9">
                                    <input type="password" className="form-control form-control-lg" id="MatKhauID" placeholder="Password" onChange={(e) => {
                                        setdangkytaikhoan({
                                            ...dangkytaikhoan,
                                            password: e.target.value
                                        })
                                    }} />

                                    <i id="errMatKhau" style={{ color: 'red' }}></i>

                                </div>
                            </div>
                        </form>


                        <Button onClick={(e) => {
                            e.preventDefault();
                            KiemTraDangKy();
                            showModal()
                        }}
                            type="primary"
                            className="mb-3"
                            block shape="round"
                            icon={<ArrowRightOutlined></ArrowRightOutlined>}
                            size="large"
                            disabled={!regEmail.test(dangkytaikhoan.email) || dangkytaikhoan.password <= 2
                                || !regexHoten.test(dangkytaikhoan.ten)}
                            width='10px'
                        >
                            Đăng ký
                        </Button>
                        <Button onClick={(e) => {

                            myReset();
                        }}
                            type="danger"
                            className="mb-3"
                            block shape="round"
                            icon={<CloseOutlined ></CloseOutlined>}
                            size="large"
                            width='10px'
                        >
                            Nhập lại
                        </Button>

                        <Modal
                            title="Thông báo"
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            <p>Bạn đã đăng kí thành công tài khoản</p>
                            
                        </Modal>
                    </div>
                </form>
            </div>


            <div class="footer" style={{ backgroundColor: '#3366FF' }}><Footertrangchu> </Footertrangchu></div>

        </Fragment>
    );
}

