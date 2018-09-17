var fields = [{
    name: 'user_accession',
    text: 'User accession',
    placeholder: 'USRLAB####',
    type: 'text',
    required: true
}, {
    name: 'principal_investigator',
    text: 'Principal Investigator',
    placeholder: 'First, last name',
    type: 'text',
    required: true
}, {
    name: 'institute',
    text: 'Institute',
    placeholder: '',
    type: 'text',
    required: true
}, {
    name: 'department',
    text: 'Department',
    placeholder: '',
    type: 'text',
    required: true
}, {
    name: 'street',
    text: 'Street',
    placeholder: '',
    type: 'text',
    required: true
}, {
    name: 'city',
    text: 'City/County',
    placeholder: '',
    type: 'text',
    required: true
}, {
    name: 'state',
    text: 'State',
    placeholder: '',
    type: 'text',
    required: true
}, {
    name: 'zip_code',
    text: 'Zip code',
    placeholder: '',
    type: 'text',
    required: true
}, {
    name: 'grant_number',
    text: 'Grant number',
    placeholder: 'Official TaRGET grant number',
    type: 'text',
    required: true
}, {
    name: 'sra_center_name_code',
    text: 'SRA Center_Name code',
    placeholder: 'Sequence Read Archive code',
    type: 'text',
    required: true
}];

module.exports = fields;
