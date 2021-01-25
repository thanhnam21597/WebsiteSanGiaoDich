import React, {Fragment, useState, useEffect} from 'react';
import {DanhSachDangBan} from '../allJS';
import {axios} from '../../config/constant';
import {message} from 'antd';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons'
import $ from "jquery";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
export default function QuanLyKhachHang() {

    const [khachhang, setkhachhang] = useState([]);

    const [dataKhachHang, setDataKhachHang] = useState({
        _id:'',
        Email: '',
        Name: '',
        PhoneNum: '',
    });
    const [dataThemKhachHang, setDataThemKhachHang] = useState({
        Email: '',
        Name: '',
        PhoneNum: '',
    });
    var id;
    var data;
    var datause = [];
    var Email, Phone, PhoneNum;
    const khachhangAttributes = [];
    async function ThemKhachHang() {

        let res = await axios.post('/themkhachhang', {
            Email: dataThemKhachHang.Email,
            Name: dataThemKhachHang.Name,
            PhoneNum: dataThemKhachHang.PhoneNum,
           
        });

        if (res.data.status === 'success') {
            toast.success('Thêm thành công');
            window.location.reload();
            // setReloadDatabase(true);
        } else {
            toast.error('xóa thất bại');
            // setReloadDatabase(false);
        }
    }
    async function SuaKhachHang(id) {

        let res = await axios.put('/suakhachhang', {
            id:id,
            Email: dataKhachHang.Email,
            Name: dataKhachHang.Name,
            PhoneNum: dataKhachHang.PhoneNum,
        });
        if (res.data.status === 'success') {
            toast.success('Sửa thành công');
            window.location.reload();
           
        } else {
            toast.error('Sửa Thất bại');
            // setReloadDatabase(false);
        }
    }


    async function XoaKhachHang(id) {
        console.log(id);
        let res = await axios.delete('/xoakhachhang?id=' + id);
        if (res.data.status === 'success') {
            toast.success('Xóa thành công');
            window.location.reload();
            // setReloadDatabase(true);
        } else {
            toast.error('Xóa thất bại')
            // setReloadDatabase(false);
        }
    }
    khachhang.forEach(el => {
        data = {
            _id:el._id,
            Email: el.Email,
            Name: el.Name,
            PhoneNum: el.PhoneNum,
         
        };
        khachhangAttributes.push(data);

    });

    for (var i = 0; i < khachhangAttributes.length; i++) {
        datause.push(khachhangAttributes[i]);
    }
    $('#dataTable').empty();

    $('#dataTable').dataTable({
        "bDestroy":true,
        "data": datause,
        rowId: '_id',
        "columns": [
            {"data": "Name", title: "Họ và Tên"},
            {"data": "Email", title: "Email"},
            {"data": "PhoneNum", title: "Số điện thoại"},
            {
                defaultContent: '<a type="button" class="btn btn-primary btn-detail"  data-toggle="modal" data-target="#DetailModal" style= "  margin-right: 20px"> <span class="glyphicon glyphicon-edit" ></span>Chi Tiết</a>' +
                    '<a type="button" class="btn btn-primary btn-edit"  data-toggle="modal" data-target="#EditModal" style= "  margin-right: 20px" > <span class="glyphicon glyphicon-edit"></span>Sửa</a>' +
                    '<a type="button" class="btn btn-primary btn-delete"  > <span class="glyphicon glyphicon-edit"></span>Xóa</a>',
                title: "Chức năng"

            }
        ]
    });
    var table=$('#dataTable').DataTable();
    $('#dataTable tbody').find('tr td').on( 'click', '.btn-detail', function () {
        id = table.row( $( this ).parent('td') ).id();

        LayDataKhachHangTheoID(id);
    } );
    $('#dataTable tbody').find('tr td').on( 'click', '.btn-edit', function () {
        id = table.row( $( this ).parent('td') ).id();

        LayDataKhachHangTheoID(id);
    } );
    $('#dataTable tbody').find('tr td').on( 'click', '.btn-delete', function () {
        id = table.row( $( this ).parent('td') ).id();

        XoaKhachHang(id);
    } );
    async function LayDataKhachHangTheoID(id) {
        let res = await axios.get('/laykhachhangtheo?id=' + id);

        if (res.data.status === 'success') {
            setDataKhachHang({
                _id:res.data.data._id,
                Name: res.data.data.Name,
                Email: res.data.data.Email,
                PhoneNum: res.data.data.PhoneNum,
            });
        } else {
            message.error(res.data.message);
        }

    }
    async function LayDanhSachKhachHang() {
        let url = await axios.get('/thongtinkhachhang');
        if (url.data.status === 'success') {
            setkhachhang(url.data.data);
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

        LayDanhSachKhachHang();


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
                        <Link to='/NapTien'>
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
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Tài khoản</span>
                                       
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
                                    <h6 className="m-0 font-weight-bold text-gray-800">Quản lí khách hàng</h6>
                                    <p type="button" className="btn btn-primary float-right"  data-toggle="modal" data-target="#AddModal"  > <span className="glyphicon glyphicon-edit"></span>Thêm</p>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%"
                                               cellSpacing={0}>

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
                                <h5 className="modal-title" id="exampleModalLabel">Xem chi tiết Khách hàng</h5>

                            </div>
                            <div className="modal-body">
                                <form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Ho  Tên</Form.Label>
                                        <Form.Control defaultValue={dataKhachHang.Name} disabled/>

                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control defaultValue={dataKhachHang.Email} disabled/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Số điện thoại</Form.Label>
                                        <Form.Control defaultValue={dataKhachHang.PhoneNum} disabled/>
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
                                <h5 className="modal-title" id="exampleModalLabel">Sửa khách hàng</h5>

                            </div>
                            <div className="modal-body">
                                <form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Họ  Tên</Form.Label>
                                        <Form.Control defaultValue={dataKhachHang.Name} onChange={(e) => {
                                            setDataKhachHang({
                                                ...dataKhachHang,
                                                Name: e.target.value
                                            })
                                        }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control defaultValue={dataKhachHang.Email} onChange={(e) => {
                                            setDataKhachHang({
                                                ...dataKhachHang,
                                                Email: e.target.value
                                            })
                                        }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Số điện thoại</Form.Label>
                                        <Form.Control defaultValue={dataKhachHang.PhoneNum} onChange={(e) => {
                                            setDataKhachHang({
                                                ...dataKhachHang,
                                                PhoneNum: e.target.value
                                            })
                                        }}

                                        />
                                    </Form.Group>
                                   
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Đóng</button>
                                <p className="btn btn-primary"  onClick={() => {SuaKhachHang(dataKhachHang._id)
                                }}>Lưu lại</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="AddModal" tabIndex={-1} role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Thêm khách hàng</h5>

                            </div>
                            <div className="modal-body">
                                <form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Họ  Tên</Form.Label>
                                        <Form.Control onChange={(e) => {
                                            setDataThemKhachHang({
                                                ...dataThemKhachHang,
                                                Name: e.target.value
                                            })
                                        }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control  onChange={(e) => {
                                            setDataThemKhachHang({
                                                ...dataThemKhachHang,
                                                Email: e.target.value
                                            })
                                        }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Số điện thoại</Form.Label>
                                        <Form.Control  onChange={(e) => {
                                            setDataThemKhachHang({
                                                ...dataThemKhachHang,
                                                AmountCode: e.target.value
                                            })
                                        }}

                                        />
                                    </Form.Group>
                                   
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Đóng</button>
                                <p className="btn btn-primary"  onClick={() => {ThemKhachHang()
                                }}>Lưu lại</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
    )
}


