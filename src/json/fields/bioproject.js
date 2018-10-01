var fields = [{
    name: 'user_accession',
    text: 'User accession',
    placeholder: 'USRBPR####',
    type: 'text',
    required: false
}, {
    name: 'title',
    text: 'Title',
    placeholder: '255 characters max. Should include exposure life stage, exposure, “mouse”, and “epigenomic”. Include strain(s) if important. Example: “Epigenomic maps of developmental exposure to PM2.5 in mouse”.',
    type: 'text',
    required: true
}, {
    name: 'summary',
    text: 'Summary',
    placeholder: 'Description of age, gender, number of control/reference samples analyzed, number of replicates, etc. Typically a few sentences, similar to an abstract. Example: "6 replicates each of 3 week- and 5 month-old mice, male and female, exposed developmentally to lead or control..." Include challenge if appropriate.',
    type: 'text',
    required: true
}, {
    name: 'dam_exposure_level',
    text: 'Dam exposure level',
    placeholder: 'Link to results (e.g., blood or urine concentration of exposure in dam)',
    type: 'text',
    required: false
}, {
    name: 'facility_contamination',
    text: 'Facility contamination checks',
    placeholder: 'Link to results (e.g., sentinel mice)',
    type: 'text',
    required: false
}, {
    name: 'cbc_results',
    text: 'CBC test results',
    placeholder: 'Link to results (e.g., report)',
    type: 'text',
    required: false
}];

module.exports = fields;
