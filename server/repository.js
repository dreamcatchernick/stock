const Concept = require('./models/concept');
const Stock = require('./models/stock');


//Upsert an concept
function insertConcept(concept) {
    console.log('creating concept ' + concept.name);
    return Concept.create(concept, function (error) {
        if(error){
            console.log(error);
        }
    });
}

function getAllConcepts(request , response) {
    return Concept.find({}).exec();
}

function insertStock(stock) {
    console.log('creating stock ' + stock.stockTitle);
    return Stock.create(stock, function (error) {
        if(error){
            console.log(error);
        }
    });
}

function cleanConcept() {
    const job = new Promise((resolve, reject) => {
        Concept.find().remove({}, function(error) {
            console.log('concepts are all removed');
            resolve();
            if(error) {
                reject();
            }
        });
    });
    return job;
}

function getStockByConceptId(conceptId) {
    return Stock.find({conceptId: conceptId}).exec();
}

function cleanStock() {
    const job = new Promise((resolve, reject) => {
        Stock.find().remove({}, function(error) {
            console.log('concepts are all removed');
            resolve();
            if(error) {
                reject();
            }
        });
    });
    return job;
}

module.exports = {insertConcept, getAllConcepts , insertStock, cleanConcept ,getStockByConceptId ,cleanStock};
