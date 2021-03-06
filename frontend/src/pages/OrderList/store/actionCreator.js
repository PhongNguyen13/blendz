import * as constants from './constants';
import axios from 'axios';
import { fromJS } from 'immutable';

const GetOrderList = (result) => ({
    type: constants.GETORDERLIST,
    data: fromJS(result)
})

export const getOrderList = (uid) => {
    return (dispatch) => {
        axios.get('https://blendz.herokuapp.com/api/user/paidlist/' + uid).then((res) => {
            const result = res.data;
            dispatch(GetOrderList(result));
        }).catch(() => {
            console.log('error');
        })
    }
}

const GetOrderDetail = (result) => ({
    type: constants.GETORDERLISTDETAIL,
    data: fromJS(result)
})

export const getOrderDetail = (uid, orderID) => {
    console.log(orderID);
    return (dispatch) => {
        console.log(uid);
        axios.post('https://blendz.herokuapp.com/api/user/order/detail/' + uid, orderID).then((res) => {
            console.log(res);
            const result = res.data;
            dispatch(GetOrderDetail(result));
        }).catch(() => {
            console.log('error, can not get order detail');
        })
    }
}

const GetRentList = (result) => ({
    type: constants.GETRENTLIST,
    data: fromJS(result)
})

export const getRentList = (uid) => {
    return (dispatch) => {
        axios.get('https://blendz.herokuapp.com/api/user/AllRentList/' + uid).then((res) => {
            const result = res.data;
            dispatch(GetRentList(result));
        }).catch(() => {
            console.log('error');
        })
    }
}

const GetRentDetail = (result) => ({
    type: constants.GETRENTDETAIL,
    data: result
})

export const getrentDetail = (uid, RentID) => {
    console.log(RentID);
    return (dispatch) => {
        console.log(uid);
        axios.post('https://blendz.herokuapp.com/api/user/RentList/detail/' + uid, RentID).then((res) => {
            console.log(res);
            const result = res.data;
            dispatch(GetRentDetail(result));
        }).catch(() => {
            console.log('error, can not get rent detail');
        })
    }
}

const GetORDERID = (result) => ({
    type: constants.ORDERID,
    data: result
})

export const updateOrderID = (ORDERID) => {
    return (dispatch) => {
            dispatch(GetORDERID(ORDERID));
        }
}

const GetADDRESS = (result) => ({
    type: constants.SHIPPINGADDRESS,
    data: result
})

export const updateADDRESS = (ADDRESS) => {
    return (dispatch) => {
            dispatch(GetADDRESS(ADDRESS));
        }
}

