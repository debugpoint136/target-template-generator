var fields = [{
    name: 'tissue_classification',
    text: 'Tissue Classification',
    placeholder: '',
    values: ['Target', 'Surrogate'],
    type: 'text',
    required: true,
    values_restricted: true
}, {
    name: 'sample_type',
    text: 'Type',
    placeholder: '',
    values: ['primary cells', 'tissue', 'whole organism'],
    type: 'text',
    required: true,
    values_restricted: true
}, {
    name: 'tissue',
    text: 'Tissue',
    placeholder: 'Tissue or cell population collected from mouse',
    required: true,
    type: 'text',
    values: ['Aorta','Blood - leukocytes','Blood - monocyte','Blood - PBMC','Blood - plasma','Blood - Whole','Brain - cortex','Brain - hippocampus','Brain - hypothalamus','Brain - mid-brain and hind-brain','Brain - whole','Brain - whole, micropunch','Breast','Ear - left','Ear - right','Fat','Fat - adipocytes','Fat - brown adipose','Fat - mesenteric adipose','Fat - white adipose','Gall bladder','Hair','Heart','Heart - ventricles','Kidney','Kidney - left','Kidney - right capsule','Kidney epithelium','Liver','Liver - accessory lobe','Liver - caudate lobe','Liver - left lobe','Liver - medial lobe','Liver - oval cells','Liver - right lobe','Liver - tumor','Lung','Lung - alveolar macrophages','Lung - both','Lung - epithelial cells','Lung - right','Lung - Type II cells','Nasal epithelium','Ovary','Placenta','Skeletal muscle','Skin','Skin - ear punch','Skin - tail','Sperm','Spleen','Stool','Tail','Testis','Testis - both','Testis - left','Testis - right','Uterine horns','Uterine horns - endometrium removed','Uterus','Cell line (MEF)'],
    values_restricted: false,
    pilot: true
}, {
    name: 'tissueID',
    text: 'Tissue ID',
    placeholder: 'Uberon (http://uberon.org), EFO (http://www.ebi.ac.uk/efo), or CL (http://cellontology.org) ID of tissue/cell (if applicable)',
    type: 'text',
    required: true
}, {
    name: 'collection_protocol',
    text: 'Collection protocol',
    placeholder: 'Upload collection protocol and specify URL',
    type: 'text',
    required: true
}, {
    name: 'cell_culture_protocol',
    text: 'Cell culture protocol',
    placeholder: 'Upload primary cell culture protocol (if applicable) and specify URL',
    type: 'text',
    required: false
}, {
    name: 'date_collected',
    text: 'Date collected',
    placeholder: '',
    type: 'date',
    required: true
}, {
    name: 'processed_by',
    text: 'Processed by',
    placeholder: 'Individual performing procedure',
    type: 'text',
    required: true
}, {
    name: 'organ_weight',
    text: 'Organ/tissue weight (mg)',
    placeholder: '',
    type: 'number',
    required: true
}, {
    name: 'culture_length',
    text: 'Culture length (include units)',
    placeholder: 'Length of time cells were cultured (if applicable)',
    type: 'text',
    required: false
}, {
    name: 'passage_number',
    text: 'Passage number',
    placeholder: 'Number of culture passages before harvest (if applicable)',
    type: 'number',
    required: false
}, {
    name: 'phenotypic_measure',
    text: 'Phenotypic measures',
    placeholder: 'Any phenotypic measures of mouse at time of collection (if applicable)',
    type: 'text',
    required: false
}, {
    name: 'tissue_homogenized',
    text: 'Tissue homogenized?',
    placeholder: 'Was biosample homogenized after freezing?',
    values: ['NA', 'TRUE','FALSE' ],
    type: 'text',
    required: false,
    values_restricted: true
}, {
    name: 'comments',
    text: 'Comments',
    placeholder: '',
    type: 'textarea',
    required: false
}];

module.exports = fields;
