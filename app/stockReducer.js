const initialState = {
    conceptList:[],
    stockList:[],
    filteredStockList:[]
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_CONCEPT_LIST': {
            return {
                ...state,
                conceptList: action.payload
            };
        }
        case 'LOAD_STOCK_LIST': {
            return {
                ...state,
                stockList: action.payload,
                filteredStockList: action.payload
            };
        }
        case 'FILTER_STOCK': {
            return {
                ...state,
                filteredStockList: action.payload,
            };
        }
    }
    return state;
}