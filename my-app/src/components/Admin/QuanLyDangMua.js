import React, { Fragment, useState, useEffect } from 'react';
import { DanhSachDangBan } from '../allJS';
import { axios } from '../../config/constant';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import $ from "jquery";
import { UserAddOutlined } from '@ant-design/icons'
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
export default function QuanLyDangMua() {
    const [dangmua, setdangmua] = useState([]);
    const [dataDangMua, setDataDangMua] = useState({
        _id: '',
        ten: '',
        name: '',
        BuyExchangedID: '',
        status: '',
        Buyrate: '',
        Quantity: '',
        Total: ''
    });
    var id;
    var data;
    var datause = [];
    var ID, status, Sellrate, Quantity, Total, ten, name;
    const buyAttributes = [];
    async function SuaDangMua(id) {
        console.log(dataDangMua);
        let res = await axios.put('/suadangmua', {
            id: id,
            ten: dataDangMua.ten,
            name: dataDangMua.name,
            status: dataDangMua.status,
            Buyrate: dataDangMua.Buyrate,
            Quantity: dataDangMua.Quantity,
            Total: dataDangMua.Total
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
    async function DuyetDangMua(id) {
        let res = await axios.put('/Dangmua-duyet', {
            id: id
        });
        if (res.data.status === 'success') {
            toast.success('Duyệt đăng mua thành công');
            window.location.reload();
            // setReloadDatabase(true);
        } else {
            toast.error('Duyệt đăng mua  thất bại');
            // setReloadDatabase(false);
        }
    }
    async function KhongDuyetDangMua(id) {

        let res = await axios.put('/Dangmua-khongduyet', {
            id: id
        });
        if (res.data.status === 'success') {
            toast.success('Duyệt đăng mua thành công');
            window.location.reload();
            // setReloadDatabase(true);
        } else {
            toast.error('Duyệt đăng mua thất bại')
            // setReloadDatabase(false);
        }
    }

    async function XoaDangMua(id) {
        console.log(id);
        let res = await axios.delete('/xoadangmua?id=' + id);
        if (res.data.status === 'success') {
            toast.success('Xóa đăng mua thành công');
            window.location.reload();
            // setReloadDatabase(true);
        } else {
            toast.error('Xóa đăng mua thất bại');
            // setReloadDatabase(false);
        }
    }
    dangmua.forEach(el => {
        data = {
            _id: el._id,
            ten: el.ten,
            name: el.name,
            status: el.isAccept,
            Buyrate: el.Buyrate,
            Quantity: el.Quantity,
            Total: el.Total
        };
        buyAttributes.push(data);

    });

    for (var i = 0; i < buyAttributes.length; i++) {
        datause.push(buyAttributes[i]);
    }
    console.log(datause);
    $('#dataTable').dataTable({
        rowId: '_id',
        "bDestroy": true,
        "data": datause,
        "columns": [
            { "data": "ten", title: "Tên người mua" },
            { "data": "name", title: "Loại Coin" },
            { "data": "status", title: "Status" },
            { "data": "Buyrate", title: "Giá mua" },
            { "data": "Quantity", title: "Số lượng" },
            { "data": "Total", title: "Tổng Tiền" },
            {
                defaultContent: '<a type="button" class="btn btn-primary btn-detail"  data-toggle="modal" data-target="#DetailModal"  style= "margin-right: 20px"> <span class="glyphicon glyphicon-edit"></span>Chi Tiết</a>' +
                    '<a type="button" class="btn btn-primary btn-edit"  data-toggle="modal" data-target="#EditModal"  onclick=""  style= "margin-right: 20px"> <span class="glyphicon glyphicon-edit"></span>Sửa</a>' +
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

        LayDataDangMuaTheoID(id);
    });
    $('#dataTable tbody').find('tr td').on('click', '.btn-status-yes', function () {
        id = table.row($(this).parent('td')).id();

        DuyetDangMua(id);
    });
    $('#dataTable tbody').find('tr td').on('click', '.btn-status-no', function () {
        id = table.row($(this).parent('td')).id();

        KhongDuyetDangMua(id);
    });
    $('#dataTable tbody').find('tr td').on('click', '.btn-edit', function () {
        id = table.row($(this).parent('td')).id();

        LayDataDangMuaTheoID(id);
    });
    $('#dataTable tbody').find('tr td').on('click', '.btn-delete', function () {
        id = table.row($(this).parent('td')).id();

        XoaDangMua(id);
    });
    async function LayDataDangMuaTheoID(id) {
        let res = await axios.get('/laydangmuatheo?id=' + id);

        if (res.data.status === 'success') {
            setDataDangMua({
                _id: res.data.data._id,
                ten: res.data.data.ten,
                name: res.data.data.name,
                status: res.data.data.isAccept,
                Buyrate: res.data.data.Buyrate,
                Quantity: res.data.data.Quantity,
                Total: res.data.data.Total
            });
        } else {
            message.error(res.data.message);
        }

    }
    async function LayDanhSachDangMua() {
        let url = await axios.get('/danhsachbitcoin');
        if (url.data.status === 'success') {
            setdangmua(url.data.data);
        } else {
            message.error("Load fail");
        }
    }

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
    };
    useEffect(() => {

        LayDanhSachDangMua();


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
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <UserAddOutlined />
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Tài khoản </span>
                                        
                                    </a>
                                    {/* Dropdown - User Information */}
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
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
                                    <h6 className="m-0 font-weight-bold text-gray-800">Quản lí Đăng Mua</h6>
                                    <p type="button" className="btn btn-primary float-right" data-toggle="modal" data-target="#AddModal"  > <span className="glyphicon glyphicon-edit"></span>Thêm</p>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>

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
                                <h5 className="modal-title" id="exampleModalLabel">Xem chi tiết đăng mua</h5>

                            </div>
                            <div className="modal-body">
                                <form>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Tên người mua</label>
                                        <input type="text" className="form-control" defaultValue={dataDangMua.ten} disabled/>

                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Loại Coin</label>
                                        <input type="text" className="form-control" defaultValue={dataDangMua.name} disabled/>

                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Giá</label>
                                        <input type="text" className="form-control" defaultValue={dataDangMua.Buyrate} disabled/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Số Lượng</label>
                                        <input type="text" className="form-control" defaultValue={dataDangMua.Quantity} disabled />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Tổng cộng</label>
                                        <input type="text" className="form-control" defaultValue={dataDangMua.Total} disabled/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Trạng thái</label>
                                        <input type="text" className="form-control" defaultValue={dataDangMua.status} disabled/>
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
                                <h5 className="modal-title" id="exampleModalLabel">Sửa đăng mua</h5>

                            </div>
                            <div className="modal-body">
                                <form>
                                <Form.Group controlId="formBasicEmail">
                                        <label>Tên người mua</label>
                                        <input type="text" className="form-control" defaultValue={dataDangMua.ten} onChange={(e) => {
                                            setDataDangMua({
                                                ...dataDangMua,
                                                ten: e.target.value
                                            })
                                        }} />

                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Thể Loại coin</label>
                                        <input type="text" className="form-control" defaultValue={dataDangMua.name} onChange={(e) => {
                                            setDataDangMua({
                                                ...dataDangMua,
                                                name: e.target.value
                                            })
                                        }} />

                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <label>Giá</label>
                                        <input type="text" className="form-control" value={dataDangMua.Buyrate} onChange={(e) => {
                                            setDataDangMua({
                                                ...dataDangMua,
                                                Buyrate: e.target.value
                                            })
                                        }} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Số Lượng</label>
                                        <input type="text" className="form-control" value={dataDangMua.Quantity} onChange={(e) => {
                                            setDataDangMua({
                                                ...dataDangMua,
                                                Quantity: e.target.value
                                            })
                                        }} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Tổng cộng</label>
                                        <input type="text" className="form-control" value={dataDangMua.Total} onChange={(e) => {
                                            setDataDangMua({
                                                ...dataDangMua,
                                                Total: e.target.value
                                            })
                                        }} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Trạng Thái</label>
                                        <input type="text" className="form-control" value={dataDangMua.status} onChange={(e) => {
                                            setDataDangMua({
                                                ...dataDangMua,
                                                status: e.target.value
                                            })
                                        }} />
                                    </Form.Group>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Đóng</button>
                                <a className="btn btn-primary" onClick={() => {
                                    SuaDangMua(dataDangMua._id)
                                }}>Lưu lại</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
    )
}


