import React, { Fragment, useState, useEffect } from 'react';
import { axios } from '../../config/constant';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
// import {Form} from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import $ from "jquery";
import DataTable from 'datatables.net';
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify';
export default function QuanLytaikhoan() {
    const [show, setShow] = useState(false);
    const [dataTaiKhoan, setDataTaiKhoan] = useState({
        _id:'',
        Name: '',
        email: '',
        password: '',
        vaitro: ''
    });
    var id;
  
    const [taikhoan, settaikhoan] = useState([]);
  
    var data;
    var datause = [];

    const accountAttributes = [];
    async function SuaTaiKhoan(id) {

        let res = await axios.put('/suataikhoan', {
            id:id,
            Name: dataTaiKhoan.Name,
            email: dataTaiKhoan.email,
            password: dataTaiKhoan.password,
            vaitro: dataTaiKhoan.vaitro
        });
        if (res.data.status === 'success') {
            toast.success('Sửa thành công');
            window.location.reload();
            // setReloadDatabase(true);
        } else {
            toast.error('Sửa thất bại')
            // setReloadDatabase(false);
        }
    }


    async function XoaTaiKhoan(id) {
        console.log(id);
        let res = await axios.delete('/xoataikhoan?id=' + id);
        if (res.data.status === 'success') {
            toast.success('Xóa thành công');
            window.location.reload();
            // setReloadDatabase(true);
        } else {
            toast.error('Xóa thất bại')
            // setReloadDatabase(false);
        }
    }
    taikhoan.forEach(el => {
        data = {
            _id:el._id,
            Name: el.ten,
            email: el.taikhoan.email,
            password: el.taikhoan.password,
            vaitro: el.vaitro,
        };
        accountAttributes.push(data);

    });

    for (var i = 0; i < accountAttributes.length; i++) {
        datause.push(accountAttributes[i]);
    }
    console.log(datause);
    $('#dataTable').empty();
    
    $('#dataTable').dataTable({
        "bDestroy":true,
        rowId: '_id',
        processing: true,
        serverSide: false,
        "data": datause,
        "columns": [
            {"data": "Name", title: "Name"},
            {"data": "email", title: "Email"},
            {"data": "password", title: "Password"},
            {"data": "vaitro", title: "Vaitro"},
            {

                defaultContent: '<a type="button" class="btn btn-primary btn-detail" data-toggle="modal" data-target="#DetailModal" style= "  margin-right: 20px"> <span class="glyphicon glyphicon-edit" ></span>Chi Tiết</a>'+
                    '<a type="button" class="btn btn-primary btn-edit"  data-toggle="modal" data-target="#EditModal"  onclick="" style= "  margin-right: 20px"> <span class="glyphicon glyphicon-edit"></span>Sửa</a>'+
                    '<a type="button" class="btn btn-primary btn-delete"  > <span class="glyphicon glyphicon-edit"></span>Xóa</a>',
                title: "Chức năng"

            }
        ]
    });
    var table=$('#dataTable').DataTable();
    $('#dataTable tbody').find('tr td').on( 'click', '.btn-detail', function () {
        id = table.row( $( this ).parent('td') ).id();

        LayDataTaiKhoanTheoID(id);
    } );
    console.log(id);
    $('#dataTable tbody').find('tr td').on( 'click', '.btn-edit', function () {
        id = table.row( $( this ).parent('td') ).id();

        LayDataTaiKhoanTheoID(id);
    } );
    $('#dataTable tbody').find('tr td').on( 'click', '.btn-delete', function () {
        id = table.row( $( this ).parent('td') ).id();

        XoaTaiKhoan(id);
    } );
    async function LayDataTaiKhoanTheoID(id) {
        let res = await axios.get('/laytaikhoantheo?id=' + id);
        console.log(res.data.data);
        if (res.data.status === 'thanhcong') {
            setDataTaiKhoan({
                _id:res.data.data._id,
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
    async function LayDanhSachTaiKhoan() {
        let url = await axios.get('/quanlitaikhoan');
        if (url.data.status === 'success') {
            settaikhoan(url.data.data);
        } else {
            message.error("Load fail");
        }
    }


    const user = useSelector(state => state.user); 
    const dispatch = useDispatch();

    console.log(user);
    const logout =()=>{
        dispatch({
            type:'LOGOUT',
            payload: null
        })
    };
    useEffect(() => {

        LayDanhSachTaiKhoan();


    }, []);


    return (
        <Fragment>
            <div id="wrapper">
                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    {/* Sidebar - Brand */}
                    {/* Sidebar - Brand */}
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                        <div className="sidebar-brand-text mx-3">Trang quản lý</div>
                    </a>

                    <hr className="sidebar-divider my-0"/>

                    <hr className="sidebar-divider"/>
                    {/* Heading */}
                    <div className="sidebar-heading">
                        Hệ thống quản lý
                    </div>
                    {/* Nav Item - Pages Collapse Menu */}
                    <li className="nav-item">
                        <Link to='/quanlitaikhoan'>
                            <p className="nav-link">
                                <i className="fas fa-fw fa-table" />
                                <span>Quản lý Tài Khoản</span></p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/thongtinkhachhang'>
                            <p className="nav-link">
                                <i className="fas fa-fw fa-table" />
                                <span>Quản lý Khách hàng</span></p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/manage-transaction'>
                            <p className="nav-link" >
                                <i className="fas fa-fw fa-table" />
                                <span>Quản lý Giao dịch</span></p>
                        </Link>
                    </li>

                    {/* Nav Item - Utilities Collapse Menu */}
                    <li className="nav-item">
                        <Link to='/danhsachbitcoin'>
                            <p className="nav-link" href="tables.html">
                                <i className="fas fa-fw fa-table" />
                                <span>Quản lý Đăng mua</span></p>
                        </Link>
                    </li>

                    {/* Divider */}
                    {/* Nav Item - Tables */}
                    <li className="nav-item">
                        <Link to='/quanlydangban'>
                            <p className="nav-link" href="tables.html">
                                <i className="fas fa-fw fa-table" />
                                <span>Quản lý Đăng bán </span></p>
                        </Link>
                    </li>
                    {/* Nav Item - Tables */}
                    <li className="nav-item">
                        <Link to='/naptien'>
                            <p className="nav-link" href="tables.html">
                                <i className="fas fa-fw fa-table" />
                                <span>Quản lý Nạp Tiền  </span></p>
                        </Link>
                    </li>
                    {/* Nav Item - Tables */}
                    <li className="nav-item">
                        <Link to='/RutTien'>
                            <p className="nav-link" href="tables.html">
                                <i className="fas fa-fw fa-table" />
                                <span> Quản lý Rút tiền  </span></p>
                        </Link>
                    </li>

                    {/* Divider */}
                    <hr className="sidebar-divider d-none d-md-block"/>
                </ul>
                {/* End of Sidebar */}
                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        {/* Topbar */}
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            {/* Topbar Navbar */}
                            <ul className="navbar-nav ml-auto">
                                <div className="topbar-divider d-none d-sm-block"/>
                                {/* Nav Item - User Information */}
                                <li className="nav-item dropdown no-arrow">
                                    <p className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                         <UserAddOutlined />
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Admin   </span>
                                       
                                    </p>
                                    {/* Dropdown - User Information */}
                                   
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                         aria-labelledby="userDropdown">
                                       
                                        <div className="dropdown-divider"/>
                                        <p className="dropdown-item" href="#" data-toggle="modal"
                                           data-target="#logoutModal">
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"/>
                                            <Link to='' onClick={logout}> Dang xuat</Link>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        {/* Begin Page Content */}
                        <div className="container-fluid">
                            {/* Page Heading */}
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-gray-800">Quản lí tài khoản</h6>
                                    <p type="button" className="btn btn-primary float-right" data-toggle="modal" data-target="#AddModal"  > <span className="glyphicon glyphicon-edit"></span>Thêm</p>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" style={{backgroundColor:'white'}}>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </div>
                </div>
                {/* End of Content Wrapper */}
                {/* End of Page Wrapper */}
                <div>
                </div>
                {/* Scroll to Top Button*/}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"/>
                </a>
                {/* Logout Modal*/}
                <div className="modal fade" id="DetailModal" tabIndex={-1} role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Xem chi tiết Tài Khoản</h5>

                            </div>
                            <div className="modal-body">
                                <form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label style={{ backgroundColor: 'white'}}>Ho và Tên</Form.Label>
                                        <Form.Control defaultValue={dataTaiKhoan.Name} disabled/>

                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label style={{ backgroundColor: 'white'}}>Email</Form.Label>
                                        <Form.Control defaultValue={dataTaiKhoan.email} disabled/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label style={{ backgroundColor: 'white'}}>Mật khẩu</Form.Label>
                                        <Form.Control defaultValue={dataTaiKhoan.password} disabled/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label style={{ backgroundColor: 'white'}}>Vai trò</Form.Label>
                                        <Form.Control defaultValue={dataTaiKhoan.vaitro} disabled/>
                                    </Form.Group>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="EditModal" tabIndex={-1} role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Sửa Tài Khoản </h5>

                            </div>
                            <div className="modal-body">
                                <form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label style={{ backgroundColor: 'white'}}>Họ và Tên</Form.Label>
                                        <Form.Control defaultValue={dataTaiKhoan.Name} onChange={(e) => {
                                            setDataTaiKhoan({
                                                ...dataTaiKhoan,
                                                Name: e.target.value
                                            })
                                        }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label style={{ backgroundColor: 'white'}}>Email</Form.Label>
                                        <Form.Control defaultValue={dataTaiKhoan.email} onChange={(e) => {
                                            setDataTaiKhoan({
                                                ...dataTaiKhoan,
                                                email: e.target.value
                                            })
                                        }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label style={{backgroundColor: 'white'}}>Mật khẩu</Form.Label>
                                        <Form.Control defaultValue={dataTaiKhoan.password} onChange={(e) => {
                                            setDataTaiKhoan({
                                                ...dataTaiKhoan,
                                                password: e.target.value
                                            })
                                        }}

                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label style={{ backgroundColor: 'white'}}>Vai trò</Form.Label>
                                        <Form.Control defaultValue={dataTaiKhoan.vaitro} onChange={(e) => {
                                            setDataTaiKhoan({
                                                ...dataTaiKhoan,
                                                vaitro: e.target.value
                                            })
                                        }}/>
                                    </Form.Group>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Đóng</button>
                                <p className="btn btn-primary"  onClick={() => {SuaTaiKhoan(dataTaiKhoan._id)
                                }}>Lưu lại</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
    )
}


