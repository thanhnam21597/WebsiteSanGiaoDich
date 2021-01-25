import React, { Fragment, useState } from 'react';
import { axios } from '../../config/constant';
import { Menutrangchu, Footertrangchu } from '../allJS';
import { auth, googleAuthProvider } from '../../firebase';
import { useCookies } from 'react-cookie';
import { Button, Modal } from 'antd'
import {
    LoginOutlined,
    GoogleOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
function DangNhap({ history }) {
    const [taikhoan, setTaiKhoan] = useState({
        email: '',
        password: ''
    });

    const googleSubmit = () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (resukl) => {
                const { user } = resukl;
                //const idTokenResult =await user.getidTokenResult();
                dispatch({
                    type: "LOGGED_IN_USER_GOOGLE",
                    payload: {
                        email: user.email,
                        //token: idTokenResult.token,
                    }
                });
                history.push("/");
            })
    }
    const dispatch = useDispatch();

    var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // kiem tra account lay id va truyen vao cookie
    async function KiemTraAccount() {
        let res = await axios.post('/dangnhap', {
            email: taikhoan.email,
            password: taikhoan.password
        })
        if (res.data.status === 'thanhcong') {
            // kiem tra và chuyển vể giao dien tuong ung
            if (res.data.data.vaiTro === 0) {
                //window.location.pathname = '/quanlitaikhoan';
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        email: res.data.data.userID,
                        ten: res.data.data.TenNguoiDung,
                        Amount: res.data.data.Amount,
                    }
                });
                // window.location.pathname = '/';
                toast.success("ban dang nhap thanh cong");
                history.push('/quanlitaikhoan');
            }
            else {
                // alert("dang nhap thanh cong");
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        email: res.data.data.userID,
                        ten: res.data.data.TenNguoiDung,
                        Amount: res.data.data.Amount,
                    }
                });
                // window.location.pathname = '/';
                toast.success("ban dang nhap thanh cong");
                history.push('/');
                // var interval = setInterval(function () {
                //     
                // }, 6000);
                // clearInterval(interval);
            }
            //setCookie('userID2', res.data.data.userID);

        } else {
            // alert('dang nhap that bai');
        }
    }

    //Modal
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
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1><strong>Đăng nhập tài khoản</strong></h1>
                        {/* form dang nhap */}
                        <div>
                            <div className="form-group row">
                                <label style={{ fontSize: '12px' }} htmlFor="inputEmail3" className="col-sm-3 col-form-label"><strong>Tài khoản</strong>  </label>
                                <div className="col-sm-9">
                                    <input type="email" className="form-control form-control-lg" id="EmailID" placeholder="Email"
                                        onChange={(e) => {
                                            setTaiKhoan({
                                                ...taikhoan,//giu lai giu lieu truoc do 
                                                email: e.target.value
                                            })
                                        }} />

                                    <i id="errEmail" style={{ color: 'red' }}></i>
                                </div>
                            </div>
                            <div className="form-group row" style={{ paddingTop: '10px' }}>
                                <label style={{ fontSize: '12px' }} htmlFor="inputPassword3" className="col-sm-3 col-form-label" ><strong> Mật khẩu</strong> </label>
                                <div className="col-sm-9">
                                    <input type="password" className="form-control form-control-lg" id="PasswordID" placeholder="Password" onChange={(e) => {
                                        setTaiKhoan({
                                            ...taikhoan,
                                            password: e.target.value
                                        })
                                    }} />
                                    <i id="errMatKhau" style={{ color: 'red' }}></i>
                                </div>
                            </div>
                        </div>
                        {/* <button type="button" style={{ height: '60px', width: '120px' }} className="btn btn-primary" onClick={(e) => {
                            e.preventDefault();
                            //KiemTraNhapLieu();
                            KiemTraEmail();
                        }}>Đăng nhập</button> */}
                        <h6 className="float-right text-danger" style={{ fontWeight: '400' }}>forgot password</h6>


                        <Button
                            onClick={KiemTraAccount}
                            type="primary"
                            className="mb-3"
                            block shape="round"
                            icon={<LoginOutlined></LoginOutlined>}
                            size="large"
                            disabled={!regEmail.test(taikhoan.email) || taikhoan.password.length <= 2}
                            width='20px'
                        >
                            đăng nhập
                        </Button>
                        {/* modal đăng nhập */}
                        {/* <Modal
                            title="Thông báo"
                            visible={isModalVisible}
                            onOk={(e) => {
                                e.preventDefault();
                               }}
                            onCancel={handleCancel}
                            
                        >
                            <p>Bạn đã đăng nhập thành công</p>
                           
                        </Modal> */}

                        <Button onClick={googleSubmit}
                            type="danger"
                            className="mb-3"
                            block shape="round"
                            icon={<GoogleOutlined></GoogleOutlined>}
                            size="large"
                            disabled={!regEmail.test(taikhoan.email) || taikhoan.password.length <= 2}
                            width='20px'
                        >
                            google in Login
                        </Button>


                    </div>
                </div>
            </div>

            <div className="footer" ><Footertrangchu> </Footertrangchu></div>

        </Fragment>
    )
}

export default DangNhap
