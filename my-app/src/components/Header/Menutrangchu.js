import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';



import { useSelector,useDispatch } from 'react-redux';

import { Menu } from 'antd';
import {
    HomeOutlined,
    AlignCenterOutlined,
    TableOutlined,
    UserOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
function Menutrangchu(props) {


    const user = useSelector(state => state.user); // lay state trong store ra sai
    const dispatch = useDispatch();

    console.log(user);
    const logout =()=>{
        dispatch({
            type:'LOGOUT',
            payload: null
        })
    };
    
    console.log(user);
    return (

     
        <Fragment>

            <Menu mode="horizontal">
                <Menu.Item key="trangchu" icon={<HomeOutlined />}>
                    <Link to='/'>
                        Trang chủ
                    </Link>
                </Menu.Item>
                <Menu.Item key="Dulieuthitruong" icon={<AlignCenterOutlined />}>
                    <Link to='/DulieuthitruongA'>
                        Dữ liệu thị trường
                    </Link>
                </Menu.Item>
                <SubMenu
                    key="SubMenu"
                    icon={<TableOutlined />}
                    title="Danh sách"
                >
                    <Menu.Item key="setting:1"  ><Link to='/danhsachmuacoin/'>Danh sách Mua coin</Link></Menu.Item>
                    <Menu.Item key="setting:1"  ><Link to='/danhsachbancoin/'>Danh sách Bán coin</Link></Menu.Item>
                </SubMenu>
                {
                    user && (
                        <Fragment>
                            <SubMenu
                                key="SubMenu2"
                                icon={<TableOutlined />}
                                title="Khách hàng"
                            >
                                <Menu.Item key="setting:1"  ><Link to='/dangmuacoin'>Đăng mua</Link></Menu.Item>
                                <Menu.Item key="setting:2"><Link to='/dangbanCoin'>Đăng bán</Link></Menu.Item>
                            </SubMenu>

                            <SubMenu
                                key="SubMenu4"
                                icon={<UserOutlined />}
                                title={user.ten && user.ten.split("@")[0]} 
                                className="float-right"
                            > 
                                <Menu.Item icon={<UsergroupAddOutlined />} key="setting:1"  ><Link to='/thongtinvi'>  Thông tin ví</Link></Menu.Item>
                                <Menu.Item icon={<UserOutlined />} key="setting:2"><Link to='/laygiaodichtheo'> Lịch sử giao dịch</Link></Menu.Item>
                                <Menu.Item icon={<UserOutlined />} key="setting:3"><Link to='/LayThongtinTaiKhoanID'> Chỉnh sửa thông tin cá nhân</Link></Menu.Item>
                                <Menu.Item icon={<UserOutlined />} key="setting:4"><Link to='/' onClick={logout}> Dang xuat</Link></Menu.Item>
                            </SubMenu>
                        </Fragment>
                    )}
                {
                    !user && (

                        <SubMenu
                            key="SubMenu4"
                            icon={<UserOutlined />}
                            title="Tài khoản "
                            className="float-right"
                        >
                            <Menu.Item icon={<UsergroupAddOutlined />} key="setting:1"  ><Link to='/Dangky'>  Đăng ký</Link></Menu.Item>
                            <Menu.Item icon={<UserOutlined />} key="setting:2"><Link to='/Dangnhap'>   Đăng nhập</Link></Menu.Item>
                        </SubMenu>
                    )
                }








            </Menu>
        </Fragment>
    );
}

export default Menutrangchu;