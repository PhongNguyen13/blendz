import * as constants from './constants';
import axios from 'axios';
import { fromJS } from 'immutable';

const changedetail = (result) => ({
    type: constants.GETDETAIL,
    data: fromJS(result)
})

export const getdetail = (id) => {
    return (dispatch) => {
        axios.get('/api/Allproduct.json?id=' + id).then((res) => {
            const result = res.data;
            dispatch(changedetail(result));
        }).catch(() => {
            console.log('error');
        })
    }
}