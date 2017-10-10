import axios from 'axios';
import _ from 'lodash';

export function loadConceptList() {
    return (dispatch) => {
        axios.get('/getlist').then((response) => {
            //console.log(response.data);
            dispatch({
                type: 'LOAD_CONCEPT_LIST',
                payload: response.data
            });
        });
    };
}

export function loadStockList(conceptId) {
    return (dispatch) => {
        axios.get(`/getstocks/${conceptId}`).then((response) => {
            //console.log(response.data);
            dispatch({
                type: 'LOAD_STOCK_LIST',
                payload: response.data
            });
        });
    };
}

export function filterStockList(options, stockList) {
    return (dispatch) => {
        let filteredStockList = _.cloneDeep(stockList);
        if(options.indexOf('pe') > -1) {
            filteredStockList = _.filter(filteredStockList ,(stock) => {
                return (stock.pe_jing <= 50.0 && stock.pe_dong <= 100.0);
            });
        }
        if(options.indexOf('size') > -1) {
            filteredStockList = _.filter(filteredStockList ,(stock) => {
                return !(stock.size.indexOf('大') > -1);
            });
        }
        if(options.indexOf('main') > -1) {
            filteredStockList = _.filter(filteredStockList ,(stock) => {
                return stock.main_control.indexOf('高') > -1;
            });
        }
        dispatch({
            type: 'FILTER_STOCK',
            payload: filteredStockList
        });
    };
}