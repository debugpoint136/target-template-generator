var fields = [{
    name: 'user_accession',
    text: 'User accession',
    placeholder: 'USRREA####',
    type: 'text',
    required: true
}, {
    name: 'reagent',
    text: 'Reagent',
    placeholder: 'Antibody or enzyme',
    type: 'text',
    required: true
}, {
    name: 'source',
    text: 'Source',
    placeholder: '(e.g., laboratory, vendor)',
    type: 'text',
    required: true
}, {
    name: 'product_id',
    text: 'Product ID',
    placeholder: 'For commercially available reagents',
    type: 'text',
    required: true
}, {
    name: 'lot',
    text: 'Lot ID',
    placeholder: 'For commercially available reagents',
    type: 'text',
    required: true
}, {
    name: 'antigen_sequence',
    text: 'Antigen sequence',
    placeholder: '(for antibodies)',
    type: 'text',
    required: true
}, {
    name: 'clonality',
    text: 'Clonality',
    placeholder: '(for antibodies)',
    values: [ '', 'monoclonal', 'polyclonal' ],
    type: 'text',
    required: true,
    values_restricted: false
}, {
    name: 'host',
    text: 'Host organism',
    placeholder: '(for antibodies)',
    values: [ '', 'horse', 'rabbit' ],
    type: 'text',
    required: true,
    values_restricted: false
}, {
    name: 'isotype',
    text: 'Isotype',
    placeholder: '(for antibodies)',
    values: [ '', 'IgA', 'IgG' ],
    type: 'text',
    required: true,
    values_restricted: false
}, {
    name: 'purification_method',
    text: 'Purification method',
    placeholder: '(e.g., antiserum, affinity; if applicable)',
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
