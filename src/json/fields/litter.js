var fields = [ {
    name: 'litter_size_total',
    text: 'Litter size (total)',
    placeholder: 'Number of pups born in litter',
    type: 'number',
    required: true
}, {
    name: 'litter_size_survived',
    text: 'Litter size (survived to weaning)',
    placeholder: 'Number of pups survived in litter',
    type: 'number',
    required: true
}, {
    name: 'litter_number',
    text: 'Litter number',
    placeholder: 'Number of litters mother has had',
    type: 'number',
    required: true
}, {
    name: 'male_female_ratio',
    text: 'Male/female ratio',
    placeholder: '',
    type: 'textnumber',
    required: true
}, {
    name: 'age_at_mating',
    text: 'Dam age at mating',
    placeholder: 'Include units',
    type: 'text',
    required: true
}, {
    name: 'age_matched',
    text: 'Age-matched sire',
    placeholder: 'Are dam and sire age-matched? ',
    values: [ 'NA', 'TRUE', 'FALSE' ],
    type: 'text',
    required: true,
    values_restricted: true
}, {
    name: 'dam_weight_mating',
    text: 'Dam weight, mating (g)',
    placeholder: '',
    type: 'textnumber',
    required: true
}, {
    name: 'dam_weight_weaning',
    text: 'Dam weight, weaning (g)',
    placeholder: '',
    type: 'textnumber',
    required: true
}, {
    name: 'dam_weight_preexposure',
    text: 'Dam weight, pre-exposure (g)',
    placeholder: '',
    type: 'textnumber',
    required: true
}, {
    name: 'date_born',
    text: 'Date born',
    placeholder: '',
    type: 'date',
    required: true
}, {
    name: 'dam_exposure_level',
    text: 'Dam exposure level',
    placeholder: '(e.g., blood concentration)',
    type: 'text',
    required: false
}, {
    name: 'facility_contamination',
    text: 'Facility contamination checks',
    placeholder: '(e.g., sentinel mice)',
    type: 'text',
    required: false
}, {
    name: 'cbc_results',
    text: 'CBC test results',
    placeholder: '',
    type: 'text',
    required: false
}, {
    name: 'comments',
    text: 'Comments',
    placeholder: '',
    type: 'textarea',
    required: false
}];

module.exports = fields;
