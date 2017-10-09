const common = require('./common');

// common.getStockInfo('600036').then((stockInfo) => {
//     console.log(stockInfo);
// });

common.getStockList('/gn/00010126.html').then((stockDetailPromiseList) => {
    Promise.all(stockDetailPromiseList)
        .then((stockDetailList) => {
            const goodStock = [];
            const badStock = [];
            stockDetailList.forEach((stockDetail) => {
                //console.log(stockDetail.size.indexOf('大'));
                if(stockDetail.pe_jing <= 50.0 &&
                    stockDetail.pe_dong <= 100.0 &&
                    stockDetail.size.indexOf('大') == -1 &&
                    stockDetail.main_control.indexOf('高') > 0) {
                    goodStock.push(stockDetail);
                } else {
                    badStock.push(stockDetail);
                }
            });
            //console.log(stockDetailList);
            console.log(goodStock);
            console.log('=================================');
            console.log(badStock);
        })
        .catch((e) => {
            // Handle errors here
        });
});

// common.getConceptList().then((list) => {
//     console.log(list);
// });