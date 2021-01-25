import React, { Fragment, useState, useEffect } from 'react';
import { Menutrangchu, Footertrangchu } from '../allJS';
import { axios } from '../../config/constant';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
export default function BanCoin(props) {
    const ID = props.match.params.id; // sai dong nay
    const IDMua2 = props.match.params.idMua;
    const [Bitcoin, setBitcoin] = useState({
        name: '2',
        Quantity: 'asd', //5
        Total: 'asd',
        Sellrate: 'asd', //90
        Tenban: 'asdasd',
        Amount: '',
    })
    const [soLuongNhap2,setSoLuongNhap2]=useState({
        soluong2:''
    });
    const user = useSelector(state => state.user);
    const [BanCoin, setBanCoin] = useState({
        Tenban: '',
        Quantity: '', //5
        Total: '',
        Sellrate: '', //90
    });
    const [tienphaitra, setTienPhaiTra] = useState({
        tien: ''
    });
    const [soluongnhap ,setsoluongnhap]= useState({
        soluongnhap: ' '
    })
    async function LayBanCoinTheoID() {
        let res = await axios.get('/danhsachChitietbancoin?id1=' + ID);
        if (res.data.status === 'thanhcong') {
            // hien thi chi tiet bitcoin
            setBitcoin({
                ten: res.data.data.ten,
                name: res.data.data.name,
                Quantity: res.data.data.Quantity,
                Total: res.data.data.Total,
                Sellrate: res.data.data.Sellrate, //90
                Tenban: res.data.data.Tenban,

            });
            // khi thanh toan luu lai m mua thang nao

            setBanCoin({
                Tenban1: res.data.data.Tenban, //
                name1: res.data.data.name,
                Sellrate1: res.data.data.Sellrate,
                Quantity1: res.data.data.Quantity,
                Total1: res.data.data.Total,
                
            });
        } else {
            alert('mua bitcoin that bai');
        }
    }

    // function TinhTongTien() {
    //     Bitcoin.Quantity = document.getElementById("soluongid").value; // lay so luong 
    //     //console.log(MuaCoin.Quantity);
    //     // BanCoin.Sellrate = document.getElementById("dongia").value;
    //     Bitcoin.Total = Bitcoin.Quantity * Bitcoin.Sellrate ;
    //     document.getElementById("tongtien").innerHTML = Bitcoin.Total;
    //     console.log("Tiền" + Bitcoin.Total);

    // }
    

    async function BanCoin1() {

        let res = await axios.post('/bancoin', {
            ten: Bitcoin.ten,//tên người mua
            name: Bitcoin.name,//tên thể loại coin
            Tenban: user.ten,//tên người bán 
            idThangMua :user.email,
            Quantity: soLuongNhap2.soluong2, 
            Sellrate: Bitcoin.Sellrate,
            tienphaitra:tienphaitra.tien,
            Amount: user.Amount + tienphaitra.tien
        });

        Bitcoin.Amount = user.Amount + tienphaitra.tien;

        if (res.data.status === 'thanhcong') {
            toast.success(`Bán  thành công. Số tiền của quý khách  là: ${Bitcoin.Amount}`);
        } else {
            toast.error(`Bán thất bại. Số Tiền của bạn là : ${user.Amount}`);
        }
    }
 

    async function CapNhatTienBanThanhToan() {
        
        let res = await axios.put('/CapNhatvitienbankhachhangban?id='+user.email, {
           
            Amount:  user.Amount + tienphaitra.tien
        });
        if (res.data.status === 'success') {
            console.log("Cập nhật ví Tiền  thành công");
            // setReloadDatabase(true);
        } else {
            console.log("Cập nhật ví tiền thất bại");
            // setReloadDatabase(false);
        }
    }

    async function CapNhatSoLuongSauKhiBan() {
        
        let res = await axios.put('/SoLuongSauBan?id='+IDMua2, {
           
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

    useEffect(() => {
        LayBanCoinTheoID()
    }, [])
    return (
        <Fragment>
            <div className="wrapper row1" >

                <Menutrangchu></Menutrangchu>
            </div>

            <div className="container pl-4 pr-4" >
                <div className="col-lg-12">
                    <div className="infor">
                        <h1 style={{ textAlign: 'center' }}>Bán coin</h1>
                        <div>

                            <Table responsive style={{ width: '100%' }}>
                                <thead className="thead-dark" style={{ width: '70%' }}>
                                    <tr>
                                        <th style={{ width: '30%' }}>Thông tin người mua</th>
                                        <td style={{ textAlign: 'center' }}></td>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr>
                                        <th style={{ width: '30%' }}>Tên người mua</th>
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
                                    <h6>Vui lòng nhập số lượng bán  </h6>
                                    <input
                                        type="number"
                                        max={Bitcoin.Quantity}
                                        min="0"
                                        className="form-control"
                                        onChange={(e) => {
                                            setSoLuongNhap2({
                                                ...soLuongNhap2,
                                                soluong2:e.target.value
                                            })
                                            setTienPhaiTra({
                                                ...tienphaitra,
                                                tien: e.target.value * Bitcoin.Sellrate
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
                                        CapNhatSoLuongSauKhiBan();
                                        CapNhatTienBanThanhToan();
                                        BanCoin1();
                                    }}
                                >Bán Coin</button>

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
