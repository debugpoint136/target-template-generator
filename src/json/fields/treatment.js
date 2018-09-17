var fields = [{
  name: 'user_accession',
  text: 'User accession',
  placeholder: 'USRTMT####',
  type: 'text',
  required: true
}, {
  name: 'exposure_classification',
  text: 'Exposure classification',
  placeholder: '',
  values: ['Chronic', 'Acute'],
  type: 'text',
  required: true,
  values_restricted: false
}, {
  name: 'exposure_type',
  text: 'Exposure type',
  placeholder: 'Broad category of exposure',
  values: ['Endocrine-disrupting chemical', 'metal', 'particle', 'phthalate', 'dioxin', 'obesogen'],
  type: 'text',
  required: true,
  values_restricted: false
}, {
  name: 'exposure_specific',
  text: 'Exposure',
  placeholder: 'Specific exposure',
  values: ['BPA (Bisphenol A)', 'TBT (Tributyltin)', 'Genestein', 'Arsenic (As)', 'Cd', 'Pb', 'PM2.5', 'DEHP', 'TCDD (2,3,7,8-tetrachlorodibenzo-p-dixoin)'],
  type: 'text',
  required: true,
  values_restricted: false,
  pilot: true
}, {
  name: 'exposureId',
  text: 'Exposure ID',
  placeholder: 'Chemical Entitites of Biological Interest (ChEBI) ID of exposure',
  type: 'text',
  required: true
}, {
  name: 'exposure_dose',
  text: 'Dose of exposure (include units)',
  placeholder: '',
  type: 'text',
  required: true
}, {
  name: 'exposure_duration',
  text: 'Duration of exposure (include units)',
  placeholder: 'Total duration of all exposures',
  type: 'text',
  required: true
}, {
  name: 'exposure_number',
  text: 'Number of exposures',
  placeholder: '',
  type: 'textnumber',
  required: true
}, {
  name: 'exposure_route',
  text: 'Route of exposure',
  placeholder: '',
  values: ['Oral', 'Parenteral'],
  type: 'text',
  required: true,
  values_restricted: false
}, {
  name: 'exposure_age_first',
  text: 'Age at first exposure (include units)',
  placeholder: '',
  type: 'text',
  required: true
}, {
  name: 'exposure_age_last',
  text: 'Age at last exposure (include units)',
  placeholder: '',
  type: 'text',
  required: true
}, {
  name: 'exposure_life_stage',
  text: 'Life stage at exposure',
  placeholder: '',
  values: ['preconception', 'in utero', 'neonate', 'weaned', 'juvenile (5-10 wk)', 'adult (5 months)', 'aged (12 months)', 'Gestation (2 weeks prior to conception-PND21)', 'Gestation (GD0-PND21)', 'Adolescent (PND21-35)', 'Juvenile/Adult'],
  type: 'text',
  required: true,
  values_restricted: false
}, {
  name: 'challenge_after_exposure',
  text: 'Challenge after exposure',
  placeholder: '(if applicable)',
  values: ['High-fat diet'],
  type: 'text',
  required: false,
  values_restricted: false
}, {
  name: 'challenge_life_age_beginning',
  text: 'Age at beginning of challenge (include units)',
  placeholder: '(if applicable)',
  type: 'text',
  required: false
}, {
  name: 'challenge_life_age_end',
  text: 'Age at end of challenge (include units)',
  placeholder: '(if applicable)',
  type: 'text',
  required: false
}, {
  name: 'challenge_life_Stage',
  text: 'Life stage at challenge',
  placeholder: '(if applicable)',
  values: ['preconception', 'in utero', 'neonate', 'weaned', 'juvenile (5-10 wk)', 'adult (5 months)', 'aged (12 months)', 'Gestation (2 weeks prior to conception-PND21)', 'Gestation (GD0-PND21)', 'Adolescent (PND21-35)', 'Juvenile/Adult'],
  type: 'text',
  required: false,
  values_restricted: false
}, {
  name: 'comments',
  text: 'Comments',
  placeholder: '',
  type: 'textarea',
  required: false
}];

module.exports = fields;
