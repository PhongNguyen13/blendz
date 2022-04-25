import * as constants from './constants';
import axios from 'axios';
import { fromJS } from 'immutable';

export const selectMachine = () => ({
    type: constants.SELECT_MACHINE
});

export const selectBeverages = () => ({
    type: constants.SELECT_BEVERAGES
});

export const selectAccessories = () => ({
    type: constants.SELECT_ACCESSORIES
});

const changeList = (result) => ({
    type: constants.CHANGELIST,
    data: fromJS(result)
})

export const getMachineList = () => {
    return (dispatch) => {
        axios.get('/api/Machine.json').then((res) => {
            const result = res.data;
            dispatch(changeList(result));
        }).catch(() => {
            console.log('error');
        })
    }
}
export const getBeveragesList = () => {
    return (dispatch) => {
        axios.get('/api/Beverages.json').then((res) => {
            const result = res.data;
            dispatch(changeList(result));
        }).catch(() => {
            console.log('error');
        })
    }
}

export const getAccessoriesList = () => {
    return (dispatch) => {
        axios.get('/api/Accessories.json').then((res) => {
            const result = res.data;
            dispatch(changeList(result));
        }).catch(() => {
            console.log('error');
        })
    }
}