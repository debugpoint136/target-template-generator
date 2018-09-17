var fields = [{
    name: 'category',
    text: 'Category',
    placeholder: '',
    required: true,
    type: 'text',
    values: ['Control', 'Challenge'],
    values_restricted: true
}, {
    name: 'description',
    text: 'Description',
    placeholder: '',
    type: 'text',
    required: true
}, {
    name: 'diet_source',
    text: 'Source',
    placeholder: 'Company producing diet',
    type: 'text',
    required: true
}, {
    name: 'catalogId',
    text: 'Catalog number',
    placeholder: '',
    type: 'text',
    required: true
}, {
    name: 'batchId',
    text: 'Batch number',
    placeholder: '',
    type: 'text',
    required: true
}, {
    name: 'comments',
    text: 'Comments',
    placeholder: '',
    type: 'textarea',
    required: false
}];

module.exports = fields;
