import React, { Fragment, useState, useEffect } from 'react';
import { Menutrangchu, Footertrangchu } from '../allJS';
import axios from 'axios';
import { Table } from 'react-bootstrap';

//doi mau menu
import 'bootstrap/dist/css/bootstrap.min.css';


function DulieuthitruongA() {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios
            .get(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
            )
            .then(res => {
                setCoins(res.data);
                console.log(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handleChange = e => {
        setSearch(e.target.value);
    };

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );
    const formatPercent = number =>
        `${new Number(number).toFixed(2)}%`

    const formatDollar = (number, maximumSignificantDigits) =>
        new Intl.NumberFormat(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
                maximumSignificantDigits
            })
            .format(number);



    return (
        <Fragment>

            <div className="wrapper row1" >

                <Menutrangchu></Menutrangchu>
            </div>

            <div className='coin-app'>
            
                <br/>
                <h3  className="display-4 text-center">BIỂU ĐỒ THỂ HIỆN SỰ THAY ĐỔI<br></br> TIỀN ĐIỆN TỬ HÀNG ĐẦU</h3>
                <div className='coin-search'>
                  
                    <form >
                        Tìm kiếm Coin
                        <input
                             
                            className='coin-input'
                            type='text'
                            onChange={handleChange}
                            placeholder='Search'
                        />

                    </form>

                </div>
                    <Table Responsive style={{ textAlign: 'center' ,width:'90%',marginLeft:'60px' }} >
                    {/* <table className="table" style={{ textAlign: 'center' ,width:'90%' }}> */}
                        <thead >
                            <tr>
                                <th style={{color:'white'}}> Tên Tiền ảo </th>
                                <th style={{color:'white'}}> Tên tiền ảo rút gọn </th>
                                <th style={{color:'white'}}> Gía hiện tại </th>
                                <th style={{color:'white'}}>  Thay đổi trong 24h </th>
                                <th style={{color:'white'}}> Khối lượng giao dịch trong 24h </th>
                                <th style={{color:'white'}}> Gía trị vốn hóa của thị trường </th>
                            </tr>
                        </thead>



                        <tbody>
                            {filteredCoins.map(coin => (
                                <tr key={coin.id} >
                                    <td>
                                        <img
                                            src={coin.image}
                                            style={{ width: 25, height: 25, marginRight: 10 }}
                                        />

                                        {coin.name}

                                    </td>
                                    <td>
                                        {coin.symbol.toUpperCase()}
                                    </td>
                                   
                                    <td>
                                        {(coin.current_price).toLocaleString()}US$
                            </td>
                                    <td>
                                        <span
                                            className={coin.price_change_percentage_24h > 0 ? (
                                                'text-success') : 'text-danger'} >
                                            {formatPercent(coin.price_change_percentage_24h,12)}
                                        </span>

                                    </td>
                                    <td >
                                        {(coin.total_volume).toLocaleString()} 
                            </td>
                                    <td>
                                        {formatDollar(coin.market_cap, 12)}
                                    </td>
                                  

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                

            </div >

            <div className="footer" style={{backgroundColor: 'brown'}}><Footertrangchu> </Footertrangchu></div>
        </Fragment >





    );
}

export default DulieuthitruongA;