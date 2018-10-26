var fields = [{
    name: 'user_accession',
    text: 'User accession',
    placeholder: 'USRMSE####',
    type: 'text',
    required: true
}, {
    name: 'organism',
    text: 'Organism',
    placeholder: 'Scientific name (genus, species, and subspecies, if applicable)',
    type: 'text',
    required: true,
    values: ['Mus musculus'],
    values_restricted: true
}, {
    name: 'source',
    text: 'Source',
    placeholder: 'Source of mouse strain (e.g., laboratory)',
    type: 'text',
    required: true,
    values: ['The Jackson Laboratory', 'Laboratory colony'],
    values_restricted: true
}, {
    name: 'strain',
    text: 'Strain',
    placeholder: 'Strain information, including parental background if the product of cross. Not just “C57BL/6”.',
    required: true,
    type: 'text',
    values: ['Avy','C57BL/6J'],
    values_restricted: true
}, {
    name: 'sex',
    text: 'Sex',
    placeholder: '',
    required: true,
    type: 'text',
    values: ['Male', 'Female'],
    values_restricted: true,
    pilot: true
}, {
    name: 'internal_id',
    text: 'Internal ID',
    placeholder: 'Internal unique identifier for mouse',
    type: 'text',
    required: true
}, {
    name: 'mouse_age_collection',
    text: 'Mouse age at sac (weeks)',
    placeholder: '',
    type: 'integer',
    required: true,
    pilot: true
}, {
    name: 'life_stage_collection',
    text: 'Life stage at sac',
    placeholder: '',
    values: ['preconception (-5 weeks to conception/-3 weeks)', 'gestation (conception/-3 weeks to birth/0 weeks', 'neonate (birth/0 weeks to 1 week)', 'preconception to weaning (-5 weeks to 3 weeks)', 'weanling (3 weeks)', 'adolescent (3 to 5 weeks)', 'juvenile (5 to 10 weeks)', 'adult (15 to 30 weeks)', 'aged (45 to 52 weeks)'],
    type: 'text',
    required: true,
    values_restricted: true
}, {
    name: 'animal_weight_sac',
    text: 'Weight at sac (g)',
    placeholder: '',
    type: 'float',
    required: false
}, {
    name: 'perfusion',
    text: 'Perfusion',
    placeholder: 'Was mouse perfused before sample collection?',
    values: ['Yes', 'No'],
    type: 'text',
    required: true,
    values_restricted: true
}, {
    name: 'fasted',
    text: 'Fasted',
    values: ['Yes', 'No'],
    placeholder: 'Was mouse fasted before sample collection?',
    type: 'text',
    required: true,
    values_restricted: true
}, {
    name: 'fasted_hours',
    text: 'Number of hours fasted',
    placeholder: '',
    type: 'integer',
    required: false
}, {
    name: 'liver_tumors',
    text: 'Macroscopic tumors present',
    placeholder: 'Were diffuse tumors present?',
    type: 'text',
    values: ['NA', 'TRUE', 'FALSE'],
    required: true,
    values_restricted: true
}, {
    name: 'tumor_organs',
    text: 'Organs with tumors',
    placeholder: 'Specify organ(s) where macroscopic tumors are present',
    type: 'text',
    required: true
}, {
    name: 'technicians',
    text: 'Technicians',
    placeholder: 'Individual performing the sac (initials).',
    type: 'text',
    required: true
}, {
    name: 'comments',
    text: 'Comments',
    placeholder: '',
    type: 'text',
    required: false
}];

module.exports = fields;
