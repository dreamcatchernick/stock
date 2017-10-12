const common = require('./common');
const _ = require('lodash');
const dbmanager = require('./dbmananger');
const repository = require('./repository');

// common.getStockInfo('600036').then((stockInfo) => {
//     console.log(stockInfo);
// });

// common.getStockList('/gn/00010126.html' , 2).then((stockDetailPromiseList) => {
//     Promise.all(stockDetailPromiseList)
//         .then((stockDetailList) => {
//             // const goodStock = [];
//             // const badStock = [];
//             // stockDetailList.forEach((stockDetail) => {
//             //     //console.log(stockDetail.size.indexOf('大'));
//             //     if(stockDetail.pe_jing <= 50.0 &&
//             //         stockDetail.pe_dong <= 100.0 &&
//             //         stockDetail.size.indexOf('大') == -1 &&
//             //         stockDetail.main_control.indexOf('高') > 0) {
//             //         goodStock.push(stockDetail);
//             //     } else {
//             //         badStock.push(stockDetail);
//             //     }
//             // });
//             // console.log(goodStock);
//             // console.log('=================================');
//             // console.log(badStock);
//             //console.log(stockDetailList);
//             repository.cleanStock().then(() => {
//                 _.each(stockDetailList ,(stock)=> {
//                     repository.insertStock(stock);
//                 });
//             });
//         })
//         .catch((e) => {
//             // Handle errors here
//         });
// });

common.getConceptList().then((conceptList) => {
    repository.cleanConcept().then(() => {
        for(let i =0 ; i< conceptList.length ; i++) {
            const concept = conceptList[i];
            console.log(concept);
            setTimeout(()=> {
                common.getStockList(concept.href , concept.id).then((stockDetailPromiseList) => {
                    Promise.all(stockDetailPromiseList).then((stockDetailList) => {
                        //console.log(stockDetailList);
                        _.each(stockDetailList ,(stock) => {
                            repository.insertStock(stock);
                        })
                    });
                });
                //console.log('should wait for' + i * 2000);
            }, i * 5000);
        }
    });
});

// common.getConceptList().then((conceptList) => {
//     repository.cleanConcept().then(() => {
//         _.each(conceptList , (concept) => {
//             repository.insertConcept(concept);
//             console.log(concept);
//             // common.getStockList(concept.href , concept.id).then((stockDetailPromiseList) => {
//             //     Promise.all(stockDetailPromiseList).then((stockDetailList) => {
//             //         _.each(stockDetailList ,(stock) => {
//             //             repository.insertStock(stock);
//             //         })
//             //     });
//             // })
//         });
//     });
// });

// repository.getAllConcepts().then((result) => {
//     console.log(result);
// });