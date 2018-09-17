var fields = [{
    name: 'user_accession',
    text: 'User accession',
    placeholder: 'USRBPR####',
    type: 'text',
    required: false
}, {
    name: 'title',
    text: 'Title',
    placeholder: '255 characters max',
    type: 'text',
    required: true
}, {
    name: 'design',
    text: 'Design',
    placeholder: 'Description of goals and objectives (publically accessible)',
    type: 'textarea',
    required: true
}, {
    name: 'summary',
    text: 'Summary',
    placeholder: 'Description of number of samples, replicates, controls, etc.',
    type: 'textarea',
    required: true
}];

module.exports = fields;
