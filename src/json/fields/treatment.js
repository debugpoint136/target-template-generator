var fields = [{
  name: 'user_accession',
  text: 'User accession',
  placeholder: 'USRTMT####',
  type: 'text',
  required: true
}, {
  name: 'exposure_category',
  text: 'Category',
  placeholder: '',
  values: ['Treated', 'Control'],
  type: 'text',
  required: true,
  values_restricted: true
}, {
  name: 'exposure_specific',
  text: 'Exposure',
  placeholder: 'Include Chemical Entities of Biological Interest (ChEBI) ID or another exposure database (e.g., Environmental Ontology)',
  values: ['BPA (Bisphenol A) CHEBI:33216', 'TBT (Tributyltin chloride) CHEBI:79734', 'As (arsenite(3-)) CHEBI:29866', 'Pb CHEBI:33112', 'PM2.5 ENVO:01000415', 'DEHP (bis (2-ethylhexyl) phthalate) CHEBI:17747', 'TCDD (2,3,7,8-tetrachlorodibenzo-p-dixoin) CHEBI:28119', 'Filtered Air', 'Control Drinking Water CHEBI:15377', 'Control Diet'],
  type: 'text',
  required: true,
  values_restricted: true,
  pilot: true
}, {
  name: 'exposure_dose',
  text: 'Dose of exposure',
  placeholder: 'Include units. Examples: "50 mg/kg", "100 ppm/s", "0 mg/kg (for control)"',
  type: 'text',
  required: true
}, {
  name: 'exposure_paradigm',
  text: 'Exposure paradigm',
  placeholder: 'Include dose, frequency, route, number of exposures (if applicable), vehicle, etc. If diet, include catalog number of treatment diet. Example: "Dams were exposed to treatment 2 weeks before breeding, through gestation and lactation. Offspring were exposed to treatment through the dam from conception to birth, then through nursing or food/water once pups begin to eat and drink on their own."',
  type: 'text',
  required: true
}, {
  name: 'exposure_age_first',
  text: 'Age at first exposure (weeks)',
  placeholder: 'Negative ages indicate that the dam was exposed prior to birth i.e. -5=2 weeks prior to conception, 0=birth, -3=conception',
  type: 'integer',
  required: true,
  values: ['-5', '-3', '0', '3'],
  values_restricted: true
}, {
  name: 'exposure_age_last',
  text: 'Age at last exposure (weeks)',
  placeholder: '',
  type: 'integer',
  required: true,
  values: ['3', '5', '17'],
  values_restricted: true
}, {
  name: 'exposure_life_stage',
  text: 'Life stage at exposure',
  placeholder: '',
  values: ['preconception (-5 weeks to conception/-3 weeks)', 'gestation (conception/-3 weeks to birth/0 weeks', 'neonate (birth/0 weeks to 1 week)', 'preconception to weaning (-5 weeks to 3 weeks)', 'weanling (3 weeks)', 'adolescent (3 to 5 weeks)', 'juvenile (5 to 10 weeks)', 'adult (15 to 30 weeks)', 'aged (45 to 52 weeks)'],
  type: 'text',
  required: true,
  values_restricted: true
}, {
  name: 'challenge_after_exposure',
  text: 'Challenge after exposure',
  placeholder: '(if applicable)',
  values: ['High-fat diet'],
  type: 'text',
  required: false,
  values_restricted: true
}, {
  name: 'challenge_life_age_beginning',
  text: 'Age at beginning of challenge (weeks)',
  placeholder: '(if applicable)',
  type: 'integer',
  required: false
}, {
  name: 'challenge_life_age_end',
  text: 'Age at end of challenge (weeks)',
  placeholder: '(if applicable)',
  type: 'integer',
  required: false
}, {
  name: 'challenge_life_Stage',
  text: 'Life stage at challenge',
  placeholder: '(if applicable)',
  values: ['preconception (-5 weeks to conception/-3 weeks)', 'gestation (conception/-3 weeks to birth/0 weeks', 'neonate (birth/0 weeks to 1 week)', 'preconception to weaning (-5 weeks to 3 weeks)', 'weanling (3 weeks)', 'adolescent (3 to 5 weeks)', 'juvenile (5 to 10 weeks)', 'adult (15 to 30 weeks)', 'aged (45 to 52 weeks)'],
  type: 'text',
  required: false,
  values_restricted: true
}, {
  name: 'comments',
  text: 'Comments',
  placeholder: '',
  type: 'text',
  required: false
}];

module.exports = fields;
