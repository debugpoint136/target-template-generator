var fields = [{
    name: 'user_accession',
    text: 'User accession',
    placeholder: 'USRSMP####',
    type: 'text',
    required: true
}, {
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
    values: ['primary cells', 'tissue'],
    type: 'text',
    required: true,
    values_restricted: true
}, {
    name: 'tissue',
    text: 'Tissue',
    placeholder: 'Broad tissue or cell population collected from mouse. Surrogate tissues are "Blood", "Skin of body". Include Uberon ID (http://uberon.org).',
    required: true,
    type: 'text',
    values: ['Blood UBERON:0000178', 'Brain UBERON:0000955', 'Adipose Tissue UBERON:0001013', 'Heart UBERON:0000948', 'Kidney UBERON:0002113', 'Liver UBERON:0002107', 'Lung UBERON: 0002048', 'Mammary Gland UBERON:0001911', 'skeletal muscle organ UBERON:0014892', 'Ovary UBERON:0000992', 'Placenta UBERON:0001987', 'Skin of Body UBERON:0002097', 'Spleen UBERON:0002106', 'Testis UBERON:0000473', 'Uterine Horn UBERON:0002247'],
    values_restricted: true,
    pilot: true
}, {
    name: 'specific_tissue',
    text: 'Specific tissue',
    placeholder: 'Specific tissue or cell population. Fat location should be specified in Comments. Include Uberon ID (http://uberon.org).',
    type: 'text',
    required: false,
    values: ['Blood - whole', 'Blood - leukocytes', 'Blood - plasma UBERON:0001969', 'Brain - whole UBERON:0000955', 'Brain - cortex UBERON:0001851', 'Brain - hippocampus', 'Brain - hypothalamus UBERON:0001898', 'Brain - mid-brain and hind-brain', 'Brain-cerebellum UBERON:0002037', 'Brain - striatum UBERON:0002435',  'Fat - brown adipose UBERON:0001348', 'Fat - white adipose UBERON:0001347','Heart- whole UBERON:0000948', 'Kidney - left UBERON:0004538', 'Kidney - right UBERON:0004539', 'Kidney - both UBERON:0002113', 'Liver - accessory lobe', 'Liver - caudate lobe', 'left lobe of liver UBERON:0001115', 'liver left lateral lobe  UBERON:0006727', 'Liver - medial lobe', 'liver left medial lobe UBERON:0006728', 'right lobe of liver  UBERON:0001114', 'Liver - tumor', 'Lung - whole UBERON:0002048', 'hindlimb muscle UBERON:0003663', 'Skin - ear, both UBERON:0001495', 'Skin - ear, left UBERON:0001495', 'Skin - ear, right UBERON:0001495', 'Skin - tail UBERON:0003534', 'Testis - both UBERON: 0000473', 'Uterine horns - myometrium (endometrium removed) UBERON:0001296'],
    values_restricted: true
}, {
    name: 'collection_protocol',
    text: 'Collection protocol',
    placeholder: 'Upload collection protocol and specify URL.',
    type: 'text',
    required: true
}, {
    name: 'organ_weight',
    text: 'Organ/tissue weight (mg)',
    placeholder: '',
    type: 'float',
    required: true
}, {
    name: 'liver_hist_image_HE',
    text: 'Histology, H&E stain',
    placeholder: 'Link to URL of uploaded image.',
    type: 'text',
    required: false
}, {
    name: 'liver_hist_image_ORO',
    text: 'Histology, Oil red O stain',
    placeholder: 'Link to URL of uploaded image.',
    type: 'text',
    required: false
}, {
    name: 'cell_culture_protocol',
    text: 'Cell culture protocol',
    placeholder: 'Upload primary cell culture protocol and specify URL',
    type: 'text',
    required: false
}, {
    name: 'culture_length',
    text: 'Culture length (days)',
    placeholder: 'Length of time cells were cultured',
    type: 'float',
    required: false
}, {
    name: 'passage_number',
    text: 'Passage number',
    placeholder: 'Number of culture passages before harvest',
    type: 'integer',
    required: false
}, {
    name: 'comments',
    text: 'Comments',
    placeholder: '',
    type: 'text',
    required: false
}];

module.exports = fields;
