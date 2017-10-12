const express = require('express');
const path = require('path');
const common = require('./common');
const app = express();
const repository = require('./repository');
const dbmanager = require('./dbmananger');
const bodyParser = require('body-parser');


const publicPath = '/';
const outputPath = path.resolve(process.cwd(), 'dist');

app.use(publicPath, express.static(outputPath));
// parse application/json , 普通的express 配置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));


app.get('/getlist' , (req, res) => {
    const promise = repository.getAllConcepts();
    promise.then((result ,error) => {
        if(error){
            res.sendStatus(500);
        }
        res.json(result);
    });
});

app.get('/getstocks/:id', (req, res) => {
    const conceptId = req.params.id;
    const promise = repository.getStockByConceptId(conceptId);
    promise.then((result , error) => {
        if(error){
            res.sendStatus(500);
        }
        res.json(result);
    });
});

app.listen(8080, ()=> {
    console.log('Server is running...');
});