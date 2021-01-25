import React, { Fragment, useState, useEffect } from 'react';
import { axios } from '../../config/constant';
import { message } from 'antd';
import 'antd/dist/antd.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons'
// import { useHistory } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
// import { Identicon } from 'ethereum-react-components';
import { useDispatch, useSelector } from 'react-redux';
export default function NapTien(props) {
    const [viTien, setViTien] = useState([]);
    const [tien, setTien] = useState({
        
        Amount :'', //2300
    });
    console.log("tien sau khi nap vao "+typeof(tien.Amount)+"la"+tien.Amount);
   
    const user = useSelector(state => state.user);

    async function LayDanhSachTheoViTien() {
        let res = await axios.get('/naptien');
        if (res.data.status === 'success') {
            setViTien(res.data.data);
        } else {
            message.error("lay danh sach theo vi tien that bai");
        }
    }
     
    
    // const [ removeCookie] = useCookies();
    // const history = useHistory();
   
    useEffect(() => {
        LayDanhSachTheoViTien();
    }, []);
    async function DuyetNapTien(id) {

        let res = await axios.put('/NapTienDuyet?id='+id, {
            TienNap: tien.Amount
        });
            // tien.Amount =  tien.giatien + NapTien.Amount
            // console.log(res);
            // console.log(tien.Amount)
        if (res.data.status === 'success') {


            toast.success(`Chúc mừng. Số tiền của quý khách la ${tien.Amount}. Vui lòng mua Bitcoin `);
            window.location.reload();
        } else {
            toast.error("Nạp tiền không thành công");
        }
    }
  

    // const dangXuat = () => {
    //     removeCookie('userID');
    //     history.push('/');
    //     window.location.pathname = "/";
    // };

    

    const [NapTien, setNapTien] = useState({
        _id: '',
        NameType: '',
        Amount: '',
        AmoutCode: ''
    });
    async function LayDanhSachThongTinchitietNap(id) {
        console.log(id);
        let res = await axios.get('/laythongtinchitietnapID?id=' + id);
        
        console.log(res);

        if (res.data.status === 'thanhcong') {

            setNapTien({
                
                _id: res.data.data._id,
                ten: res.data.data.ten,
                NameType: res.data.data.NameType,
                Amount: res.data.data.Amount,
                AmoutCode: res.data.data.AmountCode
            })

        } else {
            alert(res.data.message);
        }
    }
    
    const dispatch = useDispatch();
    const logout =()=>{
        dispatch({
            type:'LOGOUT',
            payload: null
        })
    };
    console.log(NapTien);
    
    useEffect(() => {
     
    }, )
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

                    {/* Divider */}
                     {/* Nav Item - Tables */}
                     <li className="nav-item">
                        <Link to='/RutTien'>
                            <p className="nav-link" href="tables.html">
                                <i className="fas fa-fw fa-table" />
                                <span>Quản lý Rút Tiền  </span></p>
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
                        {/* Form Nạp Tien */}
                        <div className="container-fluid">
                            {/* Page Heading */}

                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-gray-800">Nạp Tiền</h6>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table" style={{textAlign:'center'}}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">Tiền hiện tại</th>
                                                    <th scope="col">Thể loại Tiền</th>
                                                    {/* <th scope="col">Amount Code</th> */}
                                                  
                                                    <th scope="col">Chuc Nang</th>
                                                </tr>
                                            </thead>
                                            {
                                                viTien.map((item, index) => {
                                                    return <tbody key={index}>
                                                        <tr>
                                                            <td>{item.ten}</td>
                                                            <td>{item.Amount}</td>
                                                            <td>{item.NameType}</td>
                                                            {/* <td><Identicon address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" /></td> */}

                                                        
                                                            <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => {

                                                                LayDanhSachThongTinchitietNap(item._id);
                                                            }}>Nạp Tiền</button></td>


                                                            {/* <!-- Modal --> */}
                                                            <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog" role="document">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title" id="exampleModalLabel">Thông Tin chi tiết Nạp</h5>
                                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <label><strong >TÊN:</strong>{NapTien.ten}</label> <br></br>
                                                                            <label><strong >THỂ LOẠI TIỀN :</strong>{NapTien.NameType}</label> <br></br>
                                                                            {/* <label><strong >Mã Code : </strong>{NapTien.AmoutCode}</label> <br></br> */}
                                                                            <label><strong >TIỀN HIỆN TẠI :</strong>{NapTien.Amount}</label> <br></br>
                                                                            <label><strong >TIỀN MUỐN NẠP : </strong><input type="number" min="0" onChange={(e) => {
                                                                                console.log("chuoi hay so"+typeof(e.target.value));
                                                                                setTien({
                                                                                    ...tien,
                                                                                    Amount: Number(e.target.value) + NapTien.Amount // 2100
                                                                                })
                                                                            }} /></label>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy </button>
                                                                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => {

                                                                               DuyetNapTien(NapTien._id);
                                                                            }}>Xác nhận</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </tr>
                                                    </tbody>
                                                })
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
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
       
            </div>


        </Fragment>
    )
}


