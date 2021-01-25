import React, { Fragment, useState, useEffect } from 'react';
import { Menutrangchu, Footertrangchu, } from '../allJS';
import { axios } from '../../config/constant';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { message, Button } from 'antd';
import { toast } from 'react-toastify';
export default function DangMuaCoin(props) {
    const user = useSelector(state => state.user);
    const [dataTaiKhoan, setDataTaiKhoan] = useState({
        _id: '',
        Name: '',
        email: '',
        password: '',
        vaitro: ''
    });
    const TaiKhoanID = props.match.params.id;

    async function LayDataTaiKhoanTheoID() {
        let res = await axios.get('/LayThongtinTaiKhoanID?id=' + user.email);
        console.log(res.data.data);
        if (res.data.status === 'thanhcong') {
            setDataTaiKhoan({
                _id: res.data.data._id,
                Name: res.data.data.ten,
                email: res.data.data.taikhoan.email,
                password: res.data.data.taikhoan.password,
                vaitro: res.data.data.vaitro
            });
        } else {
            message.error(res.data.message);
        }
        console.log(dataTaiKhoan);
    }
    async function SuaTaiKhoan(id) {

        let res = await axios.put('/ChinhsuataikhoanID?id=' + user.email, {
            id:id,
            Name: dataTaiKhoan.Name,
            email: dataTaiKhoan.email,
            password: dataTaiKhoan.password,
            vaitro: dataTaiKhoan.vaitro
        });
        if (res.data.status === 'success') {
            toast.success('Sửa thành công');
           
            // setReloadDatabase(true);
        } else {
            toast.error('Sửa thất bại')
            // setReloadDatabase(false);
        }
    }
    useEffect(() => {
        LayDataTaiKhoanTheoID(TaiKhoanID);
    }, [])

    return (
        <Fragment>
            <div className="wrapper row1" >
                <Menutrangchu></Menutrangchu>
            </div>
            <div className="container mt-4">
                <h1 className="display-4 text-center">

                    Chỉnh sửa thông tin tài khoản
                </h1>
                <form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{ backgroundColor: 'white' }}>Họ và Tên</Form.Label>
                        <Form.Control defaultValue={dataTaiKhoan.Name} onChange={(e) => {
                            setDataTaiKhoan({
                                ...dataTaiKhoan,
                                Name: e.target.value
                            })
                        }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{ backgroundColor: 'white' }}>Email</Form.Label>
                        <Form.Control defaultValue={dataTaiKhoan.email} onChange={(e) => {
                            setDataTaiKhoan({
                                ...dataTaiKhoan,
                                email: e.target.value
                            })
                        }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{ backgroundColor: 'white' }}>Mật khẩu</Form.Label>
                        <Form.Control defaultValue={dataTaiKhoan.password} onChange={(e) => {
                            setDataTaiKhoan({
                                ...dataTaiKhoan,
                                password: e.target.value
                            })
                        }}

                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{ backgroundColor: 'white' }}>Vai trò</Form.Label>
                        <Form.Control defaultValue={dataTaiKhoan.vaitro} onChange={(e) => {
                            setDataTaiKhoan({
                                ...dataTaiKhoan,
                                vaitro: e.target.value
                            })
                        }} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Button type="primary" onClick={(e) => {
                            e.preventDefault();
                            SuaTaiKhoan();
                        }}>Lưu lại</Button>
                    </Form.Group>
                </form>

            </div>

            <div className="footer" style={{ backgroundColor: '#3366FF' }}>
                <Footertrangchu> </Footertrangchu>
            </div>
        </Fragment >





    );
}
