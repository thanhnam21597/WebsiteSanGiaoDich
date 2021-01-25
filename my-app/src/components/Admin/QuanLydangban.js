import React, { Fragment, useState, useEffect } from 'react';
import { nav } from '../allJS';
import { axios } from '../../config/constant';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { UserAddOutlined } from '@ant-design/icons'
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
export default function QuanLyDangBan() {
    const [dangban, setdangban] = useState([]);
    const [dataDangBan, setDataDangBan] = useState({
        _id: '',
        ten: '',
        name: '',
        SellExchangedID: '',
        status: '',
        Sellrate: '',
        Quantity: '',
        Total: ''
    });
    var id;
    var data;
    var datause = [];
    var ID, status, Sellrate, Quantity, Total, ten, name;
    const sellAttributes = [];
    async function SuaDangBan(id) {
        console.log(dataDangBan);
        let res = await axios.put('/suadangban', {
            id: id,
            ten: dataDangBan.ten,
            name: dataDangBan.name,
            status: dataDangBan.status,
            Sellrate: dataDangBan.Sellrate,
            Quantity: dataDangBan.Quantity,
            Total: dataDangBan.Total
        });
        if (res.data.status === 'success') {
            toast.success('Sửa thành công');
            window.location.reload();
            // setReloadDatabase(true);
        } else {
            toast.error('Sửa thất bại');
            // setReloadDatabase(false);
        }
    }
    async function DuyetDangBan(id) {
        let res = await axios.put('/Dangban-duyet', {
            id: id
        });
        if (res.data.status === 'success') {
            toast.success('Duyệt đăng bán thành công');
            window.location.reload();
            // setReloadDatabase(true);
        } else {
            toast.error('Duyệt đăng bán  thất bại');
            // setReloadDatabase(false);
        }
    }
    async function KhongDuyetDangBan(id) {

        let res = await axios.put('/Dangban-khongduyet', {
            id: id
        });
        if (res.data.status === 'success') {
            toast.success('Duyệt đăng bán thành công');
            window.location.reload();
            // setReloadDatabase(true);
        } else {
            toast.error('Duyệt đăng bán  thất bại');
            // setReloadDatabase(false);
        }
    }

    async function XoaDangBan(id) {
        console.log(id);
        let res = await axios.delete('/xoadangban?id=' + id);
        if (res.data.status === 'success') {
            toast.success('Xóa đăng bán thành công');
            window.location.reload();
            // setReloadDatabase(true);
        } else {
            toast.error('Xóa đăng bán không thất bại');
            // setReloadDatabase(false);
        }
    }
    dangban.forEach(el => {
        data = {
            _id: el._id,
            ten: el.ten,
            name: el.name,
            status: el.isAccept,
            Sellrate: el.Sellrate,
            Quantity: el.Quantity,
            Total: el.Total
        };
        sellAttributes.push(data);

    });

    for (var i = 0; i < sellAttributes.length; i++) {
        datause.push(sellAttributes[i]);
    }
    console.log(datause);
    $('#dataTable').dataTable({
        rowId: '_id',
        "bDestroy": true,
        "data": datause,
        "columns": [
            { "data": "ten", title: "Tên người bán" },
            { "data": "name", title: "Loại Coin" },
            { "data": "status", title: "Status" },
            { "data": "Sellrate", title: "Gía bán" },
            { "data": "Quantity", title: "Số lượng" },
            { "data": "Total", title: "Tổng Tiền" },
            {
                defaultContent: '<a type="button" class="btn btn-primary btn-detail"  data-toggle="modal" data-target="#DetailModal" style= "margin-right: 20px"> <span class="glyphicon glyphicon-edit"></span>Chi Tiết</a>' +
                    '<a type="button" class="btn btn-primary btn-edit"  data-toggle="modal" data-target="#EditModal"  onclick="" style= "margin-right: 20px"> <span class="glyphicon glyphicon-edit"></span>Sửa</a>' +
                    '<a type="button" class="btn btn-primary btn-delete"  > <span class="glyphicon glyphicon-edit"></span>Xóa</a>',
                title: "Chức năng",

            },
            {
                "render": function (data, type, row) {
                    if (row.status === false) {
                        return '<a type="button" class="btn btn-primary btn-status-yes"  > <span class="glyphicon glyphicon-edit"></span>Duyệt</a>';
                    } else {
                        return '<span class="glyphicon glyphicon-edit">Duyệt thành công</span>'
                    }
                },
                title: "Duyệt"
            }
        ]
    });
    var table = $('#dataTable').DataTable();
    $('#dataTable tbody').find('tr td').on('click', '.btn-detail', function () {
        id = table.row($(this).parent('td')).id();

        LayDataDangBanTheoID(id);
    });
    $('#dataTable tbody').find('tr td').on('click', '.btn-status-yes', function () {
        id = table.row($(this).parent('td')).id();

        DuyetDangBan(id);
    });
    $('#dataTable tbody').find('tr td').on('click', '.btn-status-no', function () {
        id = table.row($(this).parent('td')).id();

        KhongDuyetDangBan(id);
    });
   
    $('#dataTable tbody').find('tr td').on('click', '.btn-edit', function () {
        id = table.row($(this).parent('td')).id();

        LayDataDangBanTheoID(id);
    });
    $('#dataTable tbody').find('tr td').on('click', '.btn-delete', function () {
        id = table.row($(this).parent('td')).id();

        XoaDangBan(id);
    });
    async function LayDataDangBanTheoID(id) {
        let res = await axios.get('/laydangbantheo?id=' + id);

        if (res.data.status === 'success') {
            setDataDangBan({
                _id: res.data.data._id,
                ten: res.data.data.ten,
                name: res.data.data.name,
                status: res.data.data.isAccept,
                Sellrate: res.data.data.Sellrate,
                Quantity: res.data.data.Quantity,
                Total: res.data.data.Total
            });
        } else {
            message.error(res.data.message);
        }

    }
    async function LayDanhSachDangBan() {
        let url = await axios.get('/quanlydangban');
        if (url.data.status === 'success') {
            setdangban(url.data.data);
        } else {
            message.error("Load fail");
        }
    }

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    console.log(user);
    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
    };


    useEffect(() => {

        LayDanhSachDangBan();


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

                    <hr className="sidebar-divider my-0" />

                    <hr className="sidebar-divider" />
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
                                <span> Quản lý rút tiền  </span></p>
                        </Link>
                    </li>

                    {/* Divider */}
                    <hr className="sidebar-divider d-none d-md-block" />
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
                                <div className="topbar-divider d-none d-sm-block" />
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

                                        <div className="dropdown-divider" />
                                        <p className="dropdown-item" href="#" data-toggle="modal"
                                            data-target="#logoutModal">
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
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
                                    <h6 className="m-0 font-weight-bold text-gray-800">Quản lí Đăng Bán</h6>
                                    <p type="button" className="btn btn-primary float-right" data-toggle="modal" data-target="#AddModal"  > <span className="glyphicon glyphicon-edit"></span>Thêm</p>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%">

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
                    <i className="fas fa-angle-up" />
                </a>
                {/* Logout Modal*/}
                <div className="modal fade" id="DetailModal" tabIndex={-1} role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Xem chi tiết đăng bán</h5>

                            </div>
                            <div className="modal-body">
                                <form>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Tên người bán</label>
                                        <input type="text" className="form-control" defaultValue={dataDangBan.ten} disabled/>

                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Loại Coin</label>
                                        <input type="text" className="form-control"  defaultValue={dataDangBan.ten} disabled/>

                                    </Form.Group>
                                  
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Giá</label>
                                        <input type="text" className="form-control" defaultValue={dataDangBan.Sellrate} disabled />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Số Lượng</label>
                                        <input type="text" className="form-control" defaultValue={dataDangBan.Quantity} disabled/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Tổng cộng</label>
                                        <input type="text" className="form-control" defaultValue={dataDangBan.Total} disabled/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Trạng Thái</label>
                                        <input type="text" className="form-control" defaultValue={dataDangBan.status} disabled/>
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
                                <h5 className="modal-title" id="exampleModalLabel">Sửa đăng bán</h5>

                            </div>
                            <div className="modal-body">
                                <form>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Tên người bán</label>
                                        <input type="text" className="form-control" defaultValue={dataDangBan.ten} onChange={(e) => {
                                            setDataDangBan({
                                                ...dataDangBan,
                                                ten: e.target.value
                                            })
                                        }} />

                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Loại coin</label>
                                        <input type="text" className="form-control" defaultValue={dataDangBan.name} onChange={(e) => {
                                            setDataDangBan({
                                                ...dataDangBan,
                                                name: e.target.value
                                            })
                                        }} />

                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Thể loại Coin</label>
                                        <input type="text" className="form-control" value={dataDangBan.Sellrate} onChange={(e) => {
                                            setDataDangBan({
                                                ...dataDangBan,
                                                Sellrate: e.target.value
                                            })
                                        }} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Số Lượng</label>
                                        <input type="text" className="form-control" value={dataDangBan.Quantity} onChange={(e) => {
                                            setDataDangBan({
                                                ...dataDangBan,
                                                Quantity: e.target.value
                                            })
                                        }} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Tổng cộng</label>
                                        <input type="text" className="form-control" value={dataDangBan.Total} onChange={(e) => {
                                            setDataDangBan({
                                                ...dataDangBan,
                                                Total: e.target.value
                                            })
                                        }} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Trạng Thái</label>
                                        <input type="text" className="form-control" value={dataDangBan.status} onChange={(e) => {
                                            setDataDangBan({
                                                ...dataDangBan,
                                                status: e.target.value
                                            })
                                        }} />
                                    </Form.Group>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Đóng</button>
                                <a className="btn btn-primary" onClick={() => {
                                    SuaDangBan(dataDangBan._id)
                                }}>Lưu lại</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
    )
}


