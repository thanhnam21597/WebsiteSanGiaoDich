import React, { Fragment, useState, useEffect } from 'react';

import { axios } from '../../config/constant';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons'
import $ from "jquery";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
export default function QuanLyGiaoDich() {
    const [giaodich, setgiaodich] = useState([]);
    const [dataGiaoDich, setDataGiaoDich] = useState({
        _id: '',
        tenBan: "",
        tenMua: "",
        theLoaiTien: "",
        soLuong: "",
        trangThai: "",
        viTien: "",
        tienphaitra: "",
    });
    const [dataThemGiaoDich, setDataThemGiaoDich] = useState({
        _id: '',
        tenBan: "",
        tenMua: "",
        theLoaiTien: "",
        soLuong: "",
        trangThai: "",
        viTien: "",
        tienphaitra: "",
    });
    var id;
    var data;
    var datause = [];

    const giaodichAttributes = [];
    async function ThemGiaoDich() {

        let res = await axios.post('/themgiaodich', {
            tenBan: dataThemGiaoDich.tenBan,
            tenMua: dataThemGiaoDich.tenMua,
            theLoaiTien: dataThemGiaoDich.theLoaiTien,
            soLuong: dataThemGiaoDich.soLuong,
            trangThai: dataThemGiaoDich.trangThai,
            viTien: dataThemGiaoDich.viTien,
            tienphaitra: dataThemGiaoDich.tienphaitra,
        
        });

        if (res.data.status === 'success') {
            toast.success('Thêm thành công');
            window.location.reload();
            // setReloadDatabase(true);
        } else {
            toast.error('Thêm thất bại');
            // setReloadDatabase(false);
        }
    }
    async function SuaGiaoDich(id) {
        console.log(dataGiaoDich);
        let res = await axios.put('/suagiaodich', {

            tenBan: dataThemGiaoDich.tenBan,
            tenMua: dataThemGiaoDich.tenMua,
            theLoaiTien: dataThemGiaoDich.theLoaiTien,
            soLuong: dataThemGiaoDich.soLuong,
            trangThai: dataThemGiaoDich.trangThai,
            viTien: dataThemGiaoDich.viTien,
            tienphaitra: dataThemGiaoDich.tienphaitra,


            id: id,            

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


    async function XoaGiaoDich(id) {
        console.log(id);
        let res = await axios.delete('/xoagiaodich?id=' + id);
        if (res.data.status === 'success') {
            toast.success('Xóa thành công');
            window.location.reload();
            // setReloadDatabase(true);
        } else {
            toast.error('Xóa thất bại')
            // setReloadDatabase(false);
        }
    }
    giaodich.forEach(el => {
        data = {
         
            _id: el._id,
            // ten: el.ten,
            // Tenmua: el.Tenmua,
            // name: el.name,
            // Quantity: el.Quantity,
            // Amount: el.Amount,
            // Total: el.Total,

            tenBan: el.tenBan,
            tenMua: el.tenMua,
            theLoaiTien: el.theLoaiTien,
            soLuong: el.soLuong,
            trangThai: el.trangThai,
            viTien: el.viTien,
            tienphaitra: el.tienphaitra,
        };
        giaodichAttributes.push(data);

    });

    for (var i = 0; i < giaodichAttributes.length; i++) {
        datause.push(giaodichAttributes[i]);
    }
    console.log(datause);
    $('#dataTable').empty();

    $('#dataTable').dataTable({
        "bDestroy": true,
        rowId: '_id',
        "data": datause,
        "columns": [
            { "data": "tenBan", title: "Người bán" },
            { "data": "tenMua", title: "Người mua" },
            { "data": "theLoaiTien", title: "Thể loại Tiền" },
            { "data": "soLuong", title: "Số lượng Coin " },
            { "data": "trangThai", title: "Trạng thái " },
            { "data": "tienphaitra", title: "Số tiền giao dịch" },
            { "data": "viTien", title: "Số tiền sau khi thực hiện giao dịch" },
            {
                defaultContent: '<a type="button" class="btn btn-primary btn-detail"  data-toggle="modal" data-target="#DetailModal"  style= " margin-right: 5px"> <span class="glyphicon glyphicon-edit" ></span>Chi Tiết</a>' +
                    '<a type="button" class="btn btn-primary btn-edit"  data-toggle="modal" data-target="#EditModal"  onclick=""  style= "  margin-right: 5px"> <span class="glyphicon glyphicon-edit"></span>Sửa</a>' +
                    '<a type="button" class="btn btn-primary btn-delete"  > <span class="glyphicon glyphicon-edit" style= " margin-top: 10px"></span>Xóa</a>',
                title: "Chức năng"

            }
        ]
    });
    var table = $('#dataTable').DataTable();
    $('#dataTable tbody').find('tr td').on('click', '.btn-detail', function () {
        id = table.row($(this).parent('td')).id();

        LayDataGiaoDichTheoID(id);
    });
    $('#dataTable tbody').find('tr td').on('click', '.btn-edit', function () {
        id = table.row($(this).parent('td')).id();

        LayDataGiaoDichTheoID(id);
    });
    $('#dataTable tbody').find('tr td').on('click', '.btn-delete', function () {
        id = table.row($(this).parent('td')).id();

        XoaGiaoDich(id);
    });
    async function LayDataGiaoDichTheoID(id) {
        console.log(id);
        let res = await axios.get('/LaydatagiaodichtheoIDADmin?id=' + id);

        if (res.data.status === 'success') {
            setDataGiaoDich({
                tenBan: res.data.data.tenBan,
                tenMua: res.data.data.tenMua,
                theLoaiTien: res.data.data.theLoaiTien,
                soLuong: res.data.data.soLuong,
                trangThai: res.data.data.trangThai,
                viTien: res.data.data.viTien,
                tienphaitra: res.data.data.tienphaitra,

                _id: res.data.data._id,
    
            });
        } else {
            message.error(res.data.message);
        }

    }
    async function LayDanhSachGiaoDich() {
        let url = await axios.get('/manage-transaction');
        if (url.data.status === 'success') {
            setgiaodich(url.data.data);
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

        LayDanhSachGiaoDich();


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
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Admin</span>

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
                                    <h6 className="m-0 font-weight-bold text-gray-800">Quản lí Giao Dịch</h6>
                                    <p type="button" className="btn btn-primary float-right" data-toggle="modal" data-target="#AddModal"  > <span className="glyphicon glyphicon-edit"></span>Thêm</p>
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
                    <i className="fas fa-angle-up" />
                </a>
                {/* Logout Modal*/}
                <div className="modal fade" id="DetailModal" tabIndex={-1} role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Xem chi tiết Giao dịch</h5>

                            </div>
                            <div className="modal-body">
                                <form>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Người bán </label>
                                        <input type="text" className="form-control" defaultValue={dataGiaoDich.tenBan} disabled />

                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Người mua </label>
                                        <input type="text" className="form-control" defaultValue={dataGiaoDich.tenMua} disabled />

                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Thể loại tiền</label>
                                        <input type="text" className="form-control" defaultValue={dataGiaoDich.theLoaiTien}disabled />

                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <label>Số Lượng Coin  </label>
                                        <input type="text" className="form-control" defaultValue={dataGiaoDich.soLuong} disabled/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Trạng thái</label>
                                        <input type="text" className="form-control" defaultValue={dataGiaoDich.trangThai} disabled/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Số Tiền giao dịch</label>
                                        <input type="text" className="form-control" defaultValue={dataGiaoDich.tienphaitra} disabled/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <label>Số Tiển sau khi thực hiện giao dịch</label>
                                        <input type="text" className="form-control" defaultValue={dataGiaoDich.viTien} disabled />
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
                                <h5 className="modal-title" id="exampleModalLabel">Sửa Giao dịch</h5>

                            </div>
                            <div className="modal-body">
                                <form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Người bán </Form.Label>
                                        <input type="text" className="form-control" defaultValue={dataGiaoDich.tenBan} onChange={(e) => {
                                            setDataGiaoDich({
                                                ...dataGiaoDich,
                                                tenBan: e.target.value
                                            })
                                        }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Người mua </Form.Label>
                                        <input type="text" className="form-control" defaultValue={dataGiaoDich.tenMua} onChange={(e) => {
                                            setDataGiaoDich({
                                                ...dataGiaoDich,
                                                Tenmua: e.target.value
                                            })
                                        }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Thể loại Tiền</Form.Label>
                                        <input type="text" className="form-control" defaultValue={dataGiaoDich.theLoaiTien} onChange={(e) => {
                                            setDataGiaoDich({
                                                ...dataGiaoDich,
                                                theLoaiTien: e.target.value
                                            })
                                        }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Số Lượng Coin </Form.Label>
                                        <input type="text" className="form-control" defaultValue={dataGiaoDich.soLuong} onChange={(e) => {
                                            setDataGiaoDich({
                                                ...dataGiaoDich,
                                                soLuong: e.target.value
                                            })
                                        }}

                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Trạng thái </Form.Label>
                                        <input type="text" className="form-control" defaultValue={dataGiaoDich.trangThai} onChange={(e) => {
                                            setDataGiaoDich({
                                                ...dataGiaoDich,
                                                trangThai: e.target.value
                                            })
                                        }}

                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Số Tiền giao dịch </Form.Label>
                                        <input type="text" className="form-control" defaultValue={dataGiaoDich.tienphaitra} onChange={(e) => {
                                            setDataGiaoDich({
                                                ...dataGiaoDich,
                                                tienphaitra: e.target.value
                                            })
                                        }}

                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Số Tiển sau khi thực hiện giao dịch</Form.Label>
                                        <input type="text" className="form-control" defaultValue={dataGiaoDich.viTien} onChange={(e) => {
                                            setDataGiaoDich({
                                                ...dataGiaoDich,
                                                viTien: e.target.value
                                            })
                                        }} />
                                    </Form.Group>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Đóng</button>
                                <p className="btn btn-primary" onClick={() => {
                                    SuaGiaoDich(dataGiaoDich._id)
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
                                <h5 className="modal-title" id="exampleModalLabel">Thêm Giao dịch</h5>

                            </div>
                            <div className="modal-body">
                                <form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Người bán</Form.Label>
                                        <input type="text" className="form-control" onChange={(e) => {
                                            setDataThemGiaoDich({
                                                ...dataThemGiaoDich,
                                                tenBan: e.target.value
                                            })
                                        }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Người mua </Form.Label>
                                        <input type="text" className="form-control" onChange={(e) => {
                                            setDataThemGiaoDich({
                                                ...dataThemGiaoDich,
                                                tenMua: e.target.value
                                            })
                                        }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Thể loại tiền </Form.Label>
                                        <input type="text" className="form-control" onChange={(e) => {
                                            setDataThemGiaoDich({
                                                ...dataThemGiaoDich,
                                                theLoaiTien: e.target.value
                                            })
                                        }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Số Lượng Coin</Form.Label>
                                        <input type="text" className="form-control" onChange={(e) => {
                                            setDataThemGiaoDich({
                                                ...dataThemGiaoDich,
                                                soLuong: e.target.value
                                            })
                                        }}

                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Trạng thái</Form.Label>
                                        <input type="text" className="form-control" onChange={(e) => {
                                            setDataThemGiaoDich({
                                                ...dataThemGiaoDich,
                                                trangThai: e.target.value
                                            })
                                        }}

                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Số Tiền giao dịch</Form.Label>
                                        <input type="text" className="form-control" onChange={(e) => {
                                            setDataThemGiaoDich({
                                                ...dataThemGiaoDich,
                                                tienphaitra: e.target.value
                                            })
                                        }}

                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Số Tiền sau khi thực hiện giao dịch</Form.Label>
                                        <input type="text" className="form-control" onChange={(e) => {
                                            setDataThemGiaoDich({
                                                ...dataThemGiaoDich,
                                                viTien: e.target.value
                                            })
                                        }} />
                                    </Form.Group>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Đóng</button>
                                <button className="btn btn-primary" onClick={() => {
                                    ThemGiaoDich()
                                }}>Lưu lại</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
    )
}


