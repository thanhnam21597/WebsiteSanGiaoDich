import React, { Fragment } from 'react';
import { Footertrangchu, Menutrangchu } from '../allJS';
import { Link } from 'react-router-dom';
import '../Trangchu/Assert/vendor/animate/animate.css';


import '../Trangchu/Assert/css/maicons.css';
import '../Trangchu/Assert/css/mobster.css';


function TrangChu() {

    // const [dataProduct, setDataProduct] = useState([]); // khai báo biến có kiểu mảng

    // //gọi api kiểu get lấy dữ liệu của product
    // async function getDataProduct() {
    //     let resData = await axios.get('/products');
    //     if (resData.data.status === 'success') {
    //         setDataProduct(resData.data.data);
    //     } else {
    //         // message.error("Lấy dữ liệu data sản phẩm thất bại");
    //     }
    // }
    // // api tra ve check tra ve hay khong
    // // gọi lại hàm  
    // console.log(dataProduct);
    // useEffect(() => {

    //     getDataProduct();
    // }, []);
    return (
        <Fragment>
            {/* <div className="wrapper row4">
                    <Footertrangchu> </Footertrangchu>   
                </div> */}


            {/* <div className="bgded overlay" style={{backgroundImage: 'url("https://get.wallhere.com/photo/Bitcoin-coin-gold-1208628.jpg")'}}>  */}

            <div className="wrapper row1" >

                <Menutrangchu></Menutrangchu>
            </div>


            <div className="main" style={{
                padding: 'cover', height: '800px',
                background: "URL('https://i.pinimg.com/originals/e5/70/7c/e5707cb75d2a8df86739498f2f753d30.jpg')", backgroundSize: 'cover', boxSizing: 'cover'
            }}>

                <header id="header" className="header" >
                    <div className="header-content" style={{ textAlign: 'center', paddingTop: '13rem', paddingBottom: '7.5rem' }}>
                        <div className="container" style={{ width: '100%', paddingRight: '15px', paddingLeft: '15px', marginRight: 'auto', marginleft: 'auto' }}>
                            <div className="row" style={{ display: 'flex', flexWrap: 'wrap', marginRight: '-15px', marginleft: '-15px' }}>
                                <div className="col-lg-12" style={{ position: 'relative', width: '100%', paddingRight: '15px', paddingLeft: '15px' }}>
                                    <div className="text-container">
                                        <h1 style={{ marginBottom: '3rem', color: 'white', font: '700 3.5rem/4rem "Montserrat", sans-serif' }}>Tham gia giao dịch  <span id="js-rotating">
                                            Coin-IUH
                                            </span></h1>
                                        <p className="p-heading p-large" style={{ marginRight: 'auto', marginleft: 'auto', color: 'white' }}> Giao dịch coin là  nơi tập trung mua bán Coin chuyên nghiệp <br />
                            và mở đầu cho xu hướng tham gia giao dịch coin trong tương lai.</p>
                                        <Link to='/Dangky'style={{display: 'inline-block', padding: '1.375rem 2.125rem 1.375rem 2.125rem',
                                        border: '0.125rem solid #14bf98', borderRadius: '0.25rem', backgroundColor: '#14bf98', color: '#fff',
                                        font: '700 1rem/0 "Montserrat", sans-serif', textdecoration: 'none', transition: 'all 0.2s'}}> Tham Gia Ngay</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            <div id="intro" className="basic-1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 py-3">
                            <h2 className="text-center" style={{ fontSize: '25px', }}><strong>Lý do chọn Coin-IUH</strong></h2>
                        </div>
                        <div className="col-lg-6 py-3 mt-lg-5">
                            <div className="iconic-list">
                                <div className="iconic-item wow fadeInUp">
                                    <div className="iconic-md iconic-text bg-info fg-white rounded-circle" style={{marginRight:'20px'}}>
                                        <span className="mai-podium" />
                                    </div>
                                    <div >
                                        <strong style={{ fontSize: '20px'}}>Nền tảng phát triển mạnh mẽ</strong>
                                        <p > Giao diện thân thiện hỗ trợ cho người dùng giao dịch tương tác dễ dàng </p>
                                    </div>
                                </div>
                                <div className="iconic-item wow fadeInUp">
                                    <div className="iconic-md iconic-text bg-info fg-white rounded-circle">
                                        <span className="mai-shield" />
                                    </div>
                                    <div className="iconic-content">
                                        <strong style={{ fontSize: '20px' }}>An toàn và ổn định</strong>
                                        <p className="fs-small">Sử dụng hệ thống kiến trức đa tầng mạnh mẽ và bảo mật khi giao dịch</p>
                                    </div>
                                </div>
                                <div className="iconic-item wow fadeInUp">
                                    <div className="iconic-md iconic-text bg-indigo fg-white rounded-circle">
                                        <span className="mai-desktop-outline" />
                                    </div>
                                    <div className="iconic-content">
                                        <strong style={{ fontSize: '20px' }}>Đa nền tảng: Sử dụng hệ thống kiến trức đa tầng mạnh mẽ</strong>
                                        <p className="fs-small">Hỗ trợ các trình duyệt web, Android, IOS, HTML5, WeChat và các nền tảng khác.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer" style={{backgroundColor: 'brown'}}><Footertrangchu> </Footertrangchu></div>
         

        </Fragment>





    );
}

export default TrangChu;