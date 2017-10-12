const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ConceptSchema = new Schema({
    conceptId: { type: Number, default: -1 },
    name: { type: String, default: '' },
    href: { type: String, default: '' }
});


ConceptSchema.path('conceptId').required(true, 'conceptId不能为空');
ConceptSchema.path('name').required(true, 'name不能为空');
ConceptSchema.path('href').required(true, 'href不能为空');

module.exports = mongoose.model('Concept', ConceptSchema);