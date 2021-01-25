import React, { useState, useEffect } from 'react'
import { SellExchanged } from '../../allJS';
import { axios } from '../../../config/constant';
import { Input, Row, Col, Button, Pagination, message } from 'antd';
import { Table } from 'reactstrap';
const DanhSachDangBan = () => {
  const [dataSell, setDataSell] = useState([]); // khai báo biến có kiểu mảng

  //gọi api kiểu get lấy dữ liệu của product
  async function getDataSell() {
    let resData = await axios.get('/manage-sellexchange');
    if (resData.data.status === 'success') {
      setDataSell(resData.data.data);
    } else {
      message.error("Lấy dữ liệu data sản phẩm thất bại");
    }
  }
  console.log(dataSell); // api tra ve check tra ve hay khong
  // gọi lại hàm
  useEffect(() => {

    getDataSell();
  }, []);
  return (


    <div className="card">
      <div className="card-header">
        Quản lý khách hàng
      </div>
      <div className="card-body">

        <Table bordered style={{ marginTop: '10px' }}>
          <thead>
            <tr>
              <th> Tên bitcoin </th>

              <th> Total </th>
              <th> Quantity </th>
              <th>Chuc nang</th>
            </tr>
          </thead>
          {
            dataSell.map((item, index) => {
              return <tbody>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.Total}</td>
                  <td>{item.Quantity}</td>
                
                  <td>
                    <Button
                      style={{ marginLeft: '20px', maxWidth: '50px' }}
                      onClick={() => {
                        //XoaDanhMuc(item._id);
                      }}>
                      Xóa
                                                        </Button>
                    <Button
                      style={{ marginLeft: '20px', maxWidth: '50px' }}
                      data-toggle="modal"
                      data-target="#exampleModalLong2"
                      onClick={() => {
                        //LayDataMotDanhMuc(item._id);
                      }}>
                      Sửa
                                                        </Button>
                  </td>
                </tr>
              </tbody>
            })
          }
        </Table>
      </div>
    </div>



  );
}

export default DanhSachDangBan
