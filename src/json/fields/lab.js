var fields = [{
    name: 'user_accession',
    text: 'User accession',
    placeholder: 'USRLAB####',
    type: 'text',
    required: true
}, {
    name: 'principal_investigator',
    text: 'Principal Investigator',
    placeholder: 'First and last name. No titles or commas.',
    values: ['David Aylor', 'Marisa Bartolomei', 'Shyam Biswal', 'Dana Dolinoy', 'Gokhan Mutlu', 'Cheryl Walker', 'Zhibin Wang', 'Ting Wang'],
    type: 'text',
    required: true,
    values_restricted: true
}, {
    name: 'institute',
    text: 'Institute',
    placeholder: 'University. No abbreviations.',
    type: 'text',
    required: true,
    values: ['North Carolina State University', 'University of Pennsylvania', 'Johns Hopkins University', 'University of Michigan', 'University of Chicago', 'Baylor College of Medicine', 'Washington University in St. Louis', 'Case Western Reserve University'],
    values_restricted: true
}, {
    name: 'department',
    text: 'Department',
    placeholder: 'No abbreviations.',
    type: 'text',
    required: true,
    values: ['Center for Precision Environmental Health', 'The Epigenetics Institute', 'Department of Environmental Health and Engineering', 'Department of Pulmonary and Critical Care Medicine', 'Department of Biological Sciences', 'Department of Environmental Health Sciences', 'Department of Genetics'],
    values_restricted: true
}, {
    name: 'mailing_address',
    text: 'Mailing Address',
    placeholder: 'No abbreviations.',
    type: 'text',
    required: true,
    values: ['One Baylor Plaza, Houston, Texas 77030','5841 South Maryland Avenue, Chicago, Illinois 60637','112 Derieux Place, Raleigh, North Carolina 27606','1415 Washington Heights, Ann Arbor, Michigan 48109','3400 Civic Boulevard, Philadelphia, Pennsylvania 19104','615 North Wolfe Street, Baltimore, Maryland 21205','4515 McKinley Avenue, Saint Louis, Missouri 63110'],
    values_restricted: true
}, {
    name: 'grant_number',
    text: 'Grant number',
    placeholder: 'Official TaRGET grant number in NIH-recommended format',
    type: 'text',
    required: true,
    values: ['U01ES026697', 'U01ES026718', 'U01ES026719', 'U01ES026721', 'U01ES026717', 'U24ES026699'],
    values_restricted: true
}, {
    name: 'sra_center_name_code',
    text: 'SRA Center_Name code',
    placeholder: 'Sequence Read Archive code',
    type: 'text',
    required: false
}];

module.exports = fields;
