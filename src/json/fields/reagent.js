var fields = [{
    name: 'user_accession',
    text: 'User accession',
    placeholder: 'USRREA####',
    type: 'text',
    required: false
}, {
    name: 'reagent',
    text: 'Reagent',
    placeholder: 'Antibody or enzyme',
    type: 'text',
    values: ['antibody'],
    values_restricted: true,
    required: false
}, {
    name: 'source',
    text: 'Source',
    placeholder: 'Company name (e.g., laboratory, vendor)',
    type: 'text',
    required: false
}, {
    name: 'product_id',
    text: 'Product ID',
    placeholder: 'For commercially available reagents',
    type: 'text',
    required: false
}, {
    name: 'lot',
    text: 'Lot ID',
    placeholder: 'For commercially available reagents',
    type: 'text',
    required: false
}, {
    name: 'antigen_sequence',
    text: 'Antigen sequence',
    placeholder: '(for antibodies)',
    type: 'text',
    required: false
}, {
    name: 'clonality',
    text: 'Clonality',
    placeholder: '(for antibodies)',
    values: [ 'monoclonal', 'polyclonal' ],
    type: 'text',
    required: false,
    values_restricted: true
}, {
    name: 'host',
    text: 'Host organism',
    placeholder: '(for antibodies)',
    values: [ 'horse', 'rabbit' ],
    type: 'text',
    required: false,
    values_restricted: true
}, {
    name: 'isotype',
    text: 'Isotype',
    placeholder: '(for antibodies)',
    values: [ 'IgA', 'IgG' ],
    type: 'text',
    required: false,
    values_restricted: true
}, {
    name: 'purification_method',
    text: 'Purification method',
    placeholder: '(e.g., antiserum, affinity)',
    type: 'text',
    required: false
}, {
    name: 'comments',
    text: 'Comments',
    placeholder: '',
    type: 'text',
    required: false
}];

module.exports = fields;
