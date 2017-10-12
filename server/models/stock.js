const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const StockSchema = new Schema({
    conceptId: { type: Number, default: -1 },
    stockTitle: { type: String, default: '' },
    pe_dong: { type: String, default: '' },
    pe_jing: { type: String, default: '' },
    size: { type: String, default: '' },
    financePositionList: { type: String, default: '' },
    main_control: { type: String, default: '' },
});


StockSchema.path('conceptId').required(true, 'conceptId不能为空');
StockSchema.path('stockTitle').required(true, 'stockTitle不能为空');

module.exports = mongoose.model('Stock', StockSchema);
