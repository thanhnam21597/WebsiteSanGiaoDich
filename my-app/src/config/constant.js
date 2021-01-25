import axioss from 'axios';

//const ApiLink= "https://websangiaodichcoin-api.herokuapp.com/api/";
const ApiLink ="http://localhost:2064/api/";

const axios = axioss.create({
    baseURL: ApiLink,
    timeout: 15*1000,
})

export {ApiLink,axios};