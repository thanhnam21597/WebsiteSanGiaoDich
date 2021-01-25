import React, { Fragment, useState, useEffect } from 'react';
import { axios } from '../../config/constant';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';

//import { QLCategoryComponent, QLDoanhThuComponent, QLBaiVietComponent, QLBlogComponent } from '../index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Menu, Row, Col } from 'antd';
const { SubMenu } = Menu;
export default function TKnguoidung() {
    const match = useRouteMatch();
    return (
        <Fragment>
            <Fragment>
           
                <Row >
                    <Col xs={7} sm={6} md={4} lg={4}>
                        <Menu defaultOpenKeys={['sub1', 'sub2']}
                            mode="inline" theme="light"
                        >
                            <SubMenu key="sub1" title={<span><i className="far fa-address-card"></i>Thông tin người dùng</span>}>
                                <Menu.Item >
                                    <Link to={`${match.url}/qldanhmuc`} style={{ textDecoration: 'none' }}>Tài khoản và mật khẩu</Link>
                                </Menu.Item>
                                <Menu.Item >
                                    <Link to={`${match.url}/qldanhmuc`} style={{ textDecoration: 'none' }}>Đổi mật khẩu</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><i class="fas fa-history"></i>Lich sử</span>}>
                                <Menu.Item >
                                    <Link to={`${match.url}/qldanhmuc`} style={{ textDecoration: 'none' }}>Thanh toán</Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
                    <Col xs={12} sm={18} md={20} lg={20}>
                        <Switch>
                            {/* <Route exact path={`${match.url}/qldanhmuc`} component={QLCategoryComponent}></Route>
                            <Route exact path={`${match.url}/qldoanhthu`} component={QLDoanhThuComponent}></Route>
                            <Route exact path={`${match.url}/qlbaiviet`} component={QLBaiVietComponent}></Route>
                            <Route exact path={`${match.url}/qlblog`} component={QLBlogComponent}></Route> */}
                        </Switch>
                    </Col>
                </Row >
            </Fragment>
        </Fragment>
    )
}
