const express = require('express');
const path = require('path');
const common = require('./common');
const app = express();

let gnList = [];

const publicPath = '/';
const outputPath = path.resolve(process.cwd(), 'dist');

app.use(publicPath, express.static(outputPath));

app.get('/', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));

app.get('/getlist' , (req, res) => {
    common.getConceptList().then((conceptList) => {
        gnList = conceptList;
        res.send(conceptList);
    });
});

app.get('/getstocks/:id', (req, res) => {
    const id = req.params.id;
    gnList.find((item) => {
        if(item.id == id) {
            const stockLink = item.href;
            common.getStockList(stockLink).then((stockDetailPromiseList) => {
                Promise.all(stockDetailPromiseList)
                    .then((stockDetailList) => {
                        res.send(stockDetailList);
                    })
                    .catch((e) => {
                        // Handle errors here
                    });
            });
        }
    });
});

app.listen(8080, ()=> {
    console.log('Server is running...');
});