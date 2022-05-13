import * as constants from './constants';
import axios from 'axios';
import { fromJS } from 'immutable';

const GetOrderList = (result) => ({
    type: constants.GETORDERLIST,
    data: fromJS(result)
})

export const getOrderList = (uid) => {
    return (dispatch) => {
        axios.get('http://localhost:8080/api/user/paidlist/' + uid).then((res) => {
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
        axios.post('http://localhost:8080/api/user/order/detail/' + uid, orderID).then((res) => {
            console.log(res);
            const result = res.data;
            dispatch(GetOrderDetail(result));
        }).catch(() => {
            console.log('error, can not get order detail');
        })
    }
}




