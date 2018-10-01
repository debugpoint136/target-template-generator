var fields = [{
    name: 'user_accession',
    text: 'User accession',
    placeholder: 'USRLTR####',
    type: 'text',
    required: true
}, {
    name: 'litter_size_total',
    text: 'Litter size (total)',
    placeholder: 'Number of pups born in litter',
    type: 'integer',
    required: false
}, {
    name: 'litter_size_survived',
    text: 'Litter size (survived to weaning)',
    placeholder: 'Number of pups survived in litter',
    type: 'integer',
    required: true
}, {
    name: 'litter_number',
    text: 'Litter number',
    placeholder: 'Number of litters mother has had',
    type: 'integer',
    required: true
}, {
    name: 'number_males',
    text: 'Number of males',
    placeholder: 'Number of males in litter',
    type: 'integer',
    required: true
}, {
    name: 'number_females',
    text: 'Number of females',
    placeholder: 'Number of females in litter',
    type: 'integer',
    required: true
}, {
    name: 'age_at_mating',
    text: 'Dam age at mating (weeks)',
    placeholder: '',
    type: 'integer',
    required: true
}, {
    name: 'age_matched',
    text: 'Age-matched sire',
    placeholder: 'Sire age within +/- 2 weeks of dam',
    values: [ 'TRUE', 'FALSE' ],
    type: 'text',
    required: false,
    values_restricted: true
}, {
    name: 'dam_weight_mating',
    text: 'Dam weight, mating (g)',
    placeholder: '',
    type: 'float',
    required: false
}, {
    name: 'dam_weight_weaning',
    text: 'Dam weight, weaning (g)',
    placeholder: '',
    type: 'float',
    required: false
}, {
    name: 'dam_weight_preexposure',
    text: 'Dam weight, pre-exposure (g)',
    placeholder: '',
    type: 'float',
    required: true
}, {
    name: 'date_born',
    text: 'Date born',
    placeholder: 'Format at YYYY-MM-DD',
    type: 'date',
    required: true
}, {
    name: 'comments',
    text: 'Comments',
    placeholder: '',
    type: 'text',
    required: false
}];

module.exports = fields;
