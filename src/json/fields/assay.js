var fields = [{
    name: 'user_accession',
    text: 'User accession',
    placeholder: 'USRASY####',
    type: 'text',
    required: true
}, {
    name: 'category',
    text: 'Category',
    placeholder: '',
    values: [ 'DNA methylation', 'Histone modification', 'Open chromatin', 'Gene expression' ],
    type: 'text',
    required: true,
    values_restricted: false
}, {
    name: 'technique',
    text: 'Technique',
    placeholder: '',
    required: true,
    type: 'text',
    values: [ 'ATAC-seq', 'RNA-seq', 'RRBS-seq', 'MeDIP-seq', 'MRE-seq', 'Mnase-seq', 'ChIP-seq', 'WGBS-seq' ],
    values_restricted: false
}, {
    name: 'assay_target',
    text: 'Target',
    placeholder: '',
    required: true,
    type: 'text',
    values: [ 'Whole DNA', '5mC', '5hmC', 'polyA mRNA', 'K4me1', 'K4me3', 'K27me3', 'K27ac', 'K9me3', 'Control' ],
    values_restricted: false
}, {
    name: 'starting_material',
    text: 'Starting Material',
    placeholder: '',
    values: [ 'frozen', 'fresh', 'other' ],
    type: 'text',
    required: false,
    values_restricted: false
}, {
    name: 'subcellular_fraction',
    text: 'Subcellular fraction',
    placeholder: 'GO term for subcellular fraction isolated from cell, if applicable',
    type: 'text',
    required: false
}, {
    name: 'population',
    text: 'Population',
    placeholder: 'Nucleic acid population, specifying enriched or depleted populations',
    values: [ 'DNA', 'mRNA', 'rRNA-depleted', 'polyA mRNA' ],
    type: 'text',
    required: false,
    values_restricted: false
}, {
    name: 'date_extracted',
    text: 'Date extracted',
    placeholder: '',
    type: 'date',
    required: false
}, {
    name: 'starting_cells',
    text: 'Starting amount of cells (mg)',
    placeholder: 'Amount of cells input into assay (if applicable)',
    type: 'textnumber',
    required: false,
    pilot: true
}, {
    name: 'starting_cell_count',
    text: 'Starting number of cells',
    placeholder: 'Number of cells input into assay (if applicable)',
    type: 'textnumber',
    required: false,
    pilot: true
}, {
    name: 'starting_nucleic_acid',
    text: 'Starting amount of nucleic acid (include units)',
    placeholder: 'Amount of nucleic acid input into assay (if applicable)',
    type: 'text',
    required: false,
    pilot: true
}, {
    name: 'strand_specificity',
    text: 'Strand specificity',
    placeholder: '',
    values: [ 'TRUE', 'FALSE' ],
    type: 'text',
    required: true,
    values_restricted: true,
    pilot: true
}, {
    name: 'date_performed',
    text: 'Date performed',
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
    name: 'assay_protocol',
    text: 'Assay protocol',
    placeholder: 'Upload assay protocol and specify URL',
    type: 'text',
    required: true, 
    pilot: true
}, {
    name: 'previously_frozen_tissue',
    text: 'Tissue previously frozen',
    placeholder: 'Was tissue frozen prior to performing assay?',
    values: [ 'NA','TRUE', 'FALSE' ],
    type: 'text',
    required: true,
    values_restricted: true,
    pilot: true
}, {
    name: 'detergent_added',
    text: 'Detergent added (ATAC-seq)',
    placeholder: '',
    values: [ 'NA','TRUE', 'FALSE' ],
    type: 'text',
    required: true,
    values_restricted: true,
    pilot: true
}, {
    name: 'filtering_method',
    text: 'Filtering method (ATAC-seq)',
    placeholder: '',
    values: [ 'Miracloth', 'Celltrics column' ],
    type: 'text',
    required: true,
    values_restricted: false,
    pilot: true
}, {
    name: 'comments',
    text: 'Comments',
    placeholder: '',
    type: 'textarea',
    required: false
}];

module.exports = fields;
