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
    required: true
}, {
    name: 'source',
    text: 'Source',
    placeholder: 'Source of mouse strain (e.g., laboratory)',
    type: 'text',
    required: true
}, {
    name: 'strain',
    text: 'Strain',
    placeholder: 'Strain information, including parental background if the product of cross',
    required: true,
    type: 'text',
    values: ['C57BL/6', 'Collaborative Cross/CC', 'Diversity Outbred', '129S1/SvlmJ', 'C57BL/6J', 'C57BL/6-Avy'],
    values_restricted: false
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
    text: 'Mouse age at sac (include units)',
    placeholder: '',
    type: 'text',
    required: true,
    pilot: true
}, {
    name: 'life_stage_collection',
    text: 'Life stage at sac',
    placeholder: '',
    values: ['preconception', 'in utero', 'neonate', 'weaned', 'juvenile (5-10 wk)', 'adult (5 months)', 'aged (12 months)', 'Gestation (2 weeks prior to conception-PND21)','Gestation (GD0-PND21)','Adolescent (PND21-35)','Juvenile/Adult'],
    type: 'text',
    required: true,
    values_restricted: false
}, {
    name: 'time_last_exposure',
    text: 'Time since last exposure (include units)',
    placeholder: '',
    type: 'text',
    required: true
}, {
    name: 'animal_weight_sac',
    text: 'Weight at sac (g)',
    placeholder: '',
    type: 'float',
    required: true
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
    type: 'number',
    required: true
}, {
    name: 'liver_tumors',
    text: 'Liver tumors present',
    placeholder: 'Were diffuse liver tumors present?',
    type: 'text',
    values: ['NA', 'TRUE', 'FALSE'],
    required: true,
    values_restricted: true
}, {
    name: 'technicians',
    text: 'Technicians',
    placeholder: 'Individuals handling mice',
    type: 'text',
    required: true
}, {
    name: 'liver_hist_image_HE',
    text: 'Liver histology, H&E stain',
    placeholder: 'Link to URL of uploaded image',
    type: 'text',
    required: false
}, {
    name: 'liver_hist_image_ORO',
    text: 'Liver histology, Oil red O stain',
    placeholder: 'Link to URL of uploaded image',
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
