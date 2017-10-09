const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const http = require('http');

const baseUri = 'http://basic.10jqka.com.cn';

function getConceptList() {
    return new Promise((resolve, reject) => {
        http.get(baseUri ,((response) => {
            response.pipe(iconv.decodeStream('gbk')).collect(function(err, decodedBody) {
                const conceptList = [];
                const $ = cheerio.load(decodedBody, {decodeEntities: false});
                const gn = $('.category').eq(2);
                const gnItemList = gn.find($('.c_content > div a'));
                for(let i = 0 ; i<gnItemList.length; i++) {
                    conceptList.push({id:i, name: gnItemList[i].attribs.title , href:gnItemList[i].attribs.href})
                }
                resolve(conceptList);
            });
        }));
    });
}


function getStockList(subUri) {
    const stockListUri = `${baseUri}${subUri}`;
    return new Promise((resolve , reject) => {
        http.get(stockListUri, function(res) {
            res.pipe(iconv.decodeStream('gbk')).collect(function(err, decodedBody) {
                const $ = cheerio.load(decodedBody, {decodeEntities: false});
                const stockList = $('.c_content > a');
                const stockDetailList = [];
                for(let i = 0; i< stockList.length; i ++) {
                    const stockLink = stockList[i].attribs.href;
                    //if stock link has A mean the stock is new
                    if(stockLink.indexOf('A') == -1) {
                        stockDetailList.push(getStockInfo(stockLink));
                    }
                }
                resolve(stockDetailList);
            });
        });
    })
}

function getStockInfo(stockCode) {
    const stockUri = `${baseUri}/${stockCode}/`;
    return new Promise((resolve , reject) => {
        http.get(stockUri, function(res) {
            res.pipe(iconv.decodeStream('gbk')).collect(function(err, decodedBody) {
                const $ = cheerio.load(decodedBody, {decodeEntities: false});
                const stockTitle = $('.header h1 > a')[0].attribs.title;
                const stockInfoTables = $('#profile > .bd > table');
                const stockMain = $('#main > .bd .topcolor');
                const financeTable = stockInfoTables.eq(0);
                const detailTable = stockInfoTables.eq(1);


                const financeCell = financeTable.find($('td'));
                let financePositionList = [];
                const financePositionCell = financeCell.eq(3).find($('.f14 > a'));

                if(financePositionCell.length > 0) {
                    for(let i=0 ; i< financePositionCell.length ; i++ ) {
                        const financePosition = financePositionCell.eq(i).html();
                        financePositionList.push(financePosition);
                    }
                }

                const detailCell = detailTable.find($('td'));

                const pe_dong = detailCell.eq(0).find($('.tip')).html();
                const pe_jing = detailCell.eq(4).find($('.tip')).html();
                const size = detailCell.eq(3).find($('.newtaid')).html();
                const main_control = stockMain.text().replace(/(?:\r\n|\r|\n|\t|\s)/g, '');

                const stockInfo = {
                    stockTitle: stockTitle ,
                    pe_dong: pe_dong,
                    pe_jing : pe_jing,
                    size: size ,
                    financePositionList: financePositionList,
                    main_control: main_control};
                resolve(stockInfo);
            });
        });
    });
}

module.exports = {getConceptList, getStockInfo , getStockList};