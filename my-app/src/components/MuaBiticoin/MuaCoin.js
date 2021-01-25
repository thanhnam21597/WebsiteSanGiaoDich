import React, { Fragment, useState, useEffect } from 'react';
import { Menutrangchu, Footertrangchu } from '../allJS';
import { axios } from '../../config/constant';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Form, Input } from 'antd'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
export default function BanCoin(props) {
    const ID = props.match.params.id; // sai dong nay
    const IDBan2 = props.match.params.idBan;
    const user = useSelector(state => state.user);
    const [soLuong, setSoLuong] = useState(0);
    const [tienphaitra, setTienPhaiTra] = useState({
        tien: ''
    });
    const [Bitcoin, setBitcoin] = useState({
        name: '',
        Quantity: '', //5
        Total: '',
        Buyrate: '', //90
        Tenmua: '',
        Amount: '',
    })
    const [soLuongNhap2,setSoLuongNhap2]=useState({
        soluong2:''
    });
    console.log(soLuongNhap2);
    console.log(Bitcoin);
    const [MuaCoin, setMuaCoin] = useState({
        Tenname: '',
        Quantity1: '',
        Buyrate: '',
        Total: '',
        trangThai: 'mua',
    });

    // const[soluongnhap,setsoluong]=useState({
    //     soluong:'',
    //     soluongconlai:'',
    // })
    


    
    async function LayBitcoinTheoID(BitcoinID) { // tai sao t sai BuyEx m vo mua
        let res = await axios.get('/danhsachbitcoin2?id3=' + ID);
        if (res.data.status === 'thanhcong') {
            console.log(res.data.data);
            // hien thi chi tiet bitcoin
            setBitcoin({
                ten: res.data.data.ten,
                name: res.data.data.name,
                Quantity: res.data.data.Quantity,
                Total: res.data.data.Total,
                Buyrate: res.data.data.Buyrate, //90
                Tenmua: res.data.data.Tenmua,

            });
            // khi thanh toan luu lai m mua thang nao
            setMuaCoin({
                // id thang ban
                Tenmua1: res.data.data.Tenmua1,
                name1: res.data.data.name1,
                Buyrate1: res.data.data.Buyrate1,
                Quantity1: res.data.data.Quantity1,
                Total1: res.data.data.Total1
            });
        } else {
            alert('mua bitcoin that bai');
        }
    }

    async function CapNhatTienmuaThanhToan() {
        
        let res = await axios.put('/CapNhatsoluongkhithuchiengiaodichmua?id='+user.email, {
           
            Amount:  user.Amount - tienphaitra.tien
        });
        if (res.data.status === 'success') {
            console.log("Cập nhật ví Tiền  thành công");
            // setReloadDatabase(true);
        } else {
            console.log("Cập nhật ví tiền thất bại");
            // setReloadDatabase(false);
        }
    }

    async function MuaCoin1() {

        let res = await axios.post('/muabitcoin', {
            ten: Bitcoin.ten,
            name: Bitcoin.name,
            Tenmua: user.ten,
            idThangMua: user.email,
            Quantity: soLuongNhap2.soluong2, //3
            Buyrate: Bitcoin.Buyrate,
            tienphaitra:tienphaitra.tien,
            Amount: user.Amount - tienphaitra.tien
        });
        
        Bitcoin.Amount = user.Amount - tienphaitra.tien;
        //soluongnhap.soluongconlai = Bitcoin.Quantity-soluongnhap.soluong;

        // var tb = document.getElementById("thongbao").value;
        if (res.data.status === 'thanhcong' && (tienphaitra.tien <= user.Amount) && Bitcoin.Amount >= 0) {
            toast.success(`Mua thành công. Số tiền của quý khách còn lại là: ${Bitcoin.Amount}`);

            // tb=`Mua thành công. Số tiền của quý khách còn lại là: ${user.Amount - Bitcoin.Total }-`
        } else {
            // alert(`Mua thất bại. Số Tiền của bạn là : ${user.Amount}. Bạn cần nạp ${  user.Amount - Bitcoin.Total}`);
            toast.error(`Mua thất bại. Số Tiền của bạn là : ${user.Amount}. Bạn cần nạp ${user.Amount - tienphaitra.tien}`);
            // tb=`Mua thất bại. Số Tiền của bạn là : ${user.Amount}. Bạn cần nạp ${Bitcoin.Total - user.Amount}`
        }
    }
    
    console.log("gia tien" + Bitcoin.Buyrate);
    //Tính Tiền
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    async function CapNhatSoLuongSauKhiMua() {
        
        let res = await axios.put('/SoLuongSauMua?id='+IDBan2, {
           
            Quantity: Bitcoin.Quantity-soLuongNhap2.soluong2
        });
        if (res.data.status === 'success') {
            console.log("Cập nhật ví Tiền  thành công");
            // setReloadDatabase(true);
        } else {
            console.log("Cập nhật ví tiền thất bại");
            // setReloadDatabase(false);
        }
    }
    
  
    // console.log("soluongnhap"+soluongnhap.soluong);
    // console.log("soluongconlai"+soluongnhap.soluongconlai);

    console.log(Bitcoin);
    console.log(MuaCoin);

    useEffect(() => {
        LayBitcoinTheoID();


    }, [])

    return (
        <Fragment>

            <div className="wrapper row1" >

                <Menutrangchu></Menutrangchu>
            </div>

            <div className="container pl-4 pr-4" >
                <div className="col-lg-12">
                    <div className="infor">
                        <h1 style={{ textAlign: 'center' }}>Mua coin</h1>
                        <div>

                            <Table responsive style={{ width: '100%' }}>
                                <thead className="thead-dark" style={{ width: '70%' }}>
                                    <tr>
                                        <th style={{ width: '30%' }}>Thông tin người bán</th>
                                        <td style={{ textAlign: 'center' }}></td>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr>
                                        <th style={{ width: '30%' }}>Tên người bán</th>
                                        <td style={{ textAlign: 'center' }}>{Bitcoin.ten}</td>

                                    </tr>

                                 
                                    <tr>
                                        <th style={{ width: '30%' }}>Số lượng tối đa</th>
                                        <td style={{ textAlign: 'center' }} id="dongia" > {Bitcoin.Quantity}</td>

                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }} >Loại Tiền</th>
                                        <td id="ratetoUSD" style={{ textAlign: 'center' }}>{Bitcoin.name}</td>

                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Phương thức thanh toán</th>
                                        <td style={{ textAlign: 'center' }}>Trực tiếp qua ví</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '30%' }}>Vị trí</th>
                                        <td style={{ textAlign: 'center' }}>Việt Nam</td>
                                    </tr>
                                    <tr>
                                        <th>Thời gian thanh toán</th>
                                        <td style={{ textAlign: 'center' }}>5 phút</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <form>
                                <div style={{ float: 'left' }}>
                                    <h6>Vui lòng nhập số lượng mua  </h6>
                                    <input
                                        type="number"
                                        max={Bitcoin.Quantity}
                                        min="1"
                                        className="form-control"
                                        onChange={(e) => {
                                            setSoLuongNhap2({
                                                ...soLuongNhap2,
                                                soluong2:e.target.value
                                            })
                                            setTienPhaiTra({
                                                ...tienphaitra,
                                                tien: e.target.value * Bitcoin.Buyrate
                                            })
                                        }}>

                                    </input>
                                  
                                </div>



                                <div style={{ float: 'right', marginRight: '60px', marginBottom: '20px' }}>
                                    <h6>Số tiền phải trả  </h6>
                                    <p id="tongtien" style={{ marginLeft: '40px' }}> {Number(tienphaitra.tien)}</p>


                                </div>
                                <button type="button" style={{ backgroundColor: 'blue', color: 'white' }} className="btn btn-primary bg-info btn-block"
                                    onClick={(e) => {
                                        //CapNhatSoLuongConLai();
                                        CapNhatSoLuongSauKhiMua();
                                        CapNhatTienmuaThanhToan();
                                        MuaCoin1();
                                    }}
                                >Mua Coin</button>
                            </form>



                           


                        </div>
                    </div>
                </div>
            </div>



            <div className="footer" style={{ backgroundColor: '#3366FF' }}>
                <Footertrangchu> </Footertrangchu>
            </div>
        </Fragment>





    );
}
